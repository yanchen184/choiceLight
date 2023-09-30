import React, { useState } from "react";
import { IChoiceLightProps, IProps } from "../interface";
import { Modal, Input, Button } from "antd";
import { ref, set } from "firebase/database";
import { db } from "../firebase.tsx";

const ChoiceMeat = (props: IChoiceLightProps) => {
  const item = props;

  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  const handleShowCancel = () => {
    setIsShowModalOpen(false);
  };

  const addOrUpdateLight = (data: IProps) => {
    if (data.light.trim() === "") return;

    const dbRef = ref(db, `choiceMeat/${data.id}`);
    // 假設您希望在特定 id 的節點上創建或更新數據
    const newData = { light: data.light };
    // const specificNodeRef = ref(dbRef, specificId); // 創建特定節點的引用
    set(dbRef, newData)
      .then(() => {
        console.log("Data added/updated successfully");
      })
      .catch((error) => {
        console.error("Error adding/updating data:", error);
      });
  };

  const [userName, setUserName] = useState("");

  return (
    <>
      <Modal
        open={isShowModalOpen}
        footer={null}
        onCancel={handleShowCancel}
        maskClosable={true}
        bodyStyle={{ display: "flex", justifyContent: "center" }}
      >
        <div className="flex justify-center mt-5">
          <img
            src={item.imgSrc}
            alt={item.imgSrc}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
          <Input
            placeholder="請輸入您的大名"
            style={{ width: "200px", height: "30px" }}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <div>是否選擇此造型，並接受這個加價</div>
          <Button
            type="primary"
            style={{ width: "100px", height: "30px", marginLeft: "10px" }}
            onClick={() => {
              setIsShowModalOpen(false);
              const data: IProps = {
                id: userName,
                light: item.name || "",
              };
              addOrUpdateLight(data);
            }}
          >
            確認
          </Button>
        </div>
      </Modal>

      <img
        src={item.imgSrc}
        alt={item.name}
        style={{
          width: "360px",
          height: "360px",
          objectFit: "contain",
          borderRadius: "10px",
          border: "1px solid #ccc",
        }}
        onClick={() => setIsShowModalOpen(true)}
      />

      <p className="">名稱:{item.name}</p>
      <p className="">加價:{item.price - 990}</p>
    </>
  );
};

export default ChoiceMeat;
