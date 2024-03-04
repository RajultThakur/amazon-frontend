import React, { useContext, useEffect } from 'react'
import logo from '../Images/amazon.png'
import appContext from '../context/appContext';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useNavigate } from 'react-router-dom';
import Cart from '@material-ui/icons/ShoppingCart';
function Navbar () {
    const navigate = useNavigate();
    const context = useContext(appContext);
    const {setTotal,setCartTotal, cartTotal, cartProducts, setCartProducts ,logedUser,searchProducts } = context;
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    const logout = () => {
        localStorage.removeItem("amazon-token");
        localStorage.removeItem("cartTotal");
        setTotal(0);
        setCartProducts([]);
        setCartTotal(0);
        // navigate('/cartpage')
        navigate('/')
        setTimeout(() => {
            navigate('/')
        }, 100);
    }

    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="not found" />
                </Link>
            </div>
            <div className="pincode">
                <form>
                    i
                </form>
            </div>
            <div className="searchbox">
                <input style = {{outline:"none"}} onClick={() => {navigate("/productpage")}}
                onChange = {(e)=>{searchProducts(e.target.value)}} type="text" />
                <div className='searchIcon'><span><SearchIcon /></span></div>
            </div>
            <div className='AccDetails'>
                {logedUser.email ? <Link to = "/profile"><p style = {{textDecoration:"underline"}}>Hello,{logedUser.name} <button className="logout" onClick={logout}>Log-Out</button></p>
                    <p>{logedUser.email}</p></Link> :
                    <>
                        <p>Hello,<Link style={{
                            marginInline: "31px",
                            fontSize: "14px"
                        }} to="/login">Login</Link></p>
                        <p>Account & Details</p> </>}
            </div>

            <div className='AddDetails'>
                <p>Address</p>
                <p>Damoh, 470661</p>
            </div>

            {/* <div className='AddDetails'>
            <p>Returns </p>
            <p>& Orders</p>
            </div> */}

            <div className='Cart' style={{ paddingInline: "8px" }}>
                <Link to="/cartpage">
                    <Cart style={{ fontSize: "42px", color: "white" }} />
                    <p style={{ color: 'black' }}>{cartTotal ? cartTotal : localStorage.getItem('cartTotal')}</p>
                </Link>
            </div>
            {/* <Link to = "/login">login</Link> */}
        </div>
    )
}

export default Navbar
