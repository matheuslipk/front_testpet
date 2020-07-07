import styled from "styled-components";
import {lengths} from '../../helpers/constants'

export const Content = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: ${lengths.maxWidthContent};

  form {
    padding: 10px;
    background: #fff;
    min-width: 450px;
    max-width: 800px;
    width: 90%;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 2px 2px 5px;
  }
`;