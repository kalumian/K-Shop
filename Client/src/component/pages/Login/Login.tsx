import { useRef, useState } from "react";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string[]>([]);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const refButton = useRef<HTMLInputElement>(null);

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
                  <input
                     onKeyDown={(e) => {
                      e.key === "Enter" ? refPassword.current?.focus() : "";
                    }}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="input">
                  <label htmlFor="password">password</label>
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      e.key === "Enter" ? refButton.current?.focus() : e.key === "ArrowUp" ? refEmail.current?.focus():"";
                    }}
                    type="password"
                    name="password"
                    id="password"
                  />
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
                <div className="errors">
                  {error.map((i) => {
                    return (
                      <div className={"error"}>
                        ● {i}
                      </div>
                    );
                  })}
                </div>
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
