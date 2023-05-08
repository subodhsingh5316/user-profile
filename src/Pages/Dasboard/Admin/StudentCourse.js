import React, { useEffect, useState,useRef } from 'react';
import { Container, Card, Row, Button, Col, Dropdown, Spinner, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDataList, fetchDataList } from '../../../redux/slice/dataListSlice';
import { fetchRegisterData } from '../../../redux/slice/register'
import axios from 'axios';

const StudentCourse = (props) => {
    const { data } = props
    const dispatch = useDispatch();
    const selectForm = useRef(null)
    const [courseData,setCourseData] = useState([])
    const datalistGet = useSelector(state => state.RegisterReducer);
    const dataGet = useSelector(state => state.dataListReducer);
    const { registerData, loading } = datalistGet
    const { dataList } = dataGet
    const [teacherData, setTeacherData] = useState({
        teacher_name:"Teacher"
    })
    useEffect(() => {
        dispatch(fetchDataList())
        dispatch(fetchRegisterData())
    }, [])

    useEffect(()=>{
        setCourseData(dataList)
    },[])
    // const handleOnchange = (e) => {
    //     setTeacherData(e.target.value)
    // }
    const handleSubmit = (e,id)=>{
         let name =e.target.value
        let result = dataList.filter((item)=> {
        if(item.id === id){
            return{item}
        }
        })
         let lastResult=Object.assign(...result)
        if(teacherData !== "Teacher"){
            axios.put(`http://localhost:3001/posts/${id}`,{ ...lastResult, teacher: true, teacher_name:  name})
        }
        dispatch(fetchDataList())
    }

    return (
        <div>
            <Container>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'Start' }}>
                    <>
                        {
                            data && data.filter((itemF, i) => itemF.status === true && itemF.teacher === false).map((item, i) =>
                            (
                                <Card style={{ width: '18rem', margin: '1%' }}>
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <Card.Title>{item.courseName}</Card.Title>
                                            </Col>
                                            <Col>
                                            <Form.Select  defaultValue={teacherData?.teacher_name} onChange={(e)=>handleSubmit(e,item.id)}>
                                                     <option value="Teacher"> Teacher</option>
                                                {
                                                    loading ? (<Spinner />
                                                    ) : (
                                                        <>
                                                            {
                                                                registerData && registerData?.filter(item => item.role === 2).map((item, i) => (
                                                                            <option value={item.name}>{item.name}</option>
                                                                ))
                                                            }
                                                        </>
                                                    )
                                                }
                                            </Form.Select>
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

export default StudentCourse