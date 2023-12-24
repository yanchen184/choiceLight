import PlayerCard, { PlayerCardProps } from "../Cards/PlayerCard";
import Character from "../Character";


const cards: PlayerCardProps[] = [
  {
    name: "卡牌1",
    ftp: 150,
    ftpMax: 200,
    level: 5,
    rarityText: "傳說",
    image: "../../../image/Cards/bob.png",
    ability: [
      {
        name: "特殊能力",
        score: 7,
      },
      {
        name: "體力",
        score: 7,
      },
      {
        name: "爆發力",
        score: 7,
      },
      {
        name: "意志力",
        score: 7,
      },
      {
        name: "心態",
        score: 7,
      },
      {
        name: "腿力",
        score: 7,
      },
    ],
  },
  {
    name: "卡牌2",
    ftp: 150,
    ftpMax: 200,
    level: 5,
    rarityText: "傳說",
    image: "../../../image/Cards/bob.png",
    ability: [
      {
        name: "特殊能力",
        score: 6,
      },
      {
        name: "體力",
        score: 6,
      },
      {
        name: "爆發力",
        score: 6,
      },
      {
        name: "意志力",
        score: 6,
      },
      {
        name: "心態",
        score: 6,
      },
      {
        name: "腿力",
        score: 1,
      },
    ],
  },
];

// 主界面組件
const CardManagement = () => {
  return (
    <div className="p-5">
      <div className="grid grid-cols-5 gap-4">
        <Character></Character>
        {cards.map((card) => (
          <PlayerCard
            name={card.name}
            ftp={card.ftp}
            ftpMax={card.ftpMax}
            level={card.level}
            rarityText={card.rarityText}
            image={card.image}
            ability={card.ability}
          />
        ))}
      </div>
    </div>
  );
};

export default CardManagement;
