import React, { useEffect, useState } from "react";

function Arguments({ args, setArgs }) {
  const addArgument = () => {
    let newArgs = [...args];
    newArgs.push({ name: "My Arg", value: "false" });
    setArgs(newArgs);
  };

  const changeArgName = (e, index) => {
    let newArg = [...args];
    newArg[index].name = e.target.value;
    setArgs(newArg);
  };

  const changeArgValue = (e, index) => {
    let newArg = [...args];
    newArg[index].value = e.target.value;
    setArgs(newArg);
  };

  const deleteArg = (index) => {
    setArgs(args.filter((arg, i) => i !== index));
  };
  console.log(args);
  localStorage.setItem("args", JSON.stringify(args));

  return (
    <div>
      {args.map((arg, index) => {
        return (
          <div key={index}>
            <input
              type="text"
              value={arg.name}
              onChange={(e) => changeArgName(e, index)}
            />
            <select
              value={arg.value}
              onChange={(e) => changeArgValue(e, index)}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <button onClick={(e) => deleteArg(index)}>Delete</button>
          </div>
        );
      })}
      <button onClick={addArgument}>+ add arg</button>
    </div>
  );
}

export default Arguments;
