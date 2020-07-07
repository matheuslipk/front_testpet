import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: calc(100% - 100px);
  align-items: center;
  justify-content: center;

  form {
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 3px 3px 5px;
    width: 500px;

    label {
      font-size: 18px;
    }
  }
`;

export const TitleForm = styled.h2`
  text-align: center;
`;