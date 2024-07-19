import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  return (
    <div>
      <HookSwitcher />
    </div>
  );
};

const HookSwitcher = () => {
  const [color, setColor] = useState("black");

  return (
    <div style={{ padding: "10px", backgroundColor: color }}>
      <button
        onClick={() => {
          setColor("black");
        }}
      >
        Dark
      </button>
      <button
        onClick={() => {
          setColor("white");
        }}
      >
        Light
      </button>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
console.log("Hello TypeScript &&");
