import React ,{useState} from 'react'
import "../styles/login.css";
import {Container,Row,Col,Form,FormGroup,Button} from "reactstrap";
import {Link} from "react-router-dom";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {BASE_URL} from "../utilis/config";
import { useAuthStore } from '../Store/Store';
const Login = () => {
  const UserEmail = useAuthStore(state => state.auth.userEmail);
  const Password = useAuthStore(state => state.auth.password);
  const Profile = useAuthStore(state => state.auth.profile);
  const navigate=useNavigate();
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
const handleSubmit=async(e)=>{
  e.preventDefault();
  await axios.post(`${BASE_URL}/login`,{email:email||UserEmail,password:password||Password})
  .then(res=>{
    if(res.status===200){
      localStorage.setItem('token',res.data.token);
      localStorage.setItem('role',res.data.role);
      navigate('/');
    }
  })
  .catch(err=>{
    alert(err.response.data.message);
    console.log(err);
  })
}
  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className='m-auto'>
           <div className='login__container d-flex justify-content-between'>
            <div className='login__img'>
              <img src={loginImg} alt=''/>
            </div>
            <div className='login__form'>
              <div className='user'>
                <img src={Profile?Profile:userIcon}  alt=''/>
              </div>
              <h2>Login</h2>
              <Form onSubmit={handleSubmit}> 
                <FormGroup>
                  <input type="email" value={UserEmail||email} placeholder="Email" required id='email' onChange={(e)=>{setemail(e.target.value)}}/>
                </FormGroup>
                <FormGroup>
                  <input type="password" value={Password||password} placeholder="Password" required id='password' onChange={(e)=>{setpassword(e.target.value)}}/>
                </FormGroup>
                <Button className='btn secondary__btn auth__btn' type='submit'>Login</Button>
              </Form>
              <p>Forgot Password? <Link to="/recovery">Recover Now</Link></p>
              <p>Don't have an account? <Link to="/register">Create</Link></p>
            </div>
           </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login
