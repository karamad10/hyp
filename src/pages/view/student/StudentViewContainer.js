import React, { useContext } from "react";
import Styled from "styled-components";

// components
import { AuthContext } from "../../../App";

const StudentViewContainer = () => {
  const { state } = useContext(AuthContext);
  // console.log(state);

  return (
    <Wrapper>
      <div className="container">
        <div>
          <div className="content">STUDENT CONTENT</div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = Styled.section`
.container{
  display: flex;
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
    .content{
      display: flex;
      flex-direction: column;
      padding: 20px 100px;    
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
      height: 60vh;
      width: 100%;
    }
  }
}
`;

export default StudentViewContainer;
