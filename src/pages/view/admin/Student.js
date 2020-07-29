import React from "react";
import Styled from "styled-components";

const Student = ({
  data,
  selectedRepo,
  repositoriesData,
  users,
  selectedOptionData,
}) => {
  //console.log("Student -> selectedOptionData", selectedOptionData.data);
  const filteredSelectedOptionData = selectedOptionData?.data?.map((data) => {
    const {
      assignee,
      comments_url,
      commits_url,
      created_at,
      review_comments_url,
      url,
      user,
    } = data;

    return {
      assignee,
      comments_url,
      commits_url,
      created_at,
      review_comments_url,
      url,
      user,
    };
  });
  console.log(
    "filteredSelectedOptionData --------------->",
    filteredSelectedOptionData
  );
  //console.log("USERS --------------->", users);
  const students = filteredSelectedOptionData?.map((data) => {
    return data.user.login;
  });
  const usersList = users.map((user) => {
    return (
      <Card key={user}>
        <Span>Name: {user}</Span>
        {/* <br />
        <span>Home-work: {selectedRepo}</span> */}
      </Card>
    );
  });

  const studentsInfo = filteredSelectedOptionData?.map((data) => {
    return data;
  });
  console.log("Students info ---------->", students);
  // const { assignee, user } = selectedOptionData;
  return usersList;
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
