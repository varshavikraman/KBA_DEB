import React from 'react'
import Navbars from './components/Navbars.jsx'
import Hero from './components/Hero.jsx'
import TopCourses from './components/TopCourses.jsx'
import CourseGrid from './components/CourseGrid.jsx'
import courseData from '../src/assets/data/courses.json'
import AllCoursesButton from './components/AllCoursesButton.jsx'

const App = () => {
  return (
            <div>
             <Navbars/>
             <Hero/>
             <TopCourses/>
             <CourseGrid courses={courseData} />
             <AllCoursesButton/>
            </div>
  )
}

export default App