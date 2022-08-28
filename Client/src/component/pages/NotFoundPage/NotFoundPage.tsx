import { Link, useNavigate } from "react-router-dom";

function NorFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="not-found-page" style={{ textAlign: "center" }}>
        <img
          width={300}
          src="https://media.istockphoto.com/vectors/cat-sits-in-a-box-with-a-404-sign-page-or-file-not-found-connection-vector-id1278808623?k=20&m=1278808623&s=612x612&w=0&h=tmzYgVK5yF-dtVvW81zz-Ebpeqd6EvD38KYGRjczuiw="
          alt=""
        />
        <div className="links">
          <Link to="/">The Home Page</Link>
          <span
            onClick={() => {
              navigate(-1);
            }}
          >
            The Page Before
          </span>
        </div>
      </div>
    </>
  );
}

export default NorFoundPage;
