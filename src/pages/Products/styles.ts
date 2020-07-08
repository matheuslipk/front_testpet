import styled from "styled-components";
import {lengths} from '../../helpers/constants'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${lengths.maxWidthContent};

  .btnNewProduct {
    margin: 10px auto;
  }
`;

export const HeaderList = styled.div`
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin: 5px;

  label {
    flex: 1;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
`;

export const ItemProduct = styled.li`
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin: 8px 5px;
  background-color: #fff;
  box-shadow: 1px 1px 5px;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background: #ddd;
  }

  label {
    text-align: center;
    flex: 1;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const DivFilter = styled.div`
  display: flex;
  margin-top: 10px;
`;