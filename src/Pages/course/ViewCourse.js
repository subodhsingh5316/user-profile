import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Card, Button, Col, Row, ListGroup, Form } from 'react-bootstrap'
import Header from '../../component/Header/Header';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const ViewCourse = () => {
    const [courseData, setCourseData] = useState([])
    const [qty, setQty] = useState(1)
    const [todalPrice, setTotalPrice] = useState()
    const [items, setItems] = useState()
    const[byNowButton,setByNowButton] = useState(true)
    const userId = useParams();
    const [buyNow, setBuyNow]=useState(false)
    const navigate = useNavigate()
    const getData = async () => {
        const res = await axios.get(`http://localhost:3001/posts/${userId.id}`)
        setCourseData(res.data)
    }
    useEffect(() => {
        getData()
    }, [])
    // const initialOptions = {
    //     "client-id": "test",
    //     currency: "INR",
    //     intent: "capture",
    //     "data-client-token": "abc123xyz==",
    // };
    useEffect(()=>{
        const total = courseData.price *qty
        setTotalPrice(total)
    },[qty])
    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('userData'));
        console.log("----name", item)
        if (item) {
          setItems(...item);
        }
      }, []);
      console.log("items",items)
    const BuySubmit=()=>{
            if(items){
                axios.put(`http://localhost:3001/posts/${userId.id}`,{status:true,name:items?.name})
            //axios.put(jasdkjfksadjfasdkjfksad/courses/couseId, {status: true. name: "Rohit"})
            // navigate('/intern-dashboard')
            setByNowButton(!byNowButton)
            }
        // }
     }
     

    return (
        <div>
            <Header />
            <Container>
                <Col>
                    <Button onClick={() => navigate('/')}>Back</Button>
                </Col>
                <Row>
                    <Col>
                        <Card style={{ width: '25rem', margin: '5%', backgroundColor: 'pink' }}>
                            <Card.Body>
                                <Card.Title> {courseData.courseName} </Card.Title>
                                <Card.Text>
                                    {courseData.author}<br />
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Row>
                                    <Col> Price:- {courseData.price} {`रु`}</Col>
                                    <Col style={{ marginLeft: '40%' }}>
                                        {courseData.quantity > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control as='select' value={qty} onChange={(e) =>
                                                            setQty(e.target.value)} >
                                                            {
                                                                [...Array(courseData.quantity).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={{ marginLeft: '20%' }}>
                        <Card style={{ width: '25rem', margin: '5%' }}>
                            <Card.Body>
                                <Card.Title> Price</Card.Title>
                                <Card.Text>

                                </Card.Text>
                                <Row>
                                    <Col> Price:- {courseData.price} {`रु`}</Col>
                                    <Col style={{ marginLeft: '40%' }}>
                                        {courseData.quantity > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control as='select' value={qty} onChange={(e) =>
                                                            setQty(e.target.value)} >
                                                            {
                                                                [...Array(courseData.quantity).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Row>
                                <Col style={{ marginLeft: '10%' }}>
                                    <h4>Total </h4>
                                </Col>
                                <Col style={{ marginLeft: '40%' }}>
                                    {
                                        <h4>{courseData.price * qty}</h4>
                                    }
                                </Col>
                            </Row>
                            {/* <Row style={{ margin: '10%' }}> */}
                                
                            {/* </Row> */}
                            <Row style={{ margin:'10%' }}>
                                {
                                    byNowButton ?(
                                        <Button 
                                        onClick={()=>BuySubmit()}>Buy Now</Button>
                                    ):(
                                        <PayPalScriptProvider options={{ "client-id": "AXIbLclwmyMzuLwJJ4Z1PnuaC6BeJb8fG8Kp2y87sWplhbSWRZZn6TR3-gH6f604zsUpII9t7H_MWY59" }}>
                                        <PayPalButtons style={{ layout: "horizontal" }}
                                            currency="USD"
                                            createOrder={(data, actions) => {
                                             return actions.order
                                                 .create({
                                                     purchase_units: [
                                                         {
                                                             amount: {
                                                                 currency_code: "USD",
                                                                 value: "100",
                                                             },
                                                         },
                                                     ],
                                                 })
                                                 .then((orderId) => {
                                                     console.log(orderId)
                                                     alert('paymenty done')
                                                     navigate('/intern-dashboard')
                                                     // Your code here after create the order
                                                     return orderId;
                                                 });
                                         }}
                                        />
                                     </PayPalScriptProvider>
                                    )
                                }
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ViewCourse