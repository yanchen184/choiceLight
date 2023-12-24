import { useEffect, useState } from "react";
import PlayMode from "../Mode/PlayMode";
import { useNavigate } from "react-router-dom"; // 导入 useNavigate

const ModeSelector = () => {
  const [selectedCard, setSelectedCard] = useState<String | null>(null);

  const handleCardSelect = (card: string) => {
    setSelectedCard(card);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedCard) return;
    console.log("selectedCard:", selectedCard);
    navigate(`/card-management/${selectedCard}`);
  }, [selectedCard]);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-4">
        <h1 className="text-2xl font-bold mb-4">選擇模式</h1>
        <div className="flex space-x-4">
          <div
            className={`p-4 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${
              selectedCard === "card1" ? "bg-blue-200" : ""
            }`}
            onClick={() => handleCardSelect("random")}
          >
            <p className="text-xl">隨選輪車模式</p>
            <PlayMode />
          </div>
          <div
            className={`p-4 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${
              selectedCard === "card2" ? "bg-blue-200" : ""
            }`}
            // 練習模式
            onClick={() => handleCardSelect("practice")}
          >
            <p className="text-xl">練習模式</p>
            <PlayMode />
          </div>
          <div
            className={`p-4 border border-gray-300 rounded cursor-not-allowed ${
              selectedCard === "card3" ? "bg-blue-200" : "bg-gray-300"
            }`}
            // 注意：在这里禁用了点击事件
          >
            <p className="text-xl">自選模式(暫時沒有開放)</p>
            <PlayMode />
          </div>
        </div>
        <p className="mt-4">您選擇的模式是：{selectedCard || "尚未選擇"}</p>
      </div>
    </div>
  );
};

export default ModeSelector;
