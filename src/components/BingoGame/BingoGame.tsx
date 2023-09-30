import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Row } from "antd";
import "./BingoGame.css";
import { db } from "../../firebase.tsx";
import { ref, onValue, set, get } from "firebase/database";
import useFirebase from "../hook/useFirebase.tsx";

const BingoGame: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>(
    Array.from({ length: 25 }, (_, index) => index + 1)
  );
  const [winStatus, setWinStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const bingoBoard: number[][] = Array.from({ length: 5 }, (_, row) =>
    numbers.slice(row * 5, (row + 1) * 5)
  );

  const { fireBaseData, setFireBaseData, addOrUpdateFirebaseData } =
    useFirebase("bingoGame/game1/number", setErrorMessage);

  const restartGame = () => {
    const dbRef = ref(db, `bingoGame/game1/number`);
    set(dbRef, []).then(() => {
      setFireBaseData([]);
      console.log("Data added/updated successfully");
    });
  };
  const [inputPlayerName, setInputPlayerName] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");

  const player = (name: string) => {
    const dbRef = ref(db, `bingoGame/game1/players`);
    get(dbRef).then((snapshot) => {
      const currentData = snapshot.val();
      if (currentData === name) {
        setErrorMessage("名字已經被使用了，請重新輸入");
        return;
      }
      const newData = [...currentData, name];
      set(dbRef, newData).then(() => {
        setPlayerName(name);
        console.log("Data added/updated successfully");
      });
    });
  };

  const toggleNumber = (number: number): void => {
    if (fireBaseData.includes(number)) {
      setFireBaseData(fireBaseData.filter((selected) => selected !== number));
    } else {
      setFireBaseData([...fireBaseData, number]);
    }
    addOrUpdateFirebaseData(number);
    checkWin();
  };

  const checkWin = (): void => {
    const linesToWin = 5;

    // Check rows
    for (let i = 0; i < bingoBoard.length; i++) {
      let count = 0;
      for (let j = 0; j < bingoBoard[i].length; j++) {
        if (fireBaseData.includes(bingoBoard[i][j])) {
          count++;
          if (count === linesToWin) {
            setWinStatus(true);
            return;
          }
        } else {
          count = 0;
        }
      }
    }

    // Check columns
    for (let i = 0; i < bingoBoard[0].length; i++) {
      let count = 0;
      for (let j = 0; j < bingoBoard.length; j++) {
        if (fireBaseData.includes(bingoBoard[j][i])) {
          count++;
          if (count === linesToWin) {
            setWinStatus(true);
            return;
          }
        } else {
          count = 0;
        }
      }
    }

    // Check diagonals
    for (let i = 0; i <= bingoBoard.length - linesToWin; i++) {
      for (let j = 0; j <= bingoBoard[i].length - linesToWin; j++) {
        let countDiagonal = 0;
        let countAntiDiagonal = 0;
        for (let k = 0; k < linesToWin; k++) {
          if (fireBaseData.includes(bingoBoard[i + k][j + k])) {
            countDiagonal++;
            if (countDiagonal === linesToWin) {
              setWinStatus(true);
              return;
            }
          }
          if (
            fireBaseData.includes(bingoBoard[i + k][j + linesToWin - 1 - k])
          ) {
            countAntiDiagonal++;
            if (countAntiDiagonal === linesToWin) {
              setWinStatus(true);
              return;
            }
          }
        }
      }
    }
    setWinStatus(false);
  };

  return (
    <div>
      <h1>Bingo Game</h1>
      <Input
        placeholder="請輸入你的名字"
        onChange={(e) => {
          setInputPlayerName(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          player(inputPlayerName);
        }}
      >
        確認你的名字
      </Button>

      <h2>{`你是 ${playerName}`}</h2>
      <h2>{`現在換 ${playerName}`}</h2>
      <Button
        onClick={() => {
          setNumbers([...numbers.sort(() => Math.random() - 0.5)]);
          restartGame();
          setWinStatus(false);
        }}
        type="primary"
      >
        重新開始
      </Button>
      <div>{fireBaseData}</div>
      <div>{errorMessage}</div>
      <Card style={{ marginTop: "20px", padding: "20px" }}>
        <div className="bingo-board">
          <Row gutter={10}>
            {bingoBoard.map((row, rowIndex) => (
              <Col key={rowIndex} span={4}>
                {row.map((number) => (
                  <div
                    key={number}
                    className={`bingo-cell ${
                      fireBaseData.includes(number) ? "selected" : ""
                    }`}
                    onClick={() => toggleNumber(number)}
                  >
                    {number}
                  </div>
                ))}
              </Col>
            ))}
          </Row>
        </div>
      </Card>
      {winStatus && <h2>Congratulations! You've won!</h2>}
    </div>
  );
};

export default BingoGame;
