import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login';
import Navbar from './components/Home/Navbar';
import AppState from './components/context/appState';
import ProductPage from './components/ProductData/ProductPage';
import Signup from './components/Signup';
import SeparateProduct from './components/ProductData/SeparateProduct';
import CartPage from './components/Cart/CartPage';
import BuyNow from './components/Buying Process/BuyNow';
import MyProfile from './components/Profile/MyProfile';
import CheckoutSuccess from './components/CheckoutSuccess';
function App () {
  return (
    <AppState>
      <Router>
        <Routes>
          <Route exact path="/" element = {<><Navbar />
            <Home /></>}/>
          <Route exact path="/login" element = {<Login/>}/>
          <Route exact path="/signup" element = {<Signup/>}/>
          <Route exact path="/productpage" element = {<><Navbar />
            <ProductPage /></>}/>
          <Route exact path="/cartpage" element = {<><Navbar />
            <CartPage /></>}/ >
          <Route exact path="/:id/seperateproduct" element = {<><Navbar />
          <div style={{ background: "white" }}>
              <SeparateProduct />
            </div></>}/>
          <Route exact path="/buynow" element = {<><Navbar />
            <BuyNow /></>}/>
          <Route exact path="/profile" element = {<><Navbar />
            <MyProfile /></>}/>
            <Route exact path='/order/success' element={<CheckoutSuccess />} />
            </Routes>
      </Router>
    </AppState>
  );
}

export default App;
