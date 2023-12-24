import { useState } from "react";
import { IChoiceGame } from "../interface";
import { useNavigate } from "react-router-dom"; // 导入 useNavigate
import { Modal } from "antd";

const GameIndex = (props: IChoiceGame) => {
  const item = props;
  const navigate = useNavigate(); // 使用 useNavigate 来获取导航函数

  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  const handleShowCancel = () => {
    setIsShowModalOpen(false);
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden m-2 p-4 cursor-pointer "
      onClick={() => setIsShowModalOpen(true)}
    >
      <div className="text-center">
        <Modal
          open={isShowModalOpen}
          footer={null}
          onCancel={handleShowCancel}
          maskClosable={true}
          centered={true}
          closable={false}
        >
          <div className="flex justify-center items-center flex-col">
            <img
              src={item.imgSrc}
              alt={item.imgSrc}
              className="max-w-full max-h-full"
            />
            <button
              className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-500 hover:to-purple-600 text-white font-semibold transform hover:scale-105 transition duration-300 ease-in-out relative"
              onClick={() => {
                if (item.url) {
                  console.log(item.url);
                  navigate(item.url); // 使用 React Router 提供的导航函数
                }
                setIsShowModalOpen(false);
              }}
            >
              <span className="mr-2">進入遊戲</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 absolute right-2 top-1/2 transform -translate-y-1/2 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </Modal>

        <img
          src={item.imgSrc}
          alt={item.name}
          className="w-72 h-72 object-contain rounded-lg border border-gray-300 "
        />
        <p className="text-lg">{item.name}</p>
      </div>
    </div>
  );
};

export default GameIndex;
