import React, {useState, useEffect, useCallback} from 'react';

import api from '../../services/api';
import {IProduct, IMetaData} from '../../interfaces'
import {List, message, Pagination, Button, Input} from 'antd';
import {Content, DivFilter} from './styles'
import Header from '../../components/Header';
import {useHistory} from 'react-router-dom';
import CardProduct from './CardProduct';

const Home = () => {
  const session = JSON.parse(sessionStorage.getItem('session') || '');
  const history = useHistory()
  const [nameSearch, setNameSearch] = useState('')
  const [descSearch, setDescSearch] = useState('')
  const [catSearch, setCatSearch] = useState('')


  const [currentPage, setCurrentPage] = useState(1)
  const [metaData, setMetaData] = useState<IMetaData>()
  const [products, setProducts] = useState<IProduct[]>([])

  const goToEditProducts = (p:IProduct) => {
    history.push(`/products/edit/${p.uuid}`)
  }

  const goToNewProduct = () => {
    history.push('/products/new')
  }

  const getListProducts = useCallback(()=>{
    api.get(`products?page=${currentPage}`, {
      headers:{
        authorization: `Bearer ${session.token}`
      },
      params: {
        name: nameSearch,
        category: catSearch,
        description: descSearch,
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
  },[catSearch, currentPage, descSearch, nameSearch, session.token])

  useEffect(()=>{
    getListProducts()
  },[getListProducts])

  return (
    <>
      <Header signed />
      <Content>
        <DivFilter>
          <Input
            value={nameSearch}
            onChange={(e) => {setNameSearch(e.target.value); setCurrentPage(1)}}
            placeholder="Nome"
          />
          <Input 
            value={catSearch}
            onChange={(e) => {setCatSearch(e.target.value); setCurrentPage(1)}}
            placeholder="Categoria"
          />
          <Input 
            value={descSearch}
            onChange={(e) => {setDescSearch(e.target.value); setCurrentPage(1)}}
            placeholder="Descrição"
          />
        </DivFilter>
        <List
          grid={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
          size="small"
          dataSource={products}
          renderItem={(item)=> (
              <CardProduct 
                token={session.token}
                product={item} 
                onClick={()=>goToEditProducts(item)}
                onDelete={()=>getListProducts()}
              />
            )} />
        <Pagination
          defaultCurrent={1}
          defaultPageSize={metaData?.per_page}
          pageSize={metaData?.per_page || 10}
          total={metaData?.total}
          onChange={(v)=>setCurrentPage(v)}
          style={{display: 'flex', justifyContent: 'center'}}
          current={currentPage}
        />
        <Button className="btnNewProduct" type="primary" onClick={goToNewProduct}>
          Novo Produto
        </Button>
      </Content>
    </>
  )
}

export default Home;