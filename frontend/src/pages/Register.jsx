import React ,{useState} from 'react'
import "../styles/login.css";
import {Container,Row,Col,Form,FormGroup,Button} from "reactstrap";
import {Link} from "react-router-dom";
import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png"
import axios from "axios";
import {BASE_URL} from "../utilis/config";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Store/Store';
const Register = () => {
  const setUserEmail = useAuthStore(state => state.setUserEmail);
  const setPassword = useAuthStore(state => state.setPassword);
  const setProfile = useAuthStore(state => state.setProfile);
  const navigate=useNavigate();
  const [file,setfile]=useState();
  const [username,setusername]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
const convertToBase64=(file)=>{
  return new Promise((resolve,reject)=>{
    const fileReader=new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload=()=>{
        resolve(fileReader.result);
    }
    fileReader.onerror=(error)=>{
        reject(error);
    }
})
}
const onUpload=async (e)=>{
  const base64=await convertToBase64(e.target.files[0]);
  setfile(base64);
}
const handleSubmit = async(e)=>{
  e.preventDefault();
  setUserEmail(email);
  setPassword(password);
  setProfile(file);
  const res=await axios.post(`${BASE_URL}/register`,{username,email,password,file});
  if(res.status===201){
    navigate('/confirmEmail');
  }
  else{
    navigate('/register');
  }
}
  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className='m-auto'>
           <div className='login__container d-flex justify-content-between'>
            <div className='login__img'>
              <img src={registerImg} alt=''/>
            </div>
            <div className='login__form'>
              <div className='user'>
                <label htmlFor='profile'><img className='registerImg' src={file?file:userIcon}  alt=''/></label>
                <input onChange={onUpload} type='file' id='profile' name='profile' accept="image/png, image/jpeg" />
              </div>
              <h2>Register</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <input type="text" placeholder="Username" required id='username' onChange={(e)=>{setusername(e.target.value)}}/>
                </FormGroup> 
                <FormGroup>
                  <input type="email" placeholder="Email" required id='email' onChange={(e)=>{setemail(e.target.value)}}/>
                </FormGroup>
                <FormGroup>
                  <input type="password" placeholder="Password" required id='password' onChange={(e)=>{setpassword(e.target.value)}}/>
                </FormGroup>
                <Button className='btn secondary__btn auth__btn' type='submit'>Create Account</Button>
              </Form>
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
           </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default Register
