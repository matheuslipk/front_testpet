import React, {useState} from 'react';

import api from '../../services/api';
import {message, Form, Input, Button} from 'antd';
import {Content} from './styles'
import Header from '../../components/Header';
import {useHistory, Link} from 'react-router-dom';
import { ErrorsEntity } from '../../interfaces';
const EditProducts = () => {
  const session = JSON.parse(sessionStorage.getItem('session') || '')
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number>()
  const [stock, setStock] = useState<number>()

  const handleSubmit = () => {
    setLoading(true)
    api.post('products', {
      name,
      description,
      category,
      price,
      stock
    }, {
      headers: {
        authorization: `Bearer ${session.token}`,
      }
    }).then(()=>{
      message.success('Produto cadastrado com sucesso')
      history.goBack()
    }).catch((e)=>{
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
    <>
      <Header signed />
      <Content>
        <Form size="large" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Link to="/products">Lista de produtos</Link>
          <h2>Novo</h2>
          <Form.Item label="Nome">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Categoria">
            <Input value={category} onChange={(e) => setCategory(e.target.value)} />
          </Form.Item>
          <Form.Item label="Descrição">
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Item>
          <Form.Item label="Preço">
            <Input
              type="number"
              value={price} 
              onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
            />
          </Form.Item>
          <Form.Item label="Estoque">
            <Input 
              type="number"
              value={stock}
              onChange={(e) => setStock(Number.parseFloat(e.target.value))}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2 }}>
            <Button
              onClick={handleSubmit}
              loading={loading}
              type="primary"
              block
              >{loading ? 'Aguarde' : 'Salvar'}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  )
}

export default EditProducts;