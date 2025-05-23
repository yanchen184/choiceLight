import React, { useState } from "react";
import { Button, Card, Col, Row } from "antd";
import "./BingoGame.css";
import { db } from "../../firebase";
import { ref, set } from "firebase/database";
import useFirebase from "../hook/useFirebase";

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

  const toggleNumber = (number: number): void => {
    console.log(fireBaseData);
    if (fireBaseData.includes(number)) {
      setFireBaseData(
        fireBaseData.filter((selected: number) => selected !== number)
      );
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

  // const hexagonData = [
  //   // 顶点坐标
  //   [
  //     [100, 50],
  //     [150, 10],
  //     [200, 50],
  //     [200, 100],
  //     [150, 150],
  //     [100, 100],
  //   ],
  //   // 相关数据，例如各个能力的分数
  //   [
  //     { name: "力量", score: 80 },
  //     { name: "速度", score: 60 },
  //     { name: "技巧", score: 90 },
  //     { name: "发球", score: 70 },
  //     { name: "防守", score: 85 },
  //     { name: "经验", score: 75 },
  //   ],
  // ];

  return (
    <div>
      <h1 className="text-3xl font-bold underline text-yellow-600">
        Bingo Game
      </h1>

      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-3 gap-8"></div>
      </div>

      <Button
        onClick={() => {
          setNumbers([...numbers.sort(() => Math.random() - 0.5)]);
          restartGame();
          setWinStatus(false);
        }}
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
