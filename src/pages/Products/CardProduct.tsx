import React from 'react';
import {
  ItemProduct, DetailsProduct, 
  DivOptions, DivCardProduct, ItemDanger,
} from './styles';
import {IProduct} from '../../interfaces'
import {Avatar, Menu, Dropdown, Button, Modal, message} from 'antd';
import img from '../../assets/avatar.jpg'
import {Link} from 'react-router-dom';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import api from '../../services/api';

interface ICardProduct {
  product: IProduct
  onClick: ()=>void
  onDelete: ()=>void
  token: string
}

const CardProduct = ({product, onClick, token, onDelete}:ICardProduct) => {
  const {confirm} = Modal;
  const showDelete = () => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Confirmar',
      cancelText: 'Voltar',
      onOk() {
        api.delete(`products/${product.uuid}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        }).then(()=>{
          message.success('Produto excluido com sucesso')
          onDelete()
        }).catch(()=>{
          message.error('Não foi possivel realizar a ação')
        })
      },
      onCancel(){}
    });
  }

  const menu = () => (
    <Menu>
      <Menu.Item>
        <Link to={`products/edit/${product.uuid}`}>Editar</Link>
      </Menu.Item>
      <Menu.Item>
        <ItemDanger onClick={showDelete}>Excluir</ItemDanger>
      </Menu.Item>
    </Menu>
  )

  return (
    <DivCardProduct>
      <ItemProduct onClick={onClick}>
        <Avatar size={100} src={img} />
        <DetailsProduct>
          <label><b>Nome:</b> {product.name}</label>
          <label><b>Categoria:</b> {product.category}</label>
          <label><b>Descrição:</b> {product.description}</label>
          <label><b>Preço:</b> {product.price}</label>
          <label><b>Estock:</b> {product.stock}</label>
        </DetailsProduct>
      </ItemProduct>
      <DivOptions>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button>Opções</Button>
        </Dropdown>
      </DivOptions>
    </DivCardProduct>
  )
}

export default CardProduct;