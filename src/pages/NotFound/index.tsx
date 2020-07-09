import React from 'react';
import {Redirect} from 'react-router-dom'

const NotFound = () => {
  return (
    <Redirect to="sign_in" />
  )
}

export default NotFound;