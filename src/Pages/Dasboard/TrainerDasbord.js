import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Container, Row, Col, Spinner, Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import Header from '../../component/Header/Header';
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';
import CourseList from './Traniner/CourseList';
import { Sidebar } from '../../component/Sidebar';
import StudentCourse from './Traniner/StudentCourse';
import { useSelector, useDispatch } from 'react-redux'
import { fetchDataList } from '../../redux/slice/dataListSlice'
import { fetchQuarryData } from '../../redux/slice/quarrySlice'

const TrainerDasbord = () => {
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [search, setSearch] = useState('');
    const [openCourse, setOpenCourse] = useState(true)
    const [openStudentCourse, setOpenStudentCourse] = useState(false)
    const [openAssignCourse, setOpenAssignCourse] = useState(false)
    const [index, setIndex] = useState()
    const [show, setShow] = useState(false);
    let userId = useParams();
    const nevigate = useNavigate()
    const dispatch = useDispatch();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const quardata = useSelector((state) => state.QuarryReducer)
    const { quarry } = quardata;
    // const getData = async () => {
    //     const res = await axios.get(`http://localhost:3001/posts`)
    //     setData(res.data)
    // }
    console.log("q", quarry)

    const CourseData = useSelector(state => state.dataListReducer)
    const { loading, dataList } = CourseData

    const [qarryData, setDataQuarry] = useState({
        AnsQyary: ""
    })

    useEffect(() => {
        dispatch(fetchDataList())
    }, [])

    useEffect(() => {
        dispatch(fetchQuarryData())
    }, [])
    console.log("quarry", quarry)
    useEffect(() => {
        setData(dataList)
    }, [dataList])
    const handleserchChange = (e) => {
        const { value } = e.target;
        setSearch(value)
    }
    useEffect(() => {
        const searchData = dataList.filter((item) => {
            if (search === '') {
                return item
            } else {
                return item.courseName.toLowerCase().includes(search)
            }
        })
        setData(searchData)
    }, [search])
    const buttonName = ['Course', 'Student-course']
    const handleStatusChange = (id, lessonId) => {
        const tempData = data?.map((lesson) => {
            // console.log("Lesson Id: ", lesson?.id, id);
            if (lesson?.id === id) {
                const tempCourse = lesson?.lesson?.map((course) => {
                    // console.log("Course Id: ", course?.lesson_id, lessonId);
                    if (course?.lesson_id === lessonId) {
                        // console.log("Course: ", course);
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
        localStorage.setItem('userData', JSON.stringify(tempData))
        axios.put(`http://localhost:3001/posts/${id}`, data)
    }
    console.log("lesson-->>", data1)
    if (!localStorage.getItem("isTrainee")) {
        window.location.replace("/");
        localStorage.clear();
    }
    const handleClick = (i) => {
        console.log(i)
        if (i === 0) {
            setOpenCourse(true)
            setOpenStudentCourse(false)
        }
        if (i === 1) {
            setOpenCourse(false)
            setOpenStudentCourse(true)
        }
    }


    const handleOnchange = (e, id) => {
        const { name, value } = e.target;
        setDataQuarry({ ...qarryData, [name]: value })
        setIndex(id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log("subodh", id, e)
        // console.log("AnsQyary", qarryData.AnsQyary, id)
        axios.post(`http://localhost:3001/Ansquarry`, qarryData)
        setDataQuarry({
            AnsQyary: ""
        })

        // getData()
        // negigate('/')
    }
    console.log("quarry", qarryData)
    return (
        <div>
            <Header data={"quarry"} openMessage={handleShow} QuarryModal={handleShow} studentList='studentList' search={search} handleserchChange={handleserchChange} />
            <div style={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
                <div style={{ width: '20%', height: '100%' }}>
                    <Sidebar handleClick={handleClick} setOpen={setOpenCourse} setOpenStudentCourse={setOpenStudentCourse} buttonName={buttonName} />
                </div>
                <div style={{ width: '75%', marginLeft: '0.5%' }}>
                    {
                        openCourse && (<CourseList loading={loading} data={data} />)
                    }
                    {
                        openStudentCourse && (<StudentCourse data={data} handleStatusChange={handleStatusChange} />)
                    }
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Quarry</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Write quarry ans </Form.Label>
                                <Form.Control placeholder="Enter quarry...." as="textarea" rows={3} name='AnsQyary' value={qarryData?.AnsQyary} onChange={(e) => handleOnchange(e)} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type='Submit' onClick={handleClose}>
                                Submit
                            </Button>
                        </Modal.Footer>

                    </Form>
                </Modal>
            </div>
        </div>
    )
}

export default TrainerDasbord