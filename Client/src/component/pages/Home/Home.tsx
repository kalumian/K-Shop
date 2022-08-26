import { Link } from "react-router-dom";
function Home(): JSX.Element {
  return (
    <div>
      <div>
        <Link to="To-Do">To Do List App Project</Link>
      </div>
      <div>
        <Link to="k-shop">K- Shop App Project</Link>
      </div>
    </div>
  );
}

export default Home;
