import React, {useState, useEffect, useCallback} from 'react';

import api from '../../services/api';
import {message, Form, Input, Button} from 'antd';
import {Content} from './styles'
import Header from '../../components/Header';
import {useParams} from 'react-router-dom';
import {IProduct} from '../../interfaces'
const EditProducts = () => {
  const session = JSON.parse(sessionStorage.getItem('session') || '')
  const {id} = useParams()

  const [loading, setLoading] = useState(true)

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number>()
  const [stock, setStock] = useState<number>()

  const getProduct = useCallback(()=>{
    setLoading(true)
    api.get(`products/${id}`, {
      headers:{
        authorization: `Bearer ${session.token}`,
      },
    }).then(response=>{
      const product:IProduct = response.data
      setName(product.name)
      setCategory(product.category)
      setDescription(product.description)
      setPrice(product.price)
      setStock(product.stock)
    }).catch( e => {
      if(e.response){
        message.error(e.response.data.error)
      }
    }).finally(()=>{
      setLoading(false)
    })
  },[id, session.token])

  const handleUpdate = () => {
    setLoading(true)
    api.put(`products/${id}`, {
      name,
      description,
      category,
      price,
      stock
    }, {
      headers: {
        authorization: `Bearer ${session.token}`,
      }
    }).then(response=>{
      message.success('Informações Atualizadas')
    }).catch((e)=>{
      message.error('Erro')
    }).finally(()=>{
      setLoading(false)
    })
  }

  useEffect(()=>{
    getProduct()
  },[getProduct])

  return (
    <>
      <Header signed />
      <Content>
        <Form size="large" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <h2>Produto</h2>
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
            <Input value={price} onChange={(e) => setPrice(Number.parseFloat(e.target.value))} />
          </Form.Item>
          <Form.Item label="Estoque">
            <Input value={stock} onChange={(e) => setStock(Number.parseFloat(e.target.value))} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button 
              onClick={handleUpdate}
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