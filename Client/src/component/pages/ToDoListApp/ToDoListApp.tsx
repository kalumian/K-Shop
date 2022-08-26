import { FormEvent, useState } from "react";
import { Todo } from "../../../models";
import InputFiled from "../../Elements/ToDoList/InputFiled";
import TodosList from "../../Elements/ToDoList/TodosList";
import { Link } from "react-router-dom";

const ToDoListApp: React.FC = (): JSX.Element => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent): void => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { todo, isDone: false, id: Date.now() }]);
      setTodo("");
    }
    console.log(todos);
    return;
  };
  return (
    <main className="to-do-list-app">
      <header className="heading">
        <h1>To Do list App</h1>
        <p>For Learn Typescript Language</p>
        <Link to="/">Back To Home Page</Link>
        <InputFiled handleAdd={handleAdd} todo={todo} setTodo={setTodo} />
        <TodosList todos={todos} setTodos={setTodos} />
      </header>
    </main>
  );
};

export default ToDoListApp;
