import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import Application from "./use-effect";

const MyContext = React.createContext<string | undefined>(undefined);

const App = () => {
  const value = useContext(MyContext);
  if (value === undefined) {
    return <p>No context value provided</p>;
  }
  return <p>{value}</p>;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <MyContext.Provider value="Hello Hooks">
    <App />
    <Application />
  </MyContext.Provider>
);
console.log("Hello TypeScript && Hooks");
