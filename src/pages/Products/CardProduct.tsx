import React from 'react';
import {ItemProduct, DetailsProduct} from './styles';
import {IProduct} from '../../interfaces'
import { Avatar } from 'antd';
import img from '../../assets/avatar.jpg'

interface ICardProduct {
  product: IProduct
  onClick: ()=>void
}

const CardProduct = ({product, onClick}:ICardProduct) => {
  return (
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
  )
}

export default CardProduct;