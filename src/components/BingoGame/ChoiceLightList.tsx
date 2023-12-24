import { useEffect, useState } from "react";
import { IProps } from "./interface";
import { db } from "../../firebase";
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
