import "./App.css";
import BingoGame from "./components/BingoGame/BingoGame.tsx";
import ChoiceLightList from "./components/ChoiceLight/ChoiceLightList.tsx";

function App() {
  return (
    <>
      <div className="App">
        {/* <ChoiceLightList /> */}
        <BingoGame/>
      </div>
    </>
  );
}

export default App;
