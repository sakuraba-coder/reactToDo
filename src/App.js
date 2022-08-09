import React, { useState } from "react";
import { CompleteTodoes } from "./components/CompleteTodoes";
import { IncompleteTodoes } from "./components/IncompleteTodoes";
import { InputTodo } from "./components/InputTodo";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodoes, setIncompleteTodoes] = useState([]);
  const [completeTodoes, setCompleteTodoes] = useState([]);

  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodoes = [...incompleteTodoes, todoText];
    setIncompleteTodoes(newTodoes);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodoes = [...incompleteTodoes];
    newTodoes.splice(index, 1);
    setIncompleteTodoes(newTodoes);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodoes = [...incompleteTodoes];
    newIncompleteTodoes.splice(index, 1);
    const newCompleteTodoes = [...completeTodoes, incompleteTodoes[index]];

    setIncompleteTodoes(newIncompleteTodoes);
    setCompleteTodoes(newCompleteTodoes);
  };

  const onClickBack = (index) => {
    const newCompleteTodoes = [...completeTodoes];
    newCompleteTodoes.splice(index, 1);
    const newIncompleteTodoes = [...incompleteTodoes, completeTodoes[index]];

    setIncompleteTodoes(newIncompleteTodoes);
    setCompleteTodoes(newCompleteTodoes);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodoes.length >= 5}
      />
      {incompleteTodoes.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodoは5個までです。消化しましょう。
        </p>
      )}

      <IncompleteTodoes
        todoes={incompleteTodoes}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodoes todoes={completeTodoes} onClick={onClickBack} />
    </>
  );
};
