import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import ProductList from './ProductList';
import CheckOut from './Checkout';
import ProductDetail from './ProductDetail';
import { CartContext } from './CartContext';
import { useState } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([])
  return (
    <BrowserRouter>
      <CartContext.Provider value={{cartItems, setCartItems}}>
        <nav>
					<Link to="/">首頁</Link>
					<Link to="/checkout">購物車</Link>
				</nav>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/product' element={<ProductDetail />} >
            <Route path='/product/:id' element={<ProductDetail />} />
          </Route>
          <Route path='*' element={<p>404 找不到頁面</p>} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
