import React from 'react';
import * as Styles from './styles';
import {useHistory} from 'react-router-dom'
import {Button} from 'antd';

interface ISession {
  signed?: boolean
}

const Header = ({signed}:ISession) => {
  const history = useHistory();
  const handleLogout = () => {
    sessionStorage.removeItem('session');
    history.push('/sign_in')
  }

  const goToLogin = () => history.push('/sign_in')

  return (
    <Styles.Container>
      <Styles.Content>
        <Styles.Logo onClick={() => history.push('/products')}>
          <h3>Test Pet</h3>
        </Styles.Logo>
        <Styles.Menu></Styles.Menu>
        <Styles.Logout>
          { signed
            ? <Button onClick={handleLogout}>Sair</Button> 
            : <Button onClick={goToLogin}>Entrar</Button> 
          }
        </Styles.Logout>
      </Styles.Content>
    </Styles.Container>
  )
}

export default Header;