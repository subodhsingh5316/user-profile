import React, { useState, useEffect } from 'react'
import { Container, Card, Col, Row, Button } from 'react-bootstrap'

const StudentCourse = (props) => {
    const { data, handleStatusChange, open } = props
    console.log("student", data)
    const [items, setItems] = useState();
    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('userData'));
        console.log("----name", item)
        if (item) {
            setItems(...item);
        }
    }, []);
    //   console.log("123",items[0]?.name)
    return (
        <div>
            <Container>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'Start' }}>
                    <>
                        {
                            data && data.filter((itemF, i) => itemF.name === items?.name && itemF.teacher==true)
                                .map((item, i) =>
                                (
                                    <Card key={i} style={{ width: '18rem', margin: '1%' }}>
                                        <Card.Body>
                                            <Card.Title>{item.courseName}</Card.Title>
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
                                                                    <Button size='large' variant={item1?.lessonStatus === true ? "success" : "info"} onClick={() => handleStatusChange(item.id, item1?.lesson_id)}>{item1.unit_no}</Button>
                                                                }
                                                            </Col>
                                                        )
                                                    })
                                                }
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