import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../../interfaces/userInterface";
import axios, { Axios, AxiosResponse } from "axios";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import Loader from "../../Elements/Loader";
import AuthService from "../../../Functions/services/auth.service";
function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [adress, setAdress] = useState<string>("");
  const refUsername = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const refRePassword = useRef<HTMLInputElement>(null);
  const refAdress = useRef<HTMLTextAreaElement>(null);
  const refButton = useRef<HTMLInputElement>(null);
  const [fetchState, setFetchState] = useState<boolean>(true);

  const [error, setError] = useState<string[]>([]);
  const navigate = useNavigate();
  const deletFields = () => {
    setAdress("");
    setEmail("");
    setPassword("");
    setRePassword("");
    setUsername("");
  };
  const handelUser: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!username) {
      refUsername.current?.focus();
    } else if (!email) {
      refEmail.current?.focus();
    } else if (!password) {
      refPassword.current?.focus();
    } else if (!rePassword) {
      refRePassword.current?.focus();
    } else if (!adress) {
      refAdress.current?.focus();
    }
    if (email && username && password && rePassword && adress) {
      const user: User = {
        username,
        email,
        password,
        rePassword,
        adress,
      };

      try {
        setFetchState(false);
        const response = await AuthService.register(user);
        if (response.status === 201) {
          setError([]);
          deletFields();
          navigate("/login");
        }
        setFetchState(true);
      } catch (error: any) {
        if (error.response) {
          setFetchState(true);
          setError([]);
          setError(error.response.data.errors);
          console.log(error);
        } else {
          setFetchState(true);
          setError([]);
          setError(["Network Error"]);
        }
      }
    }
  };
  useEffect(() => {
    refUsername.current?.focus();
  }, []);
  return (
    <>
      <main className="sign-up">
        {fetchState ? (
          <>
            <h2>SING UP</h2>
            <div className="box">
              <form action="post" autoComplete="off" onSubmit={handelUser}>
                <div className="input">
                  <label htmlFor="username">username</label>
                  <input
                    autoComplete="off"
                    ref={refUsername}
                    value={username}
                    onKeyDown={(e) => {
                      e.key === "Enter" ? refEmail.current?.focus() : "";
                    }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    type="text"
                    name="username"
                    id="username"
                  />
                </div>
                <div className="input">
                  <label htmlFor="email">email</label>
                  <input
                    autoComplete="off"
                    ref={refEmail}
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
                    autoComplete="off"
                    ref={refPassword}
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
                  <label htmlFor="repassword">re-password</label>
                  <input
                    autoComplete="off"
                    ref={refRePassword}
                    value={rePassword}
                    onChange={(e) => {
                      setRePassword(e.target.value);
                    }}
                    type="password"
                    name="repassword"
                    id="repassword"
                  />
                </div>
                <div className="input">
                  <label htmlFor="adress">adress</label>
                  <textarea
                    ref={refAdress}
                    value={adress}
                    onChange={(e) => {
                      setAdress(e.target.value);
                    }}
                    rows={5}
                    cols={25}
                    draggable={false}
                  ></textarea>
                </div>
                <div className="input">
                  <input
                    autoComplete="off"
                    ref={refButton}
                    type="submit"
                    name="submit"
                    id="submit"
                    className="submit"
                    value={"SEND"}
                  />
                </div>
                <div className="errors">
                  {error?.map((i) => {
                    return <div className={"error"}>● {i}</div>;
                  })}
                </div>
                <div className="link">
                  <Link to="/login">I have account alredy</Link>
                </div>
              </form>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </main>
    </>
  );
}

export default SignUp;
