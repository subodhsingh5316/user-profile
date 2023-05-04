import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../Header/Header';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider } from '@react-oauth/google';

const Login = () => {
  const [loginData, setLoginData] = useState({
    role: '',
    email: '',
    password: ''
  })
  const [verified, setVerified] = useState(false)
  const [user, setUser] = useState({});
  const [state, seState] = useState("login")
  const [userData,setUserData] = useState()
  const navigate = useNavigate()

  const handleOnchange = (e) => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }
  const validateEmail = () => {
    if (loginData.email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(loginData.email);

    }
    return false
  }
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(true)
  }
  const validatePassword = () => {
    if (loginData.password) {
      return true
    }
    return false
  }

  // const responseGoogle = (response) => {
  //   console.log("response-----login", response);
  // }
  // function handleCallbackResponse(response) {
  //   //   console.log("Encoded JWT ID token" + response.credential);
  //   let userObject = jwt_decode(response.credential);
  //   if (userObject.email_verified == true) {
  //     navigate('/intern-dashboard')
  //     localStorage.removeItem("state")
  //     window.location.reload()
  //   }
  //   setUser(userObject);
  // }

  // const google = window.google;
  // useEffect(() => {
  //   google?.accounts.id.initialize({
  //     client_id:
  //       "224340966466-a78gscr8ktgtr6tp17soajavvr1dkl39.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });

  //   google?.accounts.id.renderButton(document.getElementById("googleSign"), {
  //     theme: "outline",
  //     width: "600px",
  //     padding: "10px 30px",
  //   });
  //   localStorage.setItem('state', JSON.stringify(state))
  // }, []);


  const handleOnsubmit = (e) => {
    e.preventDefault()
    if (validateEmail() && validatePassword) {
      setLoginData(loginData)
      fetch('http://localhost:3001/register')
        .then(res => res.json())
        .then(result => {
          const findresult = result.filter(item => item.email === loginData.email && item.password === loginData.password);
          console.log(findresult)
          if (findresult.length > 0) {
            setUserData("role",findresult)
            localStorage.setItem('userData', JSON.stringify(findresult))
            let role = findresult[0].role;
            if (role === 1) {
              localStorage.setItem('isAdmin',true)
              navigate('/admin-dashboard')
            }
            if (role === 2) {
              localStorage.setItem('isTrainee',true)
              navigate('/trainer-dashboard')
            }
            if (role === 3) {
              localStorage.setItem('isIntern',true)
              navigate('/intern-dashboard')
            }
          } else {
            alert('User not found!')
          }
        })
      setLoginData({
        role: "",
        email: '',
        password: ''
      })
    }

  }

  console.log("--->user",userData)

  return (
    <div>
      <Header />
      <Container className='d-flex justify-content-center align-middle'>
        <Card style={{ width: '25em', padding: '3%' }}>
          <Form onSubmit={handleOnsubmit}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name='email' value={loginData?.email} onChange={handleOnchange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" name='password' value={loginData?.password} onChange={handleOnchange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <ReCAPTCHA
                sitekey="6Lcss84eAAAAAMlhIpC5eekQlbdIUsMnaGrK-Q9Z"
                onChange={onChange}
              />
            </Form.Group>
            {/* <Form.Group>
          <button id="googleSign"> google login</button>
          </Form.Group> */}
            <Button style={{width:'100%'}} variant="primary" type="submit" disabled={!verified}>
              Submit
            </Button>
          </Form>
          <Card.Text style={{marginTop:"10px",width:'100%'}}>
          <GoogleOAuthProvider
           clientId="951327592702-647t4bjphsuhuvc55khqrj7ugvogogef.apps.googleusercontent.com">
            <GoogleLogin
            width='330px'
             size='large'
              onSuccess={credentialResponse => {
                const details = jwt_decode(credentialResponse.credential)
                setUserData(details)
                if (details.email_verified === true) {
                  navigate('/intern-dashboard')
                   localStorage.setItem('userData', JSON.stringify([details]))
                   localStorage.setItem('isIntern',true)
                }
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </GoogleOAuthProvider>
          </Card.Text>
          <Card.Text style={{margin:'auto'}}>
            <Link to ='/sign-up'>
            <small ><i className="fas fa-user-plus"></i> New Register</small>
            </Link>
          </Card.Text>
        </Card>
      </Container>

    </div>
  )
}

export default Login