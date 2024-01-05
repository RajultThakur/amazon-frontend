import React,{useState ,useEffect,useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from './Images/amazon.png'
import appContext from './context/appContext';
const url ='http://localhost:5000/auth'
function Login() {
    const navigate = useNavigate();

    const context = useContext(appContext);
    const { getLogedUserDetails } = context;
    const [user, setUser] = useState({email:"",password:""});
    const onchange =(e) =>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const login = async(e) => {
            e.preventDefault();
            const response = await fetch(`${url}/login`,{
                method:"POST",
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({email: user.email, password: user.password })
            })
            const data = await response.json();
            if(data.success === false){
                alert(data.mes);
                navigate('/signup')
            }else{
                localStorage.setItem("amazon-token",data.mes);
                setUser({ email: "", password: "" });
                navigate("/");
            }
    }
    useEffect(() => {
        if(localStorage.getItem('amazon-token')){
            getLogedUserDetails();
          navigate('/');

        }
      }, [])
    
    return (
        <>
        <div style={{textAlign:'center',
                     width: "320px",
                    margin:"auto",
                    background:"#131921",
                    marginTop:"20px"
                    }} className="logo">
                        <Link to="/">
            <img src={image} alt="" />
                        </Link>
        </div>
        <div className="login__card">
           <h2 style={{marginLeft:"30px" ,color:"#131921"}}>Login</h2>
           <form onSubmit={login} className="login">
               <div className="email">
               <label htmlFor="email">Enter your email address</label>
               <input type="email" name='email' required={true}  id="email" value ={user.email} onChange ={onchange} />
               </div>
               <div className="password">
               <label htmlFor="password">Password</label>
               <input type="password" name='password' required={true} id="password" value ={user.password} onChange ={onchange} />
               </div>
           <button type= "submit">Login</button>
           </form>
        </div>
        <div className="newuser">
            <label htmlFor="newuser"><span>____ </span> New to amazon <span> ____</span></label>
            <button type = "submit">
            <Link style={{textDecoration:"none",
                          color:"blace",
                          fontWeight:"500"}} id="newuser" to="/signup" >Sign-Up</Link>
            </button>
        </div>
        </>
    )
}

export default Login
