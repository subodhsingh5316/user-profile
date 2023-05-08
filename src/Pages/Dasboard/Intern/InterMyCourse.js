import React,{useState, useEffect } from 'react'
import { Container, Card, Col, Row, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

const InterMyCourse = (props) => {
    const {data  } = props
    console.log("student", data)
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
                            data && data.filter((itemF, i) => itemF.name === items?.name) .map((item, i) =>
                                (
                                    <Card style={{ width: '18rem', margin: '1%' }}>
                                        <Card.Body>
                                            <Card.Title>{item.courseName}</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the
                                                bulk of the card's content.
                                            </Card.Text>
                                            <Row style={{ margin: '2%' }}>
                                             <Button variant="outline-warning" size='large'>{item.author}</Button>
                                            </Row>
                                            <Row style={{ margin: '2%' }}>
                                            <LinkContainer to={`/view-course/${item.id}`}>
                                                <Button variant="dark">view course</Button>
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

export default InterMyCourse