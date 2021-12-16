import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"

import { getRandomInteger, getRandomElement } from "./util/random"

import courseData from './config/courseData.json'
import Colledge from "./services/colledge"
import { courseProvider } from "./config/servicesConfig"
import createCourse from "./modules/Course"
import FormHandler from "./ui/form-handler"
import TableHandler from "./ui/table.handler"

const N_RANDOM_COURSE = 5
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
            courseData.timing,
            openDate
        )
        colledge.addCourse(course)
        openDate = new Date()
    }
    const course = createCourse(
        'Java Core',
        'Abraham',
        getRandomInteger(courseData.minHours, courseData.maxHours),
        getRandomInteger(courseData.minCost, courseData.maxCost),
        getRandomElement(courseData.types),
        getRandomElement(courseData.timing),
        openDate
    )
}

const debugDisplayColledge = colledge=>{
    colledge.getAllCourses().forEach(course => {
        console.log(JSON.stringify(course))
    });
}
createRandomCourses(colledge, N_RANDOM_COURSE)

const formCourse = new FormHandler('course-form', 'alert')
FormHandler.fillOptions("course-name", courseData.courseNames)
FormHandler.fillOptions("lecturer-name", courseData.lecturers)
formCourse.addHandler(course => {
    colledge.addCourse(course)
    tableCourse.addRow(course, course.id)
    // debugDisplayColledge(colledge)
})

const coursesSort = function (key){
    tableCourse.clear()
    return colledge.sort(key).forEach(c=>tableCourse.addRow(c, c.id))
}

const coursesRemove = function(id){
    let course = colledge.getCourse(id)
    colledge.removeCourse(course)
    tableCourse.removeRow(id)
    
}
const tableCourse = new TableHandler('courses-header', 'courses-body', 
['id', 'courseName', 'lecturerName', 'hours', 'cost', 'openDate'], coursesSort, coursesRemove)
colledge.getAllCourses().forEach(c=>tableCourse.addRow(c, c.id))

