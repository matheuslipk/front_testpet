import * as React from 'react'
import  {BrowserRouter as Router} from 'react-router-dom'

import 'antd/dist/antd.css'
import Routes from './routes'
import Global from './styles/global'

function App() {

  return (
    <Router>
      <Routes />
      <Global />
    </Router>
  );
}

export default App;
