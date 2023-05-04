import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import Header from '../../component/Header/Header';
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';

const TrainerDasbord = () => {
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    let userId = useParams();
    const nevigate = useNavigate()
    const getData = async () => {
        const res = await axios.get(`http://localhost:3001/posts`)
        setData(res.data)
    }
    useEffect(() => {
        getData()
    }, [])
    // const handleSubmit = (e, id) => {
    //     e.preventDefault()
    //     if (courseData !== "") {
    //         axios.put(`http://localhost:3001/posts/${userId.id}`, courseData)
    //         nevigate('/')
    //     }
    // }
    const handleStatusChange = (id, lessonId) => {
        const tempData = data?.map((lesson) => {
            // console.log("Lesson Id: ", lesson?.id, id);
            if (lesson?.id === id) {
                const tempCourse = lesson?.lesson?.map((course) => {
                    // console.log("Course Id: ", course?.lesson_id, lessonId);
                    if (course?.lesson_id === lessonId) {
                        console.log("Course: ", course);
                        return { ...course, lessonStatus: true }
                    } else {
                        return { ...course }
                    }
                })
                return { ...lesson, lesson: tempCourse }
            } else {
                return lesson;
            }
        });
        console.log("new data: ", tempData);
        setData(tempData);
    }
    console.log("lesson-->>", data1)
    if (!localStorage.getItem("isTrainee")) {
        window.location.replace("/");
        localStorage.clear();
    }

    return (
        <div>
            <Header />
            <Container>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'Start' }}>
                    {
                        data && data.map((item, i) => {
                            return (
                                <Card style={{ width: '18rem', margin: '1%' }}>
                                    <Card.Body>
                                        <Card.Title>{item.courseName}</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the
                                            bulk of the card's content.
                                        </Card.Text>
                                        <Row style={{ margin: '2%' }}>
                                            {
                                                item?.lesson && item?.lesson?.map((item1, id) => {console.log("lesson item :",item1)
                                                    return (
                                                        <Col>
                                                            {
                                                                <Button size='large' variant={item1?.lessonStatus === true ? "success" : "info"} onClick={() => handleStatusChange(item.id, item1?.lesson_id)}>{item1.unit_no}</Button>
                                                            }
                                                        </Col>
                                                    )
                                                })
                                            }
                                            <Col>
                                                <Card.Text> Qty:- {item.quantity}</Card.Text>
                                            </Col>
                                        </Row>
                                        {/* <Row>
                                            <Link to={`/view-course/${item.id}`}>
                                                <Button variant="primary">View</Button>
                                            </Link>
                                        </Row> */}
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </div>
            </Container>
        </div>
    )
}

export default TrainerDasbord