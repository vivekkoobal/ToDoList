import React, { useState, useEffect } from "react";
import "../ToDoList/ToDoList.css";
import toDoIcon from "../images/toDoIcon.png";

const localItems = () => {
  let list = localStorage.getItem("TO_DO_ITEMS");
  console.log("list");

  if (list) {
    return JSON.parse(localStorage.getItem("TO_DO_ITEMS"));
  } else {
    return [];
  }
};

let nextId = 0;
export default function ToDo() {
  const [inputs, setInputs] = useState("");
  const [updates, setUpdates] = useState(localItems());
  const [isBlank, setIsBlank] = useState(false);

  useEffect(() => {
    localStorage.setItem("TO_DO_ITEMS", JSON.stringify(updates));
  }, [updates]);

  const handleInput = (e) => {
    setInputs(e.target.value);
    setIsBlank("");
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (inputs.trim().length == "0") {
      setIsBlank("Invalid input, please type again!");
    } else {
      setUpdates([
        {
          id: nextId++,
          name: inputs,
        },
        ...updates,
      ]);
      setInputs("");
    }
  };

  return (
    <div>
      <div className="todo">
        <div className="todo-list">
          <div className="todo-form">
            <div className="todoIcon">
              <img src={toDoIcon} alt="ToDo Icon" height={75} width={75} />
              <h1>ToDoList</h1>
            </div>
            <label>
              <input
                className="todoInput"
                type="text"
                placeholder="Write item Name"
                name="name"
                value={inputs}
                onChange={handleInput}
              />
              <button onClick={handleAdd} className="btnAdd">
                +
              </button>
              <p className="errorMessage">{isBlank}</p>

              <div className="container">
                <ol>
                  {updates.map((update) => (
                    <li key={update.key} className="item">
                      {update.name}

                      <div>
                        {/* <button onClick={handleDone} className="item btnDone">
                          ✔{" "}
                        </button> */}
                        <button
                          className="item list btnDelete"
                          onClick={(e) => {
                            e.preventDefault();
                            setUpdates(
                              updates.filter((a) => a.id !== update.id)
                            );
                          }}
                        >
                          ❌
                        </button>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </label>
            {updates.length === 0 && (
              <p className="emptyList">No items to display</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
