import { BiArrowFromLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function To_back_Page() {
  const navigate = useNavigate();

  return (
    <div className="container to-back-component">
      <span>
        <BiArrowFromLeft
          onClick={() => {
            navigate(-1);
          }}
        />
      </span>
    </div>
  );
}

export default To_back_Page;
