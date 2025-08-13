import {useState, useContext} from 'react'
import { CartContext } from './CartContext'

export default function QuantityBtn({productInfo}) {
  const {cartItems, setCartItems} = useContext(CartContext)
 
  // 1. 有沒有 button 所對應的產品
  let productIndexInCart = cartItems.findIndex((element) => {
    return element.id === productInfo.id
  })
  // findIndex 結果一，如果在購物車中找到產品，它將傳回 cartItems 中產品的索引位置 (0, 1, 2 .....) 到 productIndexInCart
  // findIndex 結果二，如果在購物車中找不到產品，它將傳回 -1 到 productIndexInCart

  const [numInCart, setNumInCart] = useState(
    (productIndexInCart === -1) ? 0 : cartItems[productIndexInCart].quantity
  )

  const handleAdd = () => {
    if(productIndexInCart === -1) {
      // 如果購物車中沒有此產品，則在 cartItems 陣列上新增新的物件元素
      setCartItems(
        [{
          id: productInfo.id,
          name: productInfo.name,
          image: productInfo.image,
          price: productInfo.price,
          description: productInfo.description,
          quantity: 1
        },
        ...cartItems]
      )
    } else {
      // 如果購物車中有此產品，則添加產品 quantity
      let newCartArray =  [...cartItems]
      newCartArray[productIndexInCart].quantity++
      setCartItems(newCartArray)
    }
    setNumInCart(numInCart + 1)
  }  
   const handleSubtract = () => {
    if(cartItems[productIndexInCart].quantity === 1) {
      // 如果購物車中的產品數量只有 1，則將其移除
      let newCartArray =  [...cartItems]
      newCartArray.splice(productIndexInCart, 1)
      setCartItems(newCartArray)

    } else {
      // 否則將 quantity 減 1
      let newCartArray =  [...cartItems]
      newCartArray[productIndexInCart].quantity--
      setCartItems(newCartArray)
    }
    setNumInCart(numInCart - 1)
  }  

  return (
    <div className="addToCart">
        {
            (numInCart === 0)?
            <span className="addToCartBtn" onClick={handleAdd}>加入購物車</span> :
            <div>
                <span className="subtractBtn" onClick={handleSubtract}> - </span>
                {numInCart} 件
                <span className="addBtn" onClick={handleAdd}> + </span>  
            </div>
        }
    </div>
  )
}
