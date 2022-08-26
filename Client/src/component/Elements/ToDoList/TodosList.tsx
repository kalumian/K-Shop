import { Todo } from "../../../models";
import ItemOfTodoList from "./ItemOfTodoList";

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
}
const TodosList: React.FC<Props> = ({ setTodos, todos }) => {
  return (
    <div className="todos">
      {todos.map((todo): JSX.Element => {
        return <ItemOfTodoList todo={todo} todos={todos} setTodos={setTodos} />;
      })}
    </div>
  );
};

export default TodosList;
