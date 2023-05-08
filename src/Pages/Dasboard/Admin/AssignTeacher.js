import React, { useEffect, useState,useRef } from 'react';
import { Container, Card, Row, Button, Col, Dropdown, Spinner, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDataList, fetchDataList } from '../../../redux/slice/dataListSlice';
import { fetchRegisterData } from '../../../redux/slice/register'
import axios from 'axios';

const AssignTeacher = (props) => {
    const {data } = props
    const dispatch = useDispatch();
    const datalistGet = useSelector(state => state.RegisterReducer);
    const dataGet = useSelector(state => state.dataListReducer);
    const { dataList } = dataGet
    useEffect(() => {
        dispatch(fetchDataList())
        dispatch(fetchRegisterData())
    }, [])

    

    return (
        <div>
            <Container>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'Start' }}>
                    <>
                        {
                            data && data.filter((itemF, i) => itemF.teacher === true).map((item, i) =>
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

export default AssignTeacher