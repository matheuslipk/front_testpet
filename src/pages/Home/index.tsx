import React, {useState, useEffect, useCallback} from 'react';

import api from '../../services/api';
import {IProduct, IMetaData} from '../../interfaces'
import {List, message, Pagination} from 'antd';
import {ItemProduct, HeaderList, Content} from './styles'

const Home: React.FC = () => {
  const session = JSON.parse(sessionStorage.getItem('session') || '');

  const [currentPage, setCurrentPage] = useState(1)
  const [metaData, setMetaData] = useState<IMetaData>()
  const [products, setProducts] = useState<IProduct[]>([])

  const getListProducts = useCallback(()=>{
    api.get(`products?page=${currentPage}`, {
      headers:{
        authorization: `Bearer ${session.token}`
      }
    }).then(response=>{
      const tempMetaData:IMetaData = response.data.meta;
      setProducts(response.data.data);
      setMetaData(tempMetaData);
    }).catch(e=>{
      if(e.response){
        if(e.response.status===401){
          sessionStorage.removeItem('session')
          message.error(JSON.stringify(e.response.data))
        }
      }
    })
  },[session.token, currentPage])

  useEffect(()=>{
    getListProducts()
  },[getListProducts])

  return (
    <Content>
      <HeaderList>
        <label>Nome</label>
        <label>Categoria</label>
        <label>Descrição</label>
      </HeaderList>
      <List
        size="small"
        dataSource={products}
        renderItem={(item)=>(
          <ItemProduct onClick={()=>console.log(item.uuid)}>
            <label>{item.name}</label>
            <label>{item.category}</label>
            <label>{item.description}</label>
          </ItemProduct>
      )}/>
      <Pagination
        defaultCurrent={1}
        showTotal={(total)=> `${total} itens`}
        defaultPageSize={metaData?.per_page}
        pageSize={metaData?.per_page || 10}
        total={metaData?.total}
        onChange={(v)=>setCurrentPage(v)}
        style={{display: 'flex', justifyContent: 'center'}}
        current={currentPage}
      />
    </Content>
  )
}

export default Home;