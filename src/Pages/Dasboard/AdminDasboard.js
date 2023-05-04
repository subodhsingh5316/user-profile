import React,{ useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Header from '../../component/Header/Header'
import TableComponent from '../../component/Table/TableComponent'
import axios from 'axios'

const AdminDasboard = () => {
    const column=["SI","course Name","Author","price", "Action"]
    const [search, setSearch ] = useState('')
    const [flag, setFlag ] = useState(false)

    const [ data, setData ] = useState([])
    const [trineeData, setTraineeData] = useState([])
    const getData = async()=>{
        const result =  await axios.get('http://localhost:3001/posts')
        setData(result.data)
        const resTrainee = await axios.get('http://localhost:3001/trainer')
        setTraineeData(resTrainee.data)
    }
    useEffect(()=>{
        getData()
    },[])
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
   
  console.log(data,trineeData)

  const handleDelete = async(id)=>{
    // console.log("data ====>", id,trineeData[id]?.courseName,data[id]?.courseName)
    console.log("data =>>>.", id)
    console.table(trineeData)
    console.table(data);
    console.log("table data = > ", trineeData.courseName)
    if(trineeData[id].courseName === data[id].courseName ){
    //   await axios.delete(`http://localhost:3001/posts/${id}`)
    //   getData()
      setFlag(true)
    }else{
        await axios.delete(`http://localhost:3001/posts/${id}`)
        setFlag(false)
    }

}

  const handleserchChange =(e)=>{
     const {value} = e.target;

    console.log(e.value)
     setSearch(value)
  }

  if (!localStorage.getItem("isAdmin")) {
    window.location.replace("/");
    localStorage.clear();
  }
  return (

    <div>
        <Header HeaderData = {"Create-course +"} search={search}  handleserchChange={handleserchChange} />
        <Container>
            <TableComponent data={data} handleDelete={handleDelete} flag={flag} column={column}/>
        </Container>
    </div>
  )
}

export default AdminDasboard