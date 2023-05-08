import React from 'react';
import {
    Col,
    Container,
    Row,
    Card,
    Button
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const InternCourse = (props) => {
    const {data} = props
    return (
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
                                                <Card.Text> Price:- {item.price}&#8377;</Card.Text>
                                            </Col>
                                            <Col>
                                                {/* <Card.Text> Qty:- {item.quantity}</Card.Text> */}
                                            </Col>
                                        </Row>
                                        <Row style={{ margin: '2%' }}>
                                            <LinkContainer to={`/view-course/${item.id}`}>
                                                <Button variant="primary">view course</Button>
                                            </LinkContainer>
                                        </Row>
                                        <Row style={{ margin: '2%' }}>
                                            <LinkContainer to={`/cart-course/${item.id}`}>
                                                <Button variant="warning">Buy</Button>
                                            </LinkContainer>
                                        </Row>
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

export default InternCourse