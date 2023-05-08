import './App.css';
import React,{Suspense, lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCourse from './Pages/course/AddCourse';
import Dashboard from './Pages/Dasboard/Dashboard';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import { Routes, Route } from 'react-router-dom';
import DefaultPage from './Pages/defaultPage';
import EditCourse from './Pages/course/EditCourse';
import AdminDasboard from './Pages/Dasboard/Admin/AdminDasboard';
import ViewCourse from './Pages/course/ViewCourse';
import Intern from './Pages/Dasboard/Intern/Intern';
import TrainerDasbord from './Pages/Dasboard/TrainerDasbord';
import EditProfile from './component/Register/EditProfile';
import CartCourse from './Pages/course/CartCourse';
// import * as Sentry from "@sentry/react";

function App() {
// const AddCourse = lazy(() => import('../Pages/course/AddCourse'));
  // Sentry.init({
  //   dsn: "https://<key>@sentry.io/<project>"
  // });
  return (
    <div >
      {/* <EditCourse/> */}
       {/* <Header/>  */}
      <Routes>
        <Route exact path='/trainer-dashboard' element={<TrainerDasbord/>}/>
        <Route exact path='/' element={<DefaultPage/>}/>
        <Route exact path='/admin-dashboard' element={<AdminDasboard/>}/>
        <Route exact path='/intern-dashboard' element={<Intern/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/editcourse/:id' element= {<EditCourse/>}/>
        <Route exact path='/editprofile' element= {<EditProfile/>}/>
        <Route exact path='/sign-up' element={<Register/>}/>
        <Route exact path='/add-course' element={<AddCourse/>}/>
        <Route exact path='/dashboard' element={<Dashboard />}/>
        <Route exact path='/view-course/:id' element={<ViewCourse/>}/>
        <Route exact path='/cart-course/:id' element={<CartCourse/>}/>
        {/* <Route exact path='/dashboard' element={<TableComponent/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
