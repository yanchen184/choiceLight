import { useState } from "react";
import { IChoiceLightProps, IProps } from "./interface";
import { Modal, Input } from "antd";
import "./ChoiceLight.css";

// Extended interface to include callback function
interface IChoiceLightPropsExtended extends IChoiceLightProps {
  onSelectLight?: (data: IProps) => void;
}

const ChoiceLight = (props: IChoiceLightPropsExtended) => {
  const { imgSrc, price, name, onSelectLight } = props;
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  // Function to handle modal cancel
  const handleShowCancel = () => {
    setIsShowModalOpen(false);
    setUserName(""); // Reset username when modal is closed
  };

  // Function to handle light selection
  const handleLightSelection = () => {
    if (!userName.trim()) {
      alert("請輸入您的名字");
      return;
    }
    
    const data: IProps = {
      id: userName.trim(),
      light: name || "",
    };
    
    // Call the callback function if provided
    if (onSelectLight) {
      onSelectLight(data);
    }
    
    setIsShowModalOpen(false);
    setUserName(""); // Reset username after selection
    
    // Show confirmation message
    alert(`謝謝 ${userName}！您已選擇 ${name}`);
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
            src={imgSrc} 
            alt={name}
            className="modal-image" 
          />
          
          <Input
            placeholder="請輸入您的大名"
            className="modal-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onPressEnter={handleLightSelection}
          />
          
          <div className="modal-message">
            是否選擇 {name}，並接受加價 {price - 990} 元？
          </div>
          
          <button
            className="custom-confirm-button"
            onClick={handleLightSelection}
          >
            確認選擇
          </button>
        </div>
      </Modal>

      {/* Light Item Display */}
      <div onClick={() => setIsShowModalOpen(true)}>
        <img
          src={imgSrc}
          alt={name}
          className="choice-light-image"
        />
        
        <div className="choice-light-info">
          <div className="choice-light-name">{name}</div>
          <div className="choice-light-price">
            {price === 990 ? 
              "基本款" : 
              `加價: ${price - 990} 元`
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoiceLight;
