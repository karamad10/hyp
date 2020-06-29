import React from "react";
import Styled from "styled-components";

const Student = ({
  data,
  selectedRepo,
  repositoriesData,
  users,
  selectedOptionData,
}) => {
  console.log("Student -> selectedOptionData", selectedOptionData);
  // const { } = selectedOptionData
  return users.map((user) => {
    return (
      <Card key={user}>
        <Span>Name: {user}</Span>
        {/* <br />
        <span>Home-work: {selectedRepo}</span> */}
      </Card>
    );
  });
};

const Card = Styled.div`
    display: flex;
    margin: 10px 0;
    flex-direction: column;
    height: 12rem;
    border-radius: 3px;
    border: 1px solid teal;
    box-shadow: 0 1px 4px 0 teal;
    padding: 10px;
`;

const Span = Styled.span`
    font-weight: bold;
`;

export default Student;
