import React, { useState } from "react";

import { CompleteTodoes } from "./components/CompleteTodoes";
import { IncompleteTodoes } from "./components/IncompleteTodoes";
import { InputTodo } from "./components/InputTodo";
import "./styles.css";

export const App = () => {
  // Hooks useStateは初期値を表す
  const [todoText, setTodoText] = useState("");
  const [incompleteTodoes, setIncompleteTodoes] = useState([]);
  const [completeTodoes, setCompleteTodoes] = useState([]);

  // テキストを入力する時はこれを必ず使う
  // inputboxとセットだと言うことを覚えておこう
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  // inputboxに書いたことをincompleteTodoes配列に結合
  // 変更があると更新される
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodoes = [...incompleteTodoes, todoText];
    setIncompleteTodoes(newTodoes);
    setTodoText("");
  };

  // 削除する際にはspliceを使う
  // splice(index, 個数)
  // indexから個数分削除する
  const onClickDelete = (index) => {
    const newTodoes = [...incompleteTodoes];
    newTodoes.splice(index, 1);
    setIncompleteTodoes(newTodoes);
  };

  // 未完了配列から削除
  // 完了配列へ追加
  const onClickComplete = (index) => {
    const newIncompleteTodoes = [...incompleteTodoes];
    newIncompleteTodoes.splice(index, 1);
    const newCompleteTodoes = [...completeTodoes, incompleteTodoes[index]];

    setIncompleteTodoes(newIncompleteTodoes);
    setCompleteTodoes(newCompleteTodoes);
  };

  // 完了配列から削除
  // 未完了配列へ追加
  const onClickBack = (index) => {
    const newCompleteTodoes = [...completeTodoes];
    newCompleteTodoes.splice(index, 1);
    const newIncompleteTodoes = [...incompleteTodoes, completeTodoes[index]];

    setIncompleteTodoes(newIncompleteTodoes);
    setCompleteTodoes(newCompleteTodoes);
  };

  // returnの中身が更新される
  // ここにコンポーネントを配置していけばいいのではないか？
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
