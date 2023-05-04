import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Container } from 'react-bootstrap'
import {Button, Modal} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import Header from '../../component/Header/Header';
import jwt_decode from "jwt-decode";

const EditCourse = () => {
    const [lessonInput, setLessonInput] = useState([
        {
            unit_no:1,
            lessonName:'',
            detail:''
        }
    ])
    const [courseData,setCourseData] = useState({
        courseName:'',
        author:'',
        lesson:[{
            unit_no:1,
            lessonName:'',
            detail:''
        }],
        price:'',
        quantity:1
    })
    let  userId  = useParams();
    const nevigate = useNavigate()
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({});
    const [state,seState] = useState("login")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAdd =()=>{
        setLessonInput([...lessonInput,{
            unit_no:1,
            lessonName:'',
            detail:''
        }])
    }
    const handleLessonOnchange = (e,index) => {
        const {name,value} = e.target
        setCourseData({...courseData,lesson:courseData.lesson.map((item,i)=>{
            if(index== i){
                return {...item,[name]:value}
            }
            return item
        })})
    }
    const handleOnchange = (e,index)=>{
        const {name,value} = e.target;
        setCourseData({...courseData,[name]:value})
    }

   console.log("courseData---",courseData.lesson)
    const handleSave = ()=>{
        setCourseData({...courseData,lesson:[{
            unit_no:'',
            lessonName:'',
            detail:''
        }]})
        handleClose()
    }
    const getData =async()=>{
        const res = await axios.get(`http://localhost:3001/posts/${userId.id}`)
        setCourseData(res.data)
    }
    console.log("--",courseData)
    useEffect(()=>{
        getData()
    },[])
    const handleSubmit=(e,id)=>{
          e.preventDefault()
          axios.put(`http://localhost:3001/posts/${userId.id}`,courseData)
          nevigate('/')
          setCourseData({
            courseName:'',
            author:'',
            lesson:[{
                unit_no:1,
                lessonName:'',
                detail:''
            }],
            price:'',
            quantity:''
        })
    }

    function handleCallbackResponse(response) {
        //   console.log("Encoded JWT ID token" + response.credential);
        let userObject = jwt_decode(response.credential);
        if (userObject.email_verified == true) {
          nevigate('/dashboard')
          localStorage.removeItem("state")
          window.location.reload()
        }
        setUser(userObject);
      }
    
    //   const google = window.google;
    //   useEffect(() => {
    //     google.accounts.id.initialize({
    //       client_id:
    //         "224340966466-a78gscr8ktgtr6tp17soajavvr1dkl39.apps.googleusercontent.com",
    //       callback: handleCallbackResponse,
    //     });
    
    //     google.accounts.id.renderButton(document.getElementById("googleSign"), {
    //       theme: "outline",
    //       width: "300px",
    //       padding: "10px 30px",
    //     });
    //     localStorage.setItem('state',JSON.stringify(state))
    //   }, []);
    return (
        <div>
            <Header/>
            <Container style={{marginLeft:'30%'}}>
                <Card style={{width:"25em",padding:"2%"}}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="courseName">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter course name"  name='courseName' defaultValue={courseData.courseName} onChange={handleOnchange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="name" placeholder="Enter author name"  name='author' defaultValue={courseData.author} onChange={handleOnchange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Button onClick={handleShow}>Add lesson</Button>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>price</Form.Label>
                            <Form.Control type="name" placeholder="Enter price"  name='price' defaultValue={courseData.price} onChange={handleOnchange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="quantity">
                            <Form.Label>quantity</Form.Label>
                            <Form.Control type="name" placeholder="Enter quantity"  name='quantity' defaultValue={courseData.quantity} onChange={handleOnchange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                    </Form>
                </Card>
            </Container>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Form>

                    {
                        courseData.lesson && courseData.lesson.map((item, i) => {console.log("item",item)
                            return (
                                <>
                                   <Form.Group key={i} className="mb-3" controlId="courseName" style={{ padding: '3%' }}>
                                        <Form.Label>Lesson number</Form.Label>
                                        <Form.Control type="name" placeholder="Enter lesson name" name='unit_no' defaultValue={item?.unit_no} onChange={(e)=>handleLessonOnchange(e,i)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="courseName" style={{ padding: '3%' }}>
                                        <Form.Label>Lesson Name</Form.Label>
                                        <Form.Control type="name" placeholder="Enter lesson name" name='lessonName'  defaultValue={item?.lessonName } onChange={(e)=>handleLessonOnchange(e,i)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="courseName" style={{ padding: '3%' }}>
                                        <Form.Label>Desciption</Form.Label>
                                        <Form.Control type="name" as="textarea" rows={3} placeholder="Enter course name" name='detail' defaultValue={item?.detail } onChange={(e)=>handleLessonOnchange(e,i)} />
                                    </Form.Group>
                                </>

                            )
                        })
                    }
                    <Button size='sm' variant='outline-primary' style={{ borderRadius: '50px', margin: "3%" }} onClick={() => handleAdd()}><i className='fa fa-plus'></i></Button>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave} >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default EditCourse