import React, {FormEvent, useState} from 'react';

import api from '../../services/api'
import {Button, Input, Form, message} from 'antd'
import * as Styles from './styles'
import {ErrorsEntity} from '../../interfaces';
import {useHistory} from 'react-router-dom'

const SignIn: React.FC = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('email@email.com')
  const [password, setPassword] = useState('aaaa')

  const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: { span: 20 },
  }

  const submitLayout = {
    wrapperCol: { span: 24 },
  }

  const handleSubmit = (e:FormEvent)=>{
    e.preventDefault()
    setLoading(true)
    api.post('/sessions/create', {email,password}).then(response=>{
      const session = response.data;
      message.success('Login successfully')
      sessionStorage.setItem('session', JSON.stringify(session))
      history.push('/')
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
          <Input value={email} onChange={(e)=>setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="Senha">
          <Input.Password value={password} onChange={(e)=>setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item {...submitLayout}>
          <Button htmlType="submit" type="primary" block loading={loading}>Login</Button>
        </Form.Item>
      </Form>
    </Styles.Container>
  )
}

export default SignIn;