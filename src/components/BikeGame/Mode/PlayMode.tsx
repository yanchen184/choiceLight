import bob from "../../../image/Cards/bob.png";

const PlayMode = () => {
 
  const baseData = {
    name: "bob",
    ftp: 150,
    ftpMax: 200,
    level: 5,
    rarityText: "傳說",
    image: "../../../image/Cards/bob.png",
  };

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

  return (
    <>
     
      <div className="w-64 h-96">
        <div
          className={`relative group bg-gradient-to-b from-blue-600 to-purple-600 rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-105 border border-purple-600 hover:border-4 border-purple-600`}
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
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400">
              開始
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayMode;
