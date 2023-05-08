import React, { useState, useEffect } from 'react'
import { Container, Button, Card, Accordion, Modal, Form, Col, Row, CloseButton, Nav, Tab } from 'react-bootstrap';
import Header from '../../../component/Header/Header'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import InternCourse from './InternCourse';
import InterMyCourse from './InterMyCourse';
import AssignTeacherCourse from './AssignTeacherCourse';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchDataList } from '../../../redux/slice/dataListSlice';
import {fetchAnsQuarryData} from '../../../redux/slice/ansQuarrySlice'



const Intern = () => {
    const column = ["SI", "course Name", "Author", "price", "Action"]
    const [qarryData, setDataQuarry] = useState({
        internQuarry: ""
    })
    const [getQuarryData, setGetDataQuarry] = useState([])
    const [data, setData] = useState([])
    const [cart, setCart] = useState([])
    const [show, setShow] = useState(false);
    const [qty, setQty] = useState(1)
    const [search, setSearch] = useState('')
    const [items, setItems] = useState()
    const negigate = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [openMessage, setOpenMessage] = useState(true)
    const dispatch = useDispatch();
    const dataGet = useSelector(state => state.dataListReducer);
    const QuarryAnsGet = useSelector(state => state.AnsQyarryReducer);
    const { dataList } = dataGet
    const {ansData} = QuarryAnsGet
    useEffect(() => {
        dispatch(fetchDataList())
    }, [])
    const getData = async () => {
        // const result = await axios.get('http://localhost:3001/posts')
        // console.log("res", result)
        // // setData(result.data)
        const resultQuarry = await axios.get(`http://localhost:3001/quarry`)
        setGetDataQuarry(resultQuarry.data)
    }
    console.log("data", data)
    useEffect(() => {
        getData()
    }, [])
    useEffect(()=>{
        dispatch(fetchAnsQuarryData())
    },[])
    const Addhandle = (id) => {
        data.filter((item, i) => item === i)
    }

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setDataQuarry({ ...qarryData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // if (qarryData?.length > 0) {
            axios.post('http://localhost:3001/quarry', qarryData)
            setDataQuarry({
                internQuarry: ""
            })
        // }
        // negigate('/')
        getData()
    }

    // dispatch(fetchDataList())
    const handleDelete = async (id) => {
        console.log(id)
        await axios.delete(`http://localhost:3001/quarry/${id}`)
        getData()
    }
    useEffect(()=>{
        setData(dataList)
     },[dataList])
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
    const handleserchChange = (e) => {
        const { value } = e.target;

        console.log(e.value)
        setSearch(value)
    }
    if (!localStorage.getItem("isIntern")) {
        window.location.replace("/");
        localStorage.clear();
    }
    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('userData'));
        console.log("----name", item)
        if (item) {
            setItems(item);
        }
    }, []);
    return (
        <div>
            <Header data={"Quarry +"} openMessage={handleShow} QuarryModal={handleShow} search={search} handleserchChange={handleserchChange} />
            <div className='inter-Dasborard'>
                <div className='aside-container' style={{ width: '20%' }}>
                    <div>
                        {
                            getQuarryData && getQuarryData.map((item, i) => {
                                return (
                                    <Accordion key={i}>
                                        <Accordion.Item eventKey={i}>
                                            <Accordion.Header>Quarry Item {i + 1}</Accordion.Header>
                                            <Accordion.Body>
                                                <p><strong>{item.internQuarry}{" "}</strong></p>
                                                <p>{item.AnsQyary}{" "}</p>
                                                <span style={{ marginLeft: '10%', color: 'red' }} onClick={(e) => { handleDelete(item.id) }}><CloseButton /></span>

                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                )
                            })
                        }
                    </div>
                    <div>
                        {
                            ansData && ansData.map((item,i)=>{
                                return (
                                    <Accordion key={i}>
                                        <Accordion.Item eventKey={i}>
                                            <Accordion.Header>Quarry Ans Item {i + 1}</Accordion.Header>
                                            <Accordion.Body>
                                                <p><strong>{item.internQuarry}{" "}</strong></p>
                                                <p>{item.AnsQyary}{" "}</p>

                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                )
                            })
                        }
                    </div>

                </div>
                <div style={{ width: '78%',margin:'2%' }}>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row  style={{width:'600px'}}>
                            <Col sm={6} style={{width:'30%'}} >
                                <Nav variant="pills outline-primary" className="flex-row">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Course</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={6} style={{width:'30%'}}>
                                <Nav variant="pills" className="flex-row">
                                    <Nav.Item variant='outline-primary'>
                                        <Nav.Link eventKey="second">My course</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={6} style={{width:'30%'}}>
                                <Nav variant="pills" className="flex-row">
                                    <Nav.Item variant='outline-primary'>
                                        <Nav.Link eventKey="third">Assign Teacher</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Row>
                        <Row>

                            <Row lg={12}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                         <InternCourse  data ={data}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        {/* <Sonnet /> */}
                                        <InterMyCourse data={data}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                        {/* <Sonnet /> */}
                                        <AssignTeacherCourse data={data}/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Row>
                        </Row>
                    </Tab.Container>

                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Quarry</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Write quarry</Form.Label>
                            <Form.Control placeholder="Enter quarry ans ...." as="textarea" rows={3} name='internQuarry' value={qarryData?.internQuarry} onChange={handleOnchange} />
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
    )
}

export default Intern;