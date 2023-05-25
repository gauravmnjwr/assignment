import React, { useEffect, useState } from "react";

function Expression({ op, setOp, args, updateParent }) {
  const [leftOp, setLeftOp] = useState({ type: "constant", value: "false" });
  const [rightOp, setRightOp] = useState({ type: "constant", value: "false" });

  useEffect(() => {
    if (updateParent) updateParent(op);
  }, [op]);

  const typeChange = (e) => {
    let newOp;
    switch (e.target.value) {
      case "argument":
        newOp = { type: "argument", value: args[0]?.name };
        break;
      case "constant":
        newOp = { type: "constant", value: op.value };
        break;
      case "or":
        newOp = { type: "or", left: leftOp, right: rightOp };
        break;
      case "and":
        newOp = { type: "and", left: leftOp, right: rightOp };
        break;
      default:
        newOp = op;
        break;
    }
    setOp(newOp);
  };

  const valueChange = (e) => {
    if (op.type === "constant" || op.type === "argument") {
      let newOp = { ...op };
      newOp.value = e.target.value;

      setOp(newOp);
    }
  };

  return (
    <div>
      <select value={op.type} onChange={typeChange}>
        <option value="argument">Argument</option>
        <option value="constant">Constant</option>
        <option value="and">AND</option>
        <option value="or">OR</option>
      </select>

      {op.type === "constant" && (
        <select defaultValue={op.value} onChange={(e) => valueChange(e)}>
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      )}

      {op.type === "argument" && (
        <select
          defaultValue={args[0] ? args[0].name : ""}
          onChange={(e) => valueChange(e)}
        >
          {args.map((arg) => (
            <option key={arg.name} value={arg.name}>
              {arg.name}
            </option>
          ))}
        </select>
      )}

      {(op.type === "and" || op.type === "or") && (
        <div style={{ marginLeft: "10px" }}>
          <Expression
            op={leftOp}
            setOp={setLeftOp}
            updateParent={(newOp) => setOp({ ...op, left: newOp })}
            args={args}
          />
          <Expression
            op={rightOp}
            setOp={setRightOp}
            updateParent={(newOp) => setOp({ ...op, right: newOp })}
            args={args}
          />
        </div>
      )}
    </div>
  );
}

export default Expression;
