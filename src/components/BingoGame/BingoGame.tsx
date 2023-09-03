import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import "./BingoGame.css";
import { db } from "../../firebase.tsx";
import { ref, onValue, set } from "firebase/database";

const BingoGame: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>(
    Array.from({ length: 25 }, (_, index) => index + 1)
  );
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [winStatus, setWinStatus] = useState<boolean>(false);

  const bingoBoard: number[][] = Array.from({ length: 5 }, (_, row) =>
    numbers.slice(row * 5, (row + 1) * 5)
  );

  const addOrUpdateLight = (data: number) => {
    const dbRef = ref(db, `bingoGame/${data}`);
    // 假設您希望在特定 id 的節點上創建或更新數據
    const newData = { number: data };
    // const specificNodeRef = ref(dbRef, specificId); // 創建特定節點的引用
    set(dbRef, newData)
      .then(() => {
        console.log("Data added/updated successfully");
      })
      .catch((error) => {
        console.error("Error adding/updating data:", error);
      });
  };

  useEffect(() => {
    const dbRef = ref(db, "bingoGame");
    onValue(dbRef, (snapshot) => {
      const dataList = snapshot.val();
      console.log(dataList);
      const dataArray = [];
      for (let id in dataList) {
        const mergedString = Object.values(dataList[id]).join("");
        dataArray.push(mergedString);
      }
      setSelectedNumbers(dataArray);
    });
  }, []);

  const toggleNumber = (number: number): void => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(
        selectedNumbers.filter((selected) => selected !== number)
      );
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
    addOrUpdateLight(number);
    checkWin();
  };

  const checkWin = (): void => {
    const linesToWin = 5;

    // Check rows
    for (let i = 0; i < bingoBoard.length; i++) {
      let count = 0;
      for (let j = 0; j < bingoBoard[i].length; j++) {
        if (selectedNumbers.includes(bingoBoard[i][j])) {
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
        if (selectedNumbers.includes(bingoBoard[j][i])) {
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
          if (selectedNumbers.includes(bingoBoard[i + k][j + k])) {
            countDiagonal++;
            if (countDiagonal === linesToWin) {
              setWinStatus(true);
              return;
            }
          }
          if (
            selectedNumbers.includes(bingoBoard[i + k][j + linesToWin - 1 - k])
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

  useEffect(() => {}, [selectedNumbers]);
  return (
    <div>
      <h1>Bingo Game</h1>
      <Button
        onClick={() => {
          setNumbers([...numbers.sort(() => Math.random() - 0.5)]);
          setSelectedNumbers([]);
          setWinStatus(false);
        }}
        type="primary"
      >
        Shuffle Numbers
      </Button>
      <div>{selectedNumbers}</div>
      <Card style={{ marginTop: "20px", padding: "20px" }}>
        <div className="bingo-board">
          <Row gutter={10}>
            {bingoBoard.map((row, rowIndex) => (
              <Col key={rowIndex} span={4}>
                {row.map((number) => (
                  <div
                    key={number}
                    className={`bingo-cell ${
                      selectedNumbers.includes(number) ? "selected" : ""
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
