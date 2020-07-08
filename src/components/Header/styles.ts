import styled from 'styled-components';
import {lengths} from '../../helpers/constants';

export const Container = styled.div`
  display: flex;
  background: #fff;
  flex-direction: row;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
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

export const Logout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;