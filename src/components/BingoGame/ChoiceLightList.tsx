import React, { useEffect, useState } from "react";
import ChoiceLight from "./BingoGame.tsx";
import { IChoiceLightProps, IProps } from "./interface";
import { Row, Col } from "antd";
import { db } from "../../firebase.tsx";
import { ref, onValue } from "firebase/database";

const ChoiceLightList = () => {
  const [data, setData] = useState<IProps[]>([]);

  useEffect(() => {
    const dbRef = ref(db, "choiceLight");
    onValue(dbRef, (snapshot) => {
      const dataList = snapshot.val();
      const dataArray = [];
      for (let id in dataList) {
        const mergedString = Object.values(dataList[id]).join("");
        dataArray.push({ id, light: mergedString });
      }
      setData(dataArray);
    });
  }, []);

  return (
    <>
      <div>目前的登入玩家：</div>
      <div>
        {data.map((item, index) => (
          <div key={index}>
            {item.id} - {item.light}
          </div>
        ))}
      </div>
    </>
  );
};

export default ChoiceLightList;
