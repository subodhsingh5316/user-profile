import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap'
import Header from '../../../component/Header/Header'
import TableComponent from '../../../component/Table/TableComponent'
import axios from 'axios'
import StudentCourse from './StudentCourse'
import { fetchDataList } from '../../../redux/slice/dataListSlice'
import { useDispatch, useSelector } from 'react-redux';
import AssignTeacher from './AssignTeacher'

const AdminDasboard = () => {
  const column = ["SI", "course Name", "Author", "price", "Action"]
  const [search, setSearch] = useState('')
  const [flag, setFlag] = useState(false)

  const [data, setData] = useState([])
  const [trineeData, setTraineeData] = useState([])
  const dispatch = useDispatch();
  // const getData = async () => {
  //   const result = await axios.get('http://localhost:3001/posts')
  //   setData(result.data)
  // }

  const CourseData = useSelector(state =>state.dataListReducer)
  const {loading,dataList} = CourseData
  useEffect(()=>{
    dispatch(fetchDataList())
},[])
  // useEffect(() => {
  //   getData()
  // }, [])
  useEffect(()=>{
    setData(dataList)
 },[dataList])
 useEffect(()=>{
  const searchData = dataList.filter((item)=>{
      if(search ===''){
          return item
      }else{
          return item.courseName.toLowerCase().includes(search)
      }
     })
     setData(searchData)
},[search])

  console.log(data, trineeData)

  const handleDelete = async (id) => {
    console.log("table data = > ", trineeData.courseName)
    if (trineeData[id].courseName === data[id].courseName) {
      setFlag(true)
    } else {
      await axios.delete(`http://localhost:3001/posts/${id}`)
      setFlag(false)
      dispatch(fetchDataList())
    }

  }

  const handleserchChange = (e) => {
    const { value } = e.target;
    setSearch(value)
  }

  if (!localStorage.getItem("isAdmin")) {
    window.location.replace("/");
    localStorage.clear();
  }
  return (

    <div>
      <Header HeaderData={"Create-course +"} search={search} handleserchChange={handleserchChange} />
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row style={{ width: '600px', margin:'2%' }}>
            <Col sm={6} style={{ width: '30%' }} >
              <Nav variant="pills outline-primary" className="flex-row">
                <Nav.Item>
                  <Nav.Link eventKey="first">Course</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={6} style={{ width: '30%' }}>
              <Nav variant="pills" className="flex-row">
                <Nav.Item variant='outline-primary'>
                  <Nav.Link eventKey="second">Student course</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={6} style={{ width: '30%' }}>
              <Nav variant="pills" className="flex-row">
                <Nav.Item variant='outline-primary'>
                  <Nav.Link eventKey="third">Assign Teacher</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Row>

            <Row lg={12} style={{margin:'2%'}}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                   <TableComponent data={data} handleDelete={handleDelete} flag={flag} column={column} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <StudentCourse data={data}/>
                  {/* <Sonnet /> */}
                  {/* <InterMyCourse data={data} /> */}
                </Tab.Pane>
                <Tab.Pane eventKey={"third"}>
                  <AssignTeacher data={data}/>
                </Tab.Pane>
              </Tab.Content>
            </Row>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  )
}

export default AdminDasboard