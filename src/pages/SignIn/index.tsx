import React, {FormEvent, useState, useEffect} from 'react';

import api from '../../services/api'
import * as Styles from './styles'
import {ErrorsEntity} from '../../interfaces';
import {useHistory, Link} from 'react-router-dom'
import { varsStorage } from '../../helpers/constants';
import {Button, Input, Form, message, Tooltip, Checkbox} from 'antd'
import {ClearOutlined} from '@ant-design/icons';

const SignIn = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [toSavePassword, setToSavePassword] = useState(false)

  const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: { span: 21 },
  }

  const submitLayout = {
    wrapperCol: { span: 24 },
  }

  useEffect(()=>{
    const lastEmail = localStorage.getItem(varsStorage.lastEmailLogged)
    const lastPassword = localStorage.getItem(varsStorage.lastPasswordLogged)
    if(lastEmail){
      setEmail(lastEmail)
    }
    if(lastPassword){
      setPassword(lastPassword)
      setToSavePassword(true)
    }
  },[])

  const handleClearCredentials = () => {
    localStorage.removeItem(varsStorage.lastEmailLogged);
    localStorage.removeItem(varsStorage.lastPasswordLogged);
    setEmail('')
    setPassword('')
    setToSavePassword(false)
  }

  const handleSubmit = (e:FormEvent)=>{
    e.preventDefault()
    setLoading(true)
    api.post('/sessions/create', {email,password}).then(response=>{
      const session = response.data;
      message.success('Login realizado com sucesso')
      sessionStorage.setItem(varsStorage.session, JSON.stringify(session))
      localStorage.setItem(varsStorage.lastEmailLogged, email)
      if(toSavePassword){
        localStorage.setItem(varsStorage.lastPasswordLogged, password)
      }else{
        localStorage.removeItem(varsStorage.lastPasswordLogged)
      }
      history.push('/products')
    }).catch(e=>{
      if(e.response){
        const {status, data} = e.response;
        if(status===422){
          data.errors.map((error: ErrorsEntity)=>(
            message.error(`${error.field}: ${error.message}`)
          ))
        }
        if(status===401){
          message.error(data.error)
        }
      }else if(e.request){
        message.error('Conection Error')
      }
    }).finally(()=>{
      setLoading(false)
    })
  }

  return (
    <Styles.Container>
      <Form {...formItemLayout} onSubmitCapture={handleSubmit}>
        <Styles.TitleForm>Login</Styles.TitleForm>
        
        <Form.Item label="Email">
          <Input 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            suffix={(
              <Tooltip title="Limpar credenciais">
                <ClearOutlined onClick={handleClearCredentials} />
              </Tooltip>
            )
            } 
          />
        </Form.Item>
        <Form.Item label="Senha">
          <Input.Password value={password} onChange={(e)=>setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Checkbox checked={toSavePassword} onChange={(e)=>setToSavePassword(e.target.checked)} >
            Salvar senha?
          </Checkbox>
        </Form.Item>
        <Form.Item {...submitLayout}>
          <Button htmlType="submit" type="primary" block loading={loading}>Login</Button>
        </Form.Item>
      </Form>
      <label>Não possui conta? <Link to="sign_up">Clique aqui</Link></label>
    </Styles.Container>
  )
}

export default SignIn;