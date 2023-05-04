import React, { useState, useRef, useEffect } from 'react'
import { Card, Container, Form, Button, Row,Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import Header from '../Header/Header';
import axios from 'axios'

const EditProfile = () => {
    const [data, setData] = useState({
        file: '',
        name: '',
        username: '',
        role: '',
        email: '',
        password: '',
        confirm_password: ''
      })
      const [err, setError] = useState({});
      const [imgUrl, setImgUrl] = useState('');
      const [preview, setPreview] = useState(null);

      const nevigate = useNavigate()
      const fileRef = useRef();
      const registerValidations = (val) => {
        console.log(val.confirm_password == val.password, "val");
        const err = {};
    
        var regexEmail = /\S+@\S+\.\S+/;
        var regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        // const regexPhone = /^[\d,\s,\+,\-]{10}/;
    
        if (!val.email) {
          err.email = "email is required";
        } else if (!regexEmail.test(val.email)) {
          err.email = "Please enter valid email address!";
        }
        if (!val.name) {
          err.name = "name is required";
        } else if (val.name.length < 3) {
          err.name = "name should have atleast 3 characters!";
        } else if (val.name.length >= 15) {
          err.name = "name should have atmax 15 characters!";
        }
        if (!val.role) {
          err.role = "role is required";
        } else if (val.role.length < 3) {
          err.role = "role should have atleast 3 characters!";
        } else if (val.role.length >= 15) {
          err.role = "role should have atmax 15 characters!";
        }
    
        if (!val.username) {
          err.username = "username is required";
        } else if (val.username.length < 3) {
          err.username = "username should have atleast 3 characters!";
        } else if (val.username.length >= 10) {
          err.username = "username should have atmax 15 characters!";
        }
        if (!val.password) {
          err.password = "password is required";
        } else if (val.password.length < 6) {
          err.password = "password should have atleast 6 characters!";
        } else if (!regexPassword.test(val.password)) {
          err.password = "password should have strings,numbers,symblys!";
        }
    
        if (!val.confirm_password) {
          err.confirm_password = "please confirm your password";
        } else if (val.confirm_password.length < 6) {
          err.confirm_password = "password should have atleast 6 characters!";
        } else if (!regexPassword.test(val.confirm_password)) {
          err.confirm_password = "password should have strings,numbers,symblys!";
        } else if (val.confirm_password != val.password) {
          err.confirm_password = "password and confirm password should be same";
        }
        return err;
      };
    
      if (imgUrl) {
        let reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(imgUrl);
      }
    
      // const handleOnchangeFule = (e) => {
      //   setImgUrl(e.target.files[0]);
      // };
    
      console.log("subodh", imgUrl)
      const handleOnchange = (e) => {
    
        const { name, value } = e.target
        setData({ ...data, [name]: value })
        setError(registerValidations(data));
      }
      const handleOnsubmit = (e) => {
        e.preventDefault()
        if (data.name !== "" && data.username !== "" && data.email !== "" && data.confirm_password !== "" && data.password !== "" ) {
          // setData({...data,file:imgUrl.name})
        //  axios.get(``)
        //   axios.post(`http://localhost:3001/register`, data)
        localStorage.setItem('userData', JSON.stringify([data]))
        nevigate(-1)
          setData({
            file: '',
            name: '',
            username: '',
            role: 3,
            email: '',
            password: '',
            confirm_password: ''
          })
        } else {
          setError(registerValidations(data));
        }
      }
      useEffect(() => {
        setPreview(preview)
      }, [preview])
      useEffect(()=>{
        const item = JSON.parse(localStorage.getItem('userData'));
    if (item) {
        setData(...item);
    }
    console.log("data",data)
      },[])
      console.log("---data", data)
      return (
        <div>
          <Header />
          <Container className='d-flex justify-content-center'>
                     {/* <Col>
                    <Button variant="primary" onClick={() => nevigate(-1)} >
                       Back
                    </Button>
                    </Col> */}
            <Card style={{ width: '30em', padding: '3%' }}>
              <Form
                onSubmit={handleOnsubmit}
              >
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" placeholder="Enter name" name='name' defaultValue={data?.name} onChange={handleOnchange} />
                  {
                    err && (<Form.Text style={{ color: "red", marginLeft: '20px' }}>{err.name}</Form.Text>)
                  }
                </Form.Group>
                <Form.Group className="mb-3" controlId="Username">
                  <Form.Label>User name</Form.Label>
                  <Form.Control type="name" placeholder="Enter Username" name='username' defaultValue={data?.username} onChange={handleOnchange} />
                  {
                    err && (<Form.Text style={{ color: "red", marginLeft: '20px' }}>{err.username}</Form.Text>)
                  }
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name='email' defaultValue={data?.email} onChange={handleOnchange} />
                  {
                    err && (<Form.Text style={{ color: "red", marginLeft: '20px' }}>{err.email}</Form.Text>)
                  }
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" name='password' defaultValue={data?.password} onChange={handleOnchange} />
                  {
                    err && (<Form.Text style={{ color: "red", marginLeft: '20px' }}>{err.password}</Form.Text>)
                  }
                </Form.Group>
                <Form.Group className="mb-3" controlId="Confirm password">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter Confirm password" name='confirm_password' defaultValue={data?.confirm_password} onChange={handleOnchange} />
                  {
                    err && (<Form.Text style={{ color: "red", marginLeft: '20px' }}>{err.confirm_password}</Form.Text>)
                  }
                </Form.Group>
                <Row>
                    <Col>
                    <Button variant="primary" type="submit">
                       Submit
                   </Button>
                    </Col>
                    <Col>
                       <Button onClick={()=>nevigate(-1)}>
                         Back
                       </Button>
                    </Col>
                </Row>
              </Form>
              {/* <Card.Text style={{margin:'auto'}}>
                <Link to ='/login'>
                <small ><i className="fas fa-user-plus"></i>  Already login</small>
                </Link>
              </Card.Text> */}
            </Card>
          </Container>
        </div>
      )
    }

export default EditProfile