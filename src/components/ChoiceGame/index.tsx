import GameIndex from "./GameIndex";
import { IChoiceGame } from "../interface";

const ChoiceGame = () => {
  const IChoiceLight: IChoiceGame[] = [
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20190422101457_ySiD2/jpg",
      name: "Bike",
      url: "/bike-game",
      isOpen: true,
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20190422101457_ySiD2/jpg",
      name: "Bingo",
      url: "/bingo-game",
      isOpen: false,
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20190422101709_BNrOB/jpg",
      name: "德州撲克",
      url: "/texas-poker",
      isOpen: false,
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20190422101740_3rHL1/jpg",
      name: "跑酷PK",
      url: "/parkour-pk",
      isOpen: false,
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20190422101909_wdghg/jpg",
      name: "賽車",
      url: "/racing-game",
      isOpen: false,
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20190422102001_XFNsm/jpg",
      name: "橫向單人遊戲",
      url: "/single-game",
      isOpen: false,
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20210922045940_m5plr/jpg",
      name: "RPG遊戲",
      url: "/rpg-game",
      isOpen: false,
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20210922045305_gMCLr/jpg",
      name: "邏輯遊戲",
      url: "/logic-game",
      isOpen: false,
    },
    {
      imgSrc:
        "https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_12030/20211020090001_afTA6/jpg",
      name: "射擊遊戲",
      url: "/shooting-game",
      isOpen: false,
    },
  ];
  return (
    <div className="p-4">
      <div className="text-3xl font-semibold mb-4">選擇遊戲</div>
      <div className="flex flex-wrap justify-center">
        {IChoiceLight.map((item, index) => (
          <div key={index}>
            <GameIndex
              imgSrc={item.imgSrc}
              name={item.name}
              url={item.url}
              isOpen={item.isOpen}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoiceGame;
