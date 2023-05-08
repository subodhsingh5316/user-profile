import { Divider } from '@material-ui/core'
import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
export const Sidebar = (props) => {
    const { buttonName,handleClick } = props

    return (
        <div style={{width:"100%",height:'100%'}}>
            <ListGroup style={{height:'63vh',border:'1px solid #c2d6d6'}}>
            {
                buttonName && buttonName.map((item,i)=>{
                    return(
                        <div style={{margn:'3%'}}>
                            {/* <ListGroup.Item> */}
                                <ListGroup.Item style={{margin:'3%'}} onClick={()=>handleClick(i)} > {item}</ListGroup.Item>
                                {/* <Divider/> */}
                            {/* </ListGroup.Item> */}
                        </div>
                    )
                })
                }
            </ListGroup>
        </div>
    )
}
