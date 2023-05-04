import React from 'react';
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios'
const TableComponent = (props) => {
  const { data, column, handleDelete, flag  } = props 
  console.log(flag)
  return (
    <div>
         <Table striped bordered hover>
      <thead>
        <tr>
          {
            column && column.map((item,i)=>{
              return(
                <th key={i}>{item}</th>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
          {
            data && data.map((item,i)=>{console.log("table",data)
              return(
                  <tr>
                  <td>{i+1}</td>
                  <td>{item.courseName}</td>
                  <td>{item.author}</td>
                  <td>{item.price}</td>
                  <td>
                  <Link to = {`/view-course/${item.id}`}>
                    <Button variant="outline-info" >
                      <i className='fa fa-eye'></i>
                    </Button>
                    </Link>
                    <Link to ={`/editcourse/${item.id}`}>
                    <Button variant='outline-primary'style={{marginLeft:'20px'}}>
                      <i className='ml-3 fa fa-edit'></i>
                      </Button>
                    </Link>
                    <Button variant='outline-danger'style={{marginLeft:'20px'}} disabled={item.status} onClick={(e)=>{handleDelete(item.id)}} ><i className='fa fa-trash'></i></Button>
                  </td>
                  </tr>
              )
            })
          }
      </tbody>
    </Table>
    </div>
  )
}

export default TableComponent