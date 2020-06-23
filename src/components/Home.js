import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import Styled from "styled-components";

// components
import { AuthContext } from "../App";
import AdminViewContainer from "./view/admin/AdminViewContainer";
import StudentViewContainer from "./view/student/StudentViewContainer";

const ADMINS = ["karamad10", "NoerGitKat", "wouterkleijn", "fede", "Tjebbee"];

const Home = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);

  const { avatar_url, name, login } = state.user ? state.user : {};

  useEffect(() => {
    ADMINS.includes(login) ? setIsAdmin(true) : setIsAdmin(false);
  }, [login]);

  if (!state.isLoggedIn || !state.user) {
    return <Redirect to="/login" />;
  }

  console.table(state.user);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <Wrapper>
      <div className="container">
        <button onClick={() => handleLogout()}>Logout</button>
        <div>
          <div className="content">
            <img src={avatar_url} alt="Avatar" />
            <span>{name}</span>
            <span>
              Admin{" "}
              <span style={{ color: "red" }}>{JSON.stringify(isAdmin)}</span>
            </span>
          </div>
        </div>
      </div>
      {isAdmin ? <AdminViewContainer /> : <StudentViewContainer />}
    </Wrapper>
  );
};

const Wrapper = Styled.section`
.container{
  display: flex;
  flex-direction: column;
  height: 30vh;
  font-family: Arial;
  button{
    all: unset;
    width: 100px;
    height: 35px;
    margin: 10px 10px 0 0;
    align-self: flex-end;
    background-color: #0041C2;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #0041C2;
    &:hover{
      background-color: #fff;
      color: #0041C2;
    }
  }
  >div{
    height: 100%;
    width: 100%;
    display: flex;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    .content{
      display: flex;
      flex-direction: column;
      padding: 20px 100px;    
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
      width: auto;
  
      img{
        height: 150px;
        width: 150px;
        border-radius: 50%;
      }
  
      >span:nth-child(2){
        margin-top: 20px;
        font-weight: bold;
      }
  
      >span:not(:nth-child(2)){
        margin-top: 8px;
        font-size: 14px;
      }
  
    }
  }
}
`;

export default Home;
