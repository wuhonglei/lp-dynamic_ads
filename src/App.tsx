import "./App.css";
import { useState } from "react";
import CountdownTimer from "./TestPage/CountdownTimer";

function App() {
  const [animation, setAnimation] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <button
        className="bg-primary text-white p-2 rounded-md cursor-pointer"
        onClick={() => setAnimation(!animation)}
      >
        切换类型
      </button>
      <CountdownTimer animation={animation} duration={80} format="hh:mm:ss" />
    </div>
  );
}

export default App;
