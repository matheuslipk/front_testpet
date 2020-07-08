import * as React from 'react';
import {Switch} from 'react-router-dom'
import Route from './Route';

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Products from '../pages/Products'
import EditProducts from '../pages/EditProducts'
import NewProducts from '../pages/NewProducts'
import NotFound from '../pages/NotFound'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/sign_in" exact component={SignIn} />
      <Route path="/sign_up" exact component={SignUp} />
      <Route path="/products" exact isPrivate component={Products} />
      <Route path="/products/edit/:id" exact isPrivate component={EditProducts} />
      <Route path="/products/new" exact isPrivate component={NewProducts} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}

export default Routes;