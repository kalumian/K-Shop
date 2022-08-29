import { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { User } from "../../../interfaces/userInterface";
import axios, { Axios } from "axios";
function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [adress, setAdress] = useState<string>("");
  const [error, setError] = useState<string[]>([]);
  const [mesage, setMessage] = useState<string>("");
  const navigate = useNavigate()
  const deletFields = () => {
    setAdress("");
    setEmail("");
    setPassword("");
    setRePassword("");
    setUsername("");
  };
  const handelUser: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const user: User = {
      username,
      email,
      password,
      rePassword,
      adress,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        user
      );
      if(response.status === 201)
      {
      setMessage("Account successfully created")
      setError([])
      deletFields()
      navigate("/login")
    }
    } catch (error: any) {
      if(error.response){
        setError([])
        setError(error.response.data.errors);
      }else{
        setError([])
        setError(["Network Error"])
      }
    }
  };
  return (
    <>
      <main className="sign-up">
        {true ? (
          <>
            <h2>SING UP</h2>
            <div className="box">
              <form action="post" onSubmit={handelUser}>
                <div className="input">
                  <label htmlFor="username">username</label>
                  <input
                    value={username}
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
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
                <div className="input">
                  <label htmlFor="repassword">re-password</label>
                  <input
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
                    type="submit"
                    name="submit"
                    id="submit"
                    className="submit"
                    value={"SEND"}
                  />
                </div>
                <div className="errors">
                  {error.map((i) => {
                    return <div className={"error"}>{i}</div>;
                  })}
                </div>
                <div className="link">
                  <Link to="/login">I have account alredy</Link>
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

export default SignUp;
