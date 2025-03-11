import React from 'react'
import CourseGrid from "../components/CourseGrid";
import Hero from "../components/Hero";
import TopCourses from "../components/TopCourses"
import AllCoursesButton from "../components/AllCoursesButton";

const Home = () => {
  return (
    <>
      <Hero />
      <TopCourses />
      <CourseGrid isHome={true} />
      <AllCoursesButton />
    </>
  )
}

export default Home