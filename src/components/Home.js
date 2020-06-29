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

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  // styled components
  const Container = Styled.section`
    display: flex;
    padding: 2rem;
    flex-direction: column;
    height: 100%;
    width: 95%;
  `;

  const Card = Styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  `;

  const Button = Styled.button`
      width: 4rem;
      height: 2rem;
      border: 2px solid teal;
      border-radius: 3px;
      background: white;
      &:hover {
        cursor: pointer;
      }
  `;

  const Image = Styled.img`
      width: 7rem;
      height: 7rem;
      margin-right: 1rem;
      border-radius: 20%;
  `;

  const Span = Styled.span`
    width: 100%;
    display: flex;
    padding-bottom: 5px;
  `;

  return (
    <Container>
      <Card>
        <div>
          <Image src={avatar_url} alt="Avatar" />
        </div>
        <div>
          <Span>{name}</Span>
          <Span>
            <Span style={{ color: "red" }}>{isAdmin ? "ADMIN" : ""}</Span>
          </Span>
          <Button onClick={() => handleLogout()}>Logout</Button>
        </div>
      </Card>
      {isAdmin ? <AdminViewContainer /> : <StudentViewContainer />}
    </Container>
  );
};

const Wrapper = Styled.section`
.container{
  display: flex;
  flex-direction: column;
  font-family: Arial;
  padding: 20px;
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
