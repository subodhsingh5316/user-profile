import React, { useState } from 'react'
import { Card, Container, Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import Header from '../../component/Header/Header';

const AddCourse = () => {
    const [lessonInput, setLessonInput] = useState([
        {
            unit_no:1,
            lessonName:'',
            detail:''
        }
    ])
    const [courseData, setCourseData] = useState({
        courseName: '',
        author: '',
        lesson:[],
        price: '',
        quantity: 1
    })
    const handleAdd =()=>{
        setLessonInput([...lessonInput,{
            unit_no:1,
            lessonName:'',
            detail:''
        }])
    }
    const handleLessonOnchange = (e,i) => {
        const { name, value } = e.target
        let inputData = [...lessonInput]
        inputData[i][name] = value
        setLessonInput(inputData)
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleOnchange = (e) => {
        const { name, value } = e.target
        setCourseData({ ...courseData, [name]: value })
    }
    const handleSave = ()=>{
        courseData.lesson.push(...lessonInput)
        handleClose()
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(courseData !== ""){
            axios.post('http://localhost:3001/posts', courseData)
        setCourseData({
            courseName: '',
            author: '',
            lesson: [{
                unit_no:1,
                lessonName:'',
                detail:''
            }],
            price: '',
            quantity: 1,
        })
        }
    }
    console.log(courseData)

    return (
        <div>
            <Header />
            <Container style={{ marginTop: '10vh' }}>
                <Card style={{ width: "25em", padding: "2%", margin: 'auto' }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="courseName">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter course name" name='courseName' value={courseData.courseName} onChange={handleOnchange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="name" placeholder="Enter author name" name='author' value={courseData.author} onChange={handleOnchange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Button onClick={handleShow}>Add lesson</Button>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>price</Form.Label>
                            <Form.Control type="name" placeholder="Enter price" name='price' value={courseData.price} onChange={handleOnchange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="quantity">
                            <Form.Label>quantity</Form.Label>
                            <Form.Control type="name" placeholder="Enter quantity" name='quantity' value={courseData.quantity} onChange={handleOnchange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
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
                        lessonInput && lessonInput.map((item, i) => {
                            return (
                                <>
                                   <Form.Group key={i} className="mb-3" controlId="courseName" style={{ padding: '3%' }}>
                                        <Form.Label>Lesson number</Form.Label>
                                        <Form.Control type="name" placeholder="Enter lesson name" name='unit_no' value={item.unit_no} onChange={(e)=>handleLessonOnchange(e,i)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="courseName" style={{ padding: '3%' }}>
                                        <Form.Label>Lesson Name</Form.Label>
                                        <Form.Control type="name" placeholder="Enter lesson name" name='lessonName'  value={lessonInput?.lessonName} onChange={(e)=>handleLessonOnchange(e,i)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="courseName" style={{ padding: '3%' }}>
                                        <Form.Label>Desciption</Form.Label>
                                        <Form.Control type="name" as="textarea" rows={3} placeholder="Enter course name" name='detail' value={lessonInput?.detail} onChange={(e)=>handleLessonOnchange(e,i)} />
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

export default AddCourse