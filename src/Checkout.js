import React, { useContext } from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'
import QuantityBtn from './QuantityBtn'
import { CartContext } from './CartContext'

export default function Checkout() {
  // const cartItem = {
  //   "cartItems":
  //   [
  //     {"id" : 4,"name" : "西瓜", "price" : 20,"image" : "watermelon.jpg","description":"新鮮西瓜2公斤，夏季必備", "quantity": 6},
  //     {"id" : 5,"name" : "藍梅", "price" : 10,"image" : "blueberry.jpg","description":"新鮮藍梅50克，補眼之寶", "quantity": 3}
  //   ]
  // }
  const {cartItems} = useContext(CartContext)
 
  const cartEmpty = cartItems.length<=0 ? true : false
  const grandTotal = cartItems.reduce((total, product) => {
    return total += product.price * product.quantity
  }, 0)
  const freeShippingPrice = 99

  return (
    <div>
      <Title mainTitle="購物車"/>
      {
        cartEmpty &&  
        <div>
          <div className="nothingInCart">購物車現在沒有商品<br/><br/>
          <Link to="/">去產品頁看看吧</Link></div> :
        </div>
      }
      {
        !cartEmpty && 
        <div className="container">
          <div className="cartSection">
            <table className="checkoutTable">
              <tbody>
                {
                  cartItems.map(product=>(
                    <tr key={product.id}>
                      <td>
                        <Link to={'/product/'+product.id}>
                        <img src={process.env.PUBLIC_URL+'/image/'+product.image} alt={product.name} />
                        </Link>
                      </td>
                      <td>
                        <p>名稱 : {product.name}</p>
                        <p>售價 : {product.price}元</p>
                        <p>描述 : {product.description}</p>
                      </td>
                      <td width="200">
                        <QuantityBtn productInfo={product} />
                      </td>
                      <td>
                        <div className="productSubTotal">
                          ${product.price*product.quantity}
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="checkoutSection">
            <div>全部貨品總共</div>
            <div className="grandTotal">{grandTotal}元</div>
            {
              grandTotal >= freeShippingPrice ? 
              <div className="freeShipping">✔️我們免費送貨</div> :
              <div className="noShipping">滿${freeShippingPrice}免費送貨<br/>還差${freeShippingPrice-grandTotal}</div>
            }
            <button>結帳付款</button>
          </div>
        </div> 
      }
    </div>
  )
}
