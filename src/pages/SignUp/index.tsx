import React, {FormEvent, useState} from 'react';

import api from '../../services/api'
import {Button, Input, Form, message} from 'antd'
import * as Styles from './styles'
import {ErrorsEntity} from '../../interfaces';
import {useHistory, Link} from 'react-router-dom'

const SignUp = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: { span: 18 },
  }

  const submitLayout = {
    wrapperCol: { span: 24 },
  }

  const handleSubmit = (e:FormEvent)=>{
    e.preventDefault()
    setLoading(true)
    api.post('/users/create', {
      name,
      email,
      password,
    }).then(response=>{
      message.success('Cadastro efetuado com sucesso')
      history.push('/sign_in')
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
        <Styles.TitleForm>Cadastro</Styles.TitleForm>
        
        <Form.Item label="Nome">
          <Input
            type="text"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Senha">
          <Input.Password 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Confirmar Senha">
          <Input.Password
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </Form.Item>
        <Form.Item {...submitLayout}>
          <Button htmlType="submit" type="primary" block loading={loading}>Cadastrar</Button>
        </Form.Item>
      </Form>
      <label>Já possui conta? <Link to="sign_in">Entre aqui</Link></label>
    </Styles.Container>
  )
}

export default SignUp;