import React,{ useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Header from '../../component/Header/Header'
import TableComponent from '../../component/Table/TableComponent'
import axios from 'axios'


const Dashboard = () => {
    const column=["SI","course Name","Author","price", "Action"]

    const [ data, setData ] = useState([])
    const getData = async()=>{
        const result =  await axios.get('http://localhost:3001/posts')
        console.log("res",result)
        setData(result.data)
    }
    console.log("data",data)
    useEffect(()=>{
        getData()
    },[])
    return (
        <div>
        <Header/>
        <Container>
            <TableComponent data={data} column={column}/>
        </Container>
    </div>
    )
}

export default Dashboard