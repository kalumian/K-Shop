import { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthService from "../../../Functions/services/auth.service";
import { CartContext } from "../../../Stores/cartContext";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string[]>([]);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const [transfer, setTransfer] = useState<boolean>(false);
  const context = useContext(CartContext);
  const handelUser: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!email) {
      refEmail.current?.focus();
    } else if (!password) {
      refPassword.current?.focus();
    }
    if (email && password) {
      try {
        const response = await AuthService.login(email, password);

        if (response.status === 200) {
          setError([]);
          context?.getCarts().then((i: never) => {
            setTransfer(true);
          });
        }
      } catch (error: any) {
        console.log(error);
        if (error.response) {
          setError([]);
          setError([error.response.data.error]);
        } else {
          setError([]);
          setError(["Network Error"]);
        }
      }
    }
  };
  useEffect(() => {
    refEmail.current?.focus();
  }, []);
  return (
    <>
      <main className="login">
        {true ? (
          <>
            <h2>LOGIN</h2>
            <div className="box">
              <form action="post" onSubmit={handelUser} autoComplete="off">
                <div className="input">
                  <label htmlFor="email">email</label>
                  <input
                    ref={refEmail}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    autoComplete="off"
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
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
                <div className="input">
                  <input
                    type="submit"
                    name="submit"
                    ref={refPassword}
                    id="submit"
                    className="submit"
                    value={"SEND"}
                  />
                </div>
                <div className="errors">
                  {error.map((i) => {
                    return <div className={"error"}>● {i}</div>;
                  })}
                </div>
                <div className="link">
                  <Link to="/signup">I don't have account , create one</Link>
                </div>
              </form>
              {transfer ? <Navigate to="/" /> : ""}
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
