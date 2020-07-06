import React from 'react';
import {useLocation} from 'react-router-dom'

// import { Container } from './styles';

const NotFound: React.FC = () => {
  const location = useLocation();
  return (
    <h1>Page Not Found <code>{location.pathname}</code> </h1>
  )
}

export default NotFound;