import React,{useEffect, useState} from 'react'
import Header from '../../../component/Header/Header'
import TableComponent from '../../../component/Table/TableComponent'
import { useSelector,useDispatch } from 'react-redux';
import {fetchDataList} from '../../../redux/slice/dataListSlice'
import Spinner from 'react-bootstrap/Spinner';
const CourseList = (props) => {
    const column=["SI","course Name","Author"]
    const {data, loading} = props
    const [coureState, setCourseState] = useState(true)
    const dispatch = useDispatch();
    // const CourseData = useSelector(state =>state.dataListReducer)
    // const {loading,dataList} = CourseData

    // console.log("------->",dataList)
    // useEffect(()=>{
    //     dispatch(fetchDataList())
    // },[dispatch])
  return (
    <div>
        {
            loading?(
                <div style={{width:'300px',height:'300px',marginTop:'40vh',marginLeft:'45%'}}><Spinner animation="border" /></div>
            ):(
                <TableComponent  column={column} data= {data} Courseflag={coureState} />
            )
        }
    </div>
  )
}

export default CourseList