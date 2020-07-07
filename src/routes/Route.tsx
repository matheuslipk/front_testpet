import React from 'react';
import {Route, Redirect} from 'react-router-dom'

interface MyInterface {
  component: React.FC,
  isPrivate?: boolean,
  path?: string,
  exact?: boolean,
}

export default function Router({
    component: Component,
    isPrivate=false,
    ...rest
  }:MyInterface){
  let signed = false

  let session = sessionStorage.getItem('session');
  if(session){
    session = JSON.parse(session)
    signed = true
  }

  if(!signed && isPrivate){
    return <Redirect to="/sign_in" />
  }

  if(signed && !isPrivate){
    return <Redirect to="/" />
  }

  return <Route {...rest} component={Component} />
}