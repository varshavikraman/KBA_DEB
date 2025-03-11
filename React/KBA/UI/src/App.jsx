import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// Layouts
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AddCourse from './pages/AddCourse'
import CoursesPage from './pages/CoursesPage'
import Contacts from './pages/Contacts'
import Course, { courseLoader } from "./pages/Course";
import EditCourse from './pages/EditCourse';
import Home from './pages/Home';
import NotFound from './pages/NotFound';


// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

/*const App = () => {
  return (
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Navigate to  = '/signup'/>} />
                <Route path='/login' element = {<Login/>} />
                <Route path='/signup' element = {<Signup/>} />
                <Route path='/dashboard' element = {<Dashboard/>} />
                <Route path='/addCourse' element = {<AddCourse/>} />
                <Route path='/Courses' element = {<CoursesPage/>} />
              </Routes>
            </BrowserRouter>

  )
}*/

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* AUTH LAYOUT */}
        <Route path="/" element={<AuthLayout />}>
          {/* The index route -> "/" shows LoginPage */}
          <Route index element={<Login />} />
          {/* Sign-up route -> "/sign-up" */}
          <Route path="sign-up" element={<Signup />} />
        </Route>

        {/* MAIN LAYOUT */}
        <Route path="/" element={<MainLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="contact" element={<Contacts />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Single course route by courseName param. */}
          <Route
            path="courses/:courseName"
            element={<Course />}
            loader={courseLoader}
          />

          {/* Edit course route by courseName param. */}
          <Route path="edit-course/:courseName" element={<EditCourse />} />

          {/* Fallback for 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App