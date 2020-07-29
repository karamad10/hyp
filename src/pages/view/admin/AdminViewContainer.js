import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Styled from "styled-components";

// components
import { AuthContext } from "../../../App";
import Student from "./Student";

const AdminViewContainer = () => {
  const { state } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionData, setSelectedOptionData] = useState({});

  const [repositoriesData, setRepositoriesData] = useState({});
  const [users, setUsers] = useState([]);
  // console.log("AdminViewContainer -> users", users);

  // console.log("repositoriesData", repositoriesData);
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  useEffect(() => {
    async function getUser() {
      try {
        // get repos based on selected
        const repositories = await axios.get(
          `https://api.github.com/repos/HackYourHomework/${selectedOption}`
        );
        // console.log(repositories);
        const {
          comments_url,
          commits_url,
          issues_url,
          pulls_url,
        } = repositories.data;
        // find user and map his pull requests
        const selectedOptionData = await axios.get(
          `https://api.github.com/repos/HackYourHomework/${selectedOption}/pulls`
        );

        const people = selectedOptionData.data
          .map(({ user }) => user.login)
          .filter(onlyUnique);
        setUsers(people);
        setRepositoriesData(repositories.data);
        setSelectedOptionData(selectedOptionData);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, [selectedOption, state.user.login]);

  // styled components
  const Container = Styled.section`
    display: flex;
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
    <>
      <Container>
        <Card>
          <select onChange={(e) => setSelectedOption(e.target.value)}>
            <optgroup>
              <option value="">select module</option>
              <option selected={selectedOption === "Node.js"} value="Node.js">
                Node
              </option>
              <option
                selected={selectedOption === "JavaScript1"}
                value="JavaScript1"
              >
                JavaScript1
              </option>
              <option
                selected={selectedOption === "JavaScript1"}
                value="JavaScript1"
              >
                JavaScript1
              </option>
              <option
                selected={selectedOption === "JavaScript3"}
                value="JavaScript3"
              >
                JavaScript3
              </option>
              <option selected={selectedOption === "React"} value="React">
                React
              </option>
              <option
                selected={selectedOption === "post-grad-ed"}
                value="post-grad-ed"
              >
                Post-grad project
              </option>
            </optgroup>
          </select>
        </Card>

        <br />
        <Student
          githubUsername={state.user.login}
          selectedRepo={selectedOption}
          repositoriesData={repositoriesData}
          selectedOptionData={selectedOptionData}
          users={users}
        />
      </Container>
    </>
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

export default AdminViewContainer;
