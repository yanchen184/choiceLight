import { useState } from "react";
import bob from "../../../image/Cards/bob.png";
import HexagonAbilityChart from "./HexagonAbilityChart";

export interface PlayerCardProps {
  name: string;
  ftp: number;
  ftpMax: number;
  level: number;
  rarityText: string;
  image: string;
  ability: AbilityProps[];
}

export interface AbilityProps {
  name: string;
  score: number;
}

export interface AbilityAndDescribeProps extends AbilityProps {
  describe: string;
}

const addDescribeData = (data: AbilityProps[]) => {
  const addDescribe = (name: string) => {
    let describe = "";
    switch (name) {
      case "特殊能力":
        describe = "一些神奇的功能";
        break;
      case "體力":
        describe = "強大的續航能力";
        break;
      case "爆發力":
        describe = "短暫的時間內有強大的輸出";
        break;
      case "意志力":
        describe = "堅韌不拔的精神";
        break;
      case "心態":
        describe = "良好的心態";
        break;
      case "腿力":
        describe = "強大的腿部肌肉";
        break;
      default:
        describe = "一些神奇的功能";
        break;
    }
    return describe;
  };

  const newData: AbilityAndDescribeProps[] = data.map((item) => {
    return {
      name: item.name,
      score: item.score,
      describe: addDescribe(item.name),
    };
  });

  return newData;
};

const PlayerCard = (baseData: PlayerCardProps) => {
  let rarity = baseData.rarityText;
  let rarityClass = "";
  switch (rarity) {
    case "傳說":
      rarityClass = "text-yellow-500";
      break;
    case "史詩":
      rarityClass = "text-purple-500";
      break;
    case "精良":
      rarityClass = "text-blue-500";
      break;
    case "普通":
    default:
      rarityClass = "text-gray-500";
      break;
  }

  const [isHovered, setIsHovered] = useState(false); // 創建一個狀態來追蹤鼠標是否懸停

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        className={`w-72 h-96 relative group bg-gradient-to-b from-blue-600 to-purple-600 rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-105 border border-purple-600 hover:border-4 border-purple-600`}
        onMouseEnter={handleMouseEnter} // 當鼠標進入 div 時觸發
        onMouseLeave={handleMouseLeave} // 當鼠標離開 div 時觸發
      >
        <div className="bg-white p-4 rounded-md">
          <img
            className="mx-auto my-auto"
            src={bob}
            alt="bob"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
        <div className="text-white text-center mt-4">
          <p className={`text-lg ${rarityClass}`}>{rarity}</p>
          <h2 className="text-xl font-semibold group-hover:text-yellow-400">
            {baseData.name}
          </h2>
          <p className="text-sm">等級：{baseData.level}</p>
          <p className="text-sm">極速：{baseData.ftpMax}</p>
          <p className="text-sm">FTP：{baseData.ftp}</p>
        </div>
        {isHovered && (
          <HexagonAbilityChart
            edge={200} // 設置六邊形的邊長
            data={addDescribeData(baseData.ability)} // 傳遞能力數據
            width={600} // 設置畫布寬度
            height={600} // 設置畫布高度
          />
        )}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400">
            選擇
          </button>
        </div>
      </div>
    </>
  );
};

export default PlayerCard;
