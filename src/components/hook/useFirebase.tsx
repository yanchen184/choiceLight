/* eslint-disable prefer-promise-reject-errors */
import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../firebase.tsx";

// "bingoGame/game1/number"
export function useFirebase(
  firebaseName: string,
  setErrorMessage: any
) {
  const [fireBaseData, setFireBaseData] = useState<any>([]);
  const dbRef = ref(db, firebaseName);
  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      const dataList = snapshot.val();
      const dataArray = [];
      for (let id in dataList) {
        dataArray.push(dataList[id]);
      }
      setFireBaseData(dataArray);
    });
  }, []);

  const addOrUpdateFirebaseData = (data: number) => {
    const newData = [...fireBaseData, data];
    // 更新數據
    set(dbRef, newData)
      .then(() => {
        setFireBaseData(newData);
        console.log("Data added/updated successfully");
      })
      .catch((error) => {
        setErrorMessage("有人先你一步了，請重新選擇數字");
        console.error("Error adding/updating data:", error);
      });
  };

  return { fireBaseData, setFireBaseData, addOrUpdateFirebaseData };
}

export default useFirebase;
