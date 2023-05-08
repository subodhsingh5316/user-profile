import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Card, Button, Col, Row, ListGroup, Form, Spinner } from 'react-bootstrap'
import Header from '../../component/Header/Header';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from 'sweetalert2'

const CartCourse = () => {
    const [courseData, setCourseData] = useState([])
    const [qty, setQty] = useState(1)
    const [todalPrice, setTotalPrice] = useState()
    const [items, setItems] = useState()
    const [byNowButton, setByNowButton] = useState(true)
    const[btnLoading,setBtnloading] = useState(true)
    const userId = useParams();
    const [buyNow, setBuyNow] = useState(false)
    const [loading,setLoading ]= useState(true)
    const navigate = useNavigate()
    const getData = async () => {
        const res = await axios.get(`http://localhost:3001/posts/${userId.id}`)
        setCourseData(res.data)
    }
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        const total = courseData.price * qty
        setTotalPrice(total)
    }, [qty])
    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('userData'));
        console.log("----name", item)
        if (item) {
            setItems(...item);
        }
    }, []);
    console.log("items", {...courseData})
    const BuySubmit = () => {
        if (items) {
            axios.put(`http://localhost:3001/posts/${userId.id}`, { ...courseData, status: true, name: items?.name })
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
                    <Button onClick={() => navigate(-1)}>Back</Button>
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
                                                        {/* <Form.Control as='select' value={qty} onChange={(e) =>
                                                            setQty(e.target.value)} >
                                                            {
                                                                [...Array(courseData.quantity).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control> */}
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
                                                    {/* <Col>Qty</Col> */}
                                                    <Col>
                                                        {/* <Form.Control as='select' value={qty} onChange={(e) =>
                                                            setQty(e.target.value)} >
                                                            {
                                                                [...Array(courseData.quantity).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control> */}
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
                                        <h4>{courseData.price}</h4>
                                    }
                                </Col>
                            </Row>
                            {/* <Row style={{ margin: '10%' }}> */}

                            {/* </Row> */}
                            <Row style={{ margin: '10%' }}>
                                {/* {
                                    btnLoading ?(
                                        <Spinner/>
                                    ):( */}
                                <PayPalScriptProvider options={{ "client-id": "AXIbLclwmyMzuLwJJ4Z1PnuaC6BeJb8fG8Kp2y87sWplhbSWRZZn6TR3-gH6f604zsUpII9t7H_MWY59" }}>
                                    <PayPalButtons style={{ layout: "horizontal" }}
                                        // onClick={()=>BuySubmit()}
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

                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then((details) => {
                                                // const name = details.payer.name.given_name;
                                                // alert(`Transaction completed by ${name}`);
                                                Swal.fire({
                                                    title: 'Paymnet Done',
                                                    text: "Thank you for payment",
                                                    icon: 'success',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Go to home page'
                                                  }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        BuySubmit()
                                                    navigate("/intern-dashboard");
                                                    }
                                                  })
                                            });
                                        }}
                                    />
                                </PayPalScriptProvider>
                                 {/* )
                                }  */}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CartCourse