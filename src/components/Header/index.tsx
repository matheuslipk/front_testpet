import React from 'react';
import * as Styles from './styles';

const Header: React.FC = () => {
  return (
    <Styles.Container>
      <Styles.Content>
        <Styles.Logo>
          <h3>Logo</h3>
        </Styles.Logo>
      </Styles.Content>
    </Styles.Container>
  )
}

export default Header;