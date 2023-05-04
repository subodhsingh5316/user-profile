
import React, { useState, useEffect } from 'react'
import { Container, Button, Card, Accordion, Modal, Form,Col, Row,CloseButton } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Header from '../../component/Header/Header'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


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
    const [search, setSearch ] = useState('')
    const negigate = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getData = async () => {
        const result = await axios.get('http://localhost:3001/posts')
        console.log("res", result)
        setData(result.data)
        const resultQuarry = await axios.get(`http://localhost:3001/quarry`)
        setGetDataQuarry(resultQuarry.data)
    }
    console.log("data", data)
    useEffect(() => {
        getData()
    }, [])
    const Addhandle=(id)=>{
        data.filter((item,i)=> item ===i)
    }

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setDataQuarry({ ...qarryData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/quarry', qarryData)
        setDataQuarry({
            internQuarry: ""
        })
        getData()
        negigate('/')
    }
    const handleDelete = async (id) => {
        console.log(id)
        await axios.delete(`http://localhost:3001/quarry/${id}`)
        getData()


    }
    useEffect(()=>{
        const searchData = data.filter((item)=>{
            if(search ===''){
                return item
            }else{
                return item.courseName.toLowerCase().includes(search)
            }
           })
           setData(searchData)
    },[search])
    const handleserchChange =(e)=>{
        const {value} = e.target;
   
       console.log(e.value)
        setSearch(value)
     }
     if (!localStorage.getItem("isIntern")) {
        window.location.replace("/");
        localStorage.clear();
      }

    return (
        <div>
            <Header data={"Add quarry"} QuarryModal={handleShow} search={search} handleserchChange={handleserchChange}  />
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
                                                {item.internQuarry}{" "}
                                                <span style={{ marginLeft: '10%', color: 'red' }} onClick={(e) => { handleDelete(item.id) }}><CloseButton /></span>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
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
                                                <Row>
                                                  <Col>
                                                  <Card.Text> Price:- {item.price}</Card.Text>
                                                  </Col>
                                                  <Col>
                                                  <Card.Text> Qty:- {item.quantity}</Card.Text>
                                                  </Col>
                                                </Row>
                                                <Row>
                                                <Link to = {`/view-course/${item.id}`}>
                                                <Button variant="primary">View</Button>
                                                </Link>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    )
                                })
                            }
                        </div>
                    </Container>
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
                            <Form.Control placeholder="Enter quarry...." as="textarea" rows={3} name='internQuarry' value={qarryData?.internQuarry} onChange={handleOnchange} />
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

export default Intern