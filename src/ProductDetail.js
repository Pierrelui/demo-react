import React, { useState,useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Title from './Title';
import QuantityBtn from './QuantityBtn';

export default function ProductDetail() {
  const params = useParams()
  const [productDetail, setProductDetail] = useState(null)
  //useEffect hook
  useEffect(()=>{
    fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
      .then(response => response.json())
      .then(data => {
        let productInfo = data.find((element) => {
          return element.id === parseInt(params.id)
        })
        setProductDetail(productInfo)
      })
  },[params.id]) // <==  Dependency Array
  

  return (
    <div>
      {
        productDetail &&
        <div className="ProductDetail">
          <Title mainTitle='產品資料' />
          <table width="100%">
            <tbody>
              <tr>
                <td align="right">
                  <img src={process.env.PUBLIC_URL+'/image/'+productDetail.image} alt={productDetail.name} width="400" />
                </td>
                <td width="45%" padding="10">
                  <p>名稱 : {productDetail.name}</p>
                  <p>售價 : {productDetail.price}元</p>
                  <p>描述 : {productDetail.description}</p><br/>
                  <QuantityBtn productInfo={productDetail} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      }
  
      <Link to="/" >
        <div className="backToGoodsListBtn">↩️ 返回商品列表</div>
      </Link>
    </div>
  )
}
