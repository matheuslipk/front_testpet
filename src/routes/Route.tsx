import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {isSigned} from '../helpers/session'

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
  const signed = isSigned()

  if(!signed && isPrivate){
    return <Redirect to="/sign_in" />
  }

  if(signed && !isPrivate){
    return <Redirect to="/products" />
  }

  return <Route {...rest} component={Component} />
}