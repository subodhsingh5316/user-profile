import React, { useEffect, useState,useRef } from 'react';
import { Container, Card, Row, Button, Col, Dropdown, Spinner, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDataList, fetchDataList } from '../../../redux/slice/dataListSlice';
import axios from 'axios';

const AssignTeacherCourse = (props) => {
    const { data } = props
    const dispatch = useDispatch();
    // const dataGet = useSelector(state => state.dataListReducer);
    // const { dataList } = dataGet
    // useEffect(() => {
    //     dispatch(fetchDataList())
    // }, [])
    const [items, setItems] = useState();
    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('userData'));
        console.log("----name", item)
        if (item) {
            setItems(...item);
        }
    }, []);

    

    return (
        <div>
            <Container>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'Start' }}>
                    <>
                        {
                            data && data.filter((itemF, i) => itemF.teacher === true && itemF.name === items?.name).map((item, i) =>
                            (
                                <Card style={{ width: '18rem', margin: '1%' }}>
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <Card.Title>{item.courseName}</Card.Title>
                                            </Col>
                                            <Col>
                                                <Card.Text><strong>{item.teacher_name}</strong></Card.Text>
                                            </Col>
                                        </Row>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the
                                            bulk of the card's content.
                                        </Card.Text>
                                        <Row style={{ margin: '2%' }}>
                                                {
                                                    item?.lesson && item?.lesson?.map((item1, id) => {
                                                        return (
                                                            <Col>
                                                                {
                                                                    <Button size='large' variant={item1?.lessonStatus === true ? "success" : "info"} disabled>{item1.unit_no}</Button>
                                                                }
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        <Row style={{ margin: '2%' }}>
                                            <Button size='large'>{item.author}</Button>
                                        </Row>
                                        <Row style={{ margin: '2%' }}>
                                            <LinkContainer to={`/view-course/${item.id}`}>
                                                <Button variant="warning">view course</Button>
                                            </LinkContainer>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            )
                            )
                        }
                    </>
                </div>
            </Container>
        </div>
    )
}

export default AssignTeacherCourse