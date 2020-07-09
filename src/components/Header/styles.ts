import styled from 'styled-components';
import {lengths} from '../../helpers/constants';

export const Container = styled.div`
  display: flex;
  background: #fff;
  flex-direction: row;
  justify-content: center;
  box-shadow: 0 0 5px;
`;

export const Content = styled.div`
  display: flex;
  height: 100px;
  background: #fff;
  flex-direction: row;
  width: 100%;
  max-width: ${lengths.maxWidthContent};
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;
`;

export const Menu = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export const Logout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;