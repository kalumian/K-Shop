import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <main className="login">
        {true ? (
          <>
            <h2>LOGIN</h2>

            <div className="box">
              <form action="post">
                <div className="input">
                  <label htmlFor="email">email</label>
                  <input type="email" name="email" id="email" />
                </div>
                <div className="input">
                  <label htmlFor="password">password</label>
                  <input type="password" name="password" id="password" />
                </div>
                <div className="input">
                  <input
                    type="submit"
                    name="submit"
                    id="submit"
                    className="submit"
                    value={"SEND"}
                  />
                </div>
                <div className="errors"></div>
                <div className="link">
                  <Link to="/signup">I don't have account , create one</Link>
                </div>
              </form>
            </div>
          </>
        ) : (
          <></>
        )}
      </main>
    </>
  );
}

export default Login;
