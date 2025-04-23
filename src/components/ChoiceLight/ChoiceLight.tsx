import { useState } from "react";
import { IChoiceLightProps, IProps } from "./interface";
import { Modal, Input, Button } from "antd";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";
import "./ChoiceLight.css";

const ChoiceLight = (props: IChoiceLightProps) => {
  const item = props;
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  // Function to handle modal cancel
  const handleShowCancel = () => {
    setIsShowModalOpen(false);
  };

  // Function to add or update light choice in Firebase
  const addOrUpdateLight = (data: IProps) => {
    if (data.light.trim() === "") return;

    const dbRef = ref(db, `choiceLight/${data.id}`);
    const newData = { light: data.light };
    
    set(dbRef, newData)
      .then(() => {
        console.log("Data added/updated successfully");
      })
      .catch((error) => {
        console.error("Error adding/updating data:", error);
      });
  };

  return (
    <>
      {/* Modal for selecting a light */}
      <Modal
        open={isShowModalOpen}
        footer={null}
        onCancel={handleShowCancel}
        maskClosable={true}
        width={400}
        centered
      >
        <div className="modal-content">
          <img 
            src={item.imgSrc} 
            alt={item.name}
            className="modal-image" 
          />
          
          <Input
            placeholder="請輸入您的大名"
            className="modal-input"
            onChange={(e) => setUserName(e.target.value)}
          />
          
          <div className="modal-message">
            是否選擇 {item.name}，並接受加價 {item.price - 990} 元？
          </div>
          
          <Button
            type="primary"
            className="modal-button"
            onClick={() => {
              if (!userName.trim()) {
                alert("請輸入您的名字");
                return;
              }
              
              setIsShowModalOpen(false);
              const data: IProps = {
                id: userName,
                light: item.name || "",
              };
              addOrUpdateLight(data);
            }}
          >
            確認選擇
          </Button>
        </div>
      </Modal>

      {/* Light Item Display */}
      <div onClick={() => setIsShowModalOpen(true)}>
        <img
          src={item.imgSrc}
          alt={item.name}
          className="choice-light-image"
        />
        
        <div className="choice-light-info">
          <div className="choice-light-name">{item.name}</div>
          <div className="choice-light-price">
            {item.price === 990 ? 
              "基本款" : 
              `加價: ${item.price - 990} 元`
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoiceLight;
