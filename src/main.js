import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"

import { getRandomInteger, getRandomElement } from "./util/random"

import courseData from './config/courseData.json'
import Colledge from "./services/colledge"
import { courseProvider } from "./config/servicesConfig"
import createCourse from "./modules/Course"

const N_RANDOM_COURSE = 20
const colledge = new Colledge(courseProvider, courseData)

const createRandomCourses = function(colledge, nCourses){
    let openDate = new Date()
    for(let i=0; i<nCourses; i++){
        openDate.setFullYear(getRandomInteger(courseData.minYear, courseData.maxYear))
        const course = createCourse(
            getRandomElement(courseData.courseNames),
            getRandomElement(courseData.lecturers),
            getRandomInteger(courseData.minHours, courseData.maxHours),
            getRandomInteger(courseData.minCost, courseData.maxCost),
            getRandomElement(courseData.types),
            getRandomElement(courseData.timing),
            openDate
        )
        colledge.addCourse(course)
        openDate = new Date()
    }
}

const debugDisplayColledge = colledge=>{
    colledge.getAllCourses().forEach(course => {
        console.log(course)
    });
}

createRandomCourses(colledge, N_RANDOM_COURSE)
debugDisplayColledge(colledge)