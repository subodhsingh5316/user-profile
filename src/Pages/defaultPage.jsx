import React from 'react';
import Header from '../component/Header/Header'
import { LinkContainer } from 'react-router-bootstrap'

export default function DefaultPage(){
    return( 
        <div>
            <Header/>
            <h1 className='d-flex justify-content-center' style={{ alignItems:'center'}}>
                Welcome in Neo<span style={{color:'red'}}>Soft</span><sup>&#174;</sup>
            </h1> 
            <div className='dashBoard'>
                <LinkContainer to='/login'>
                <div><h4>Admin</h4></div>
                </LinkContainer>
                <LinkContainer to={`/login`}>
                <div><h4>Trainer</h4></div>
                </LinkContainer>
                <LinkContainer to='/login'>
                <div><h4>Intern</h4></div>
                </LinkContainer>
            </div>
        </div>
     )
}