import { Todo } from "../../../models";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { FormEvent, useEffect, useRef, useState } from "react";
interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const ItemOfTodoList = ({ todo, todos, setTodos }: Props): JSX.Element => {
  const [editState, setEditState] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.todo);
  const inputFocus = useRef<HTMLInputElement>(null);
  const handleDone = (id: number): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const handleDelete = (id: number): void => {
    setTodos(todos.filter((i) => i.id !== id));
  };

  const submit = (e: FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editText } : todo))
    );
    setEditState(false);
  };
  useEffect(() => {
    inputFocus.current?.focus();
  }, [editState]);
  return (
    <form className="todos__single" onSubmit={(e) => submit(e, todo.id)}>
      {editState ? (
        <input
          ref={inputFocus}
          className="todos__single--test"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}
      <div>
        {todo.isDone ? (
          <></>
        ) : (
          <span
            className="icon"
            onClick={() => {
              if (!editState && !todo.isDone) setEditState(!editState);
            }}
          >
            <AiFillEdit />
          </span>
        )}
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          {!editState ? <MdDone /> : <></>}
        </span>
      </div>
    </form>
  );
};

export default ItemOfTodoList;
