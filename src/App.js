import { useState } from "react";
import Arguments from "./components/Arguments";
import Expression from "./components/Expression";

function App() {
  const [args, setArgs] = useState([]);
  const [op, setOp] = useState({ type: "constant", value: "false" });

  const performLogic = (operation) => {
    switch (operation.type) {
      case "constant":
        return operation.value === "true";
      case "argument":
        const res = args.filter((arg) => operation.value === arg.name);
        return res[0] ? res[0].value === "true" : false;
      case "or":
        return performLogic(operation.left) || performLogic(operation.right);
      case "and":
        return performLogic(operation.left) && performLogic(operation.right);
      default:
        return false;
    }
  };

  return (
    <div>
      <Arguments args={args} setArgs={setArgs} />
      <br />
      <br />
      <br />
      <Expression op={op} setOp={setOp} args={args} />
      {/* <button onClick={()=>{performLogic(op)}}>Perform logic</button> */}
      <h5>Result : {performLogic(op).toString()}</h5>
    </div>
  );
}

export default App;
