import React, { useEffect, useState } from 'react'
import { Container, InputGroup, Form, Dropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import {useNavigate} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { googleLogout } from '@react-oauth/google';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const Header = (props) => {
  const classes = useStyles();
  const [items, setItems] = useState()
  const [imgUrl, setImgUrl] = useState('');
  const [preview, setPreview] = useState(null);
  const { data, HeaderData,HeaderDataTrain, QuarryModal, search, handleserchChange } = props
  console.log(search)
  
  const navigate = useNavigate()
  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('userData'));
    console.log("----name", item)
    if (item) {
      setItems(item);
    }
  }, []);
  console.log("local", items)
  const logOut = () => {
    // nevigate('/') email_verified
    // window.location.href('/')
    googleLogout()
    window.location.href = window.location.origin+ '/login'
    // localStorage.removeItem("userData")
    localStorage.clear()
    // window.location.reload()
  }
  return (
    <Navbar bg="info" expand="lg" className='mb-4'>
      <Container>
        <Navbar.Brand href="/">NeoSoft</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <InputGroup className="mb-2" style={{ width: '50%' }}>
          <Form.Control
            placeholder="Search"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={search}
            onChange={(e) => { handleserchChange(e) }}
            onkeydown={()=>{}}
          />
          <InputGroup.Text id="basic-addon2"><i className='fa fa-search'></i></InputGroup.Text>
        </InputGroup>
        {HeaderData && (
          <Nav.Link href="/add-course">
            <strong style={{ color: 'grey' }}>{HeaderData}</strong>
          </Nav.Link>
        )}
        {data && (
          <>
            <Nav.Link onClick={QuarryModal}>
            <strong style={{ color: 'grey' }}>{data}</strong>
          </Nav.Link>
          </>
        )}
        <div className='d-flex justify-content-end'>
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto ">
              {
               items && items.length > 0 ? (
                <> 
                 { items[0]?.email_verified == true?(
                 <Avatar alt={items[0]?.name}  src={items[0]?.picture} />
                 ):(
                  <Avatar alt={items[0]?.name} src='subodh.jpg' />
                 )
                 }
                  
                  <Dropdown>
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                      {items[0]?.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      { (items[0].email_verified==true )?(<Dropdown.Item  disabled>Profile</Dropdown.Item>):(<Dropdown.Item href="/editprofile">Profile</Dropdown.Item>)}
                      <Dropdown.Item onClick={() => {logOut()}}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
                ):(
              <Nav.Link href="/login">Login</Nav.Link>
              )
              }
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  )
}

export default Header