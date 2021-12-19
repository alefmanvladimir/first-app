import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"

import { getRandomInteger, getRandomElement } from "./util/random"

import courseData from './config/courseData.json'
import Colledge from "./services/colledge"
import { courseProvider } from "./config/servicesConfig"
import createCourse from "./modules/Course"
import FormHandler from "./ui/form-handler"
import TableHandler from "./ui/table.handler"

const N_RANDOM_COURSE = 25
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

createRandomCourses(colledge, N_RANDOM_COURSE)


// форма создания курса
const formCourse = new FormHandler('course-form', 'alert')
FormHandler.fillOptions("course-name", courseData.courseNames)
FormHandler.fillOptions("lecturer-name", courseData.lecturers)
formCourse.addHandler(course => {
    colledge.addCourse(course)
    tableCourse.addRow(course, course.id)
})

const coursesSort = function (key){
    tableCourse.clear()
    return colledge.sort(key).forEach(c=>tableCourse.addRow(c, c.id))
}

const coursesRemove = function(id){
    if(confirm('Are you sure?')){
        colledge.removeCourseById(id)
        tableCourse.removeRow(id)   
    }
}


// таблица курсов
const tableCourse = new TableHandler('courses-header', 'courses-body', 
['id', 'courseName', 'lecturerName', 'hours', 'cost', 'openDate'], coursesSort, coursesRemove)
colledge.getAllCourses().forEach(c=>tableCourse.addRow(c, c.id))


// статистика по времени
const formHours = new FormHandler("hours-form")
const hoursInterval = [10, 20, 30, 50, 100]
FormHandler.fillOptions("hours-name", hoursInterval)
const tableHours = new TableHandler("hours-header", "hours-body", ["minInterval", "maxInterval", "amount"])

formHours.addHandler(interval => {
    tableHours.clear()
    interval = parseInt(interval.hoursName)
    let rows = colledge.getStatHours(interval)
    
    Object.entries(rows).forEach(r=>{
        try{
            tableHours.addRow({minInterval: (r[0]*interval), maxInterval: (r[0]*interval)+interval, amount: r[1]})
        } catch(e){
            console.log(e)
        }  
    })
})

// статистика по стоимости
const formCost = new FormHandler("cost-form")
const costInterval = [1000, 2000, 3000, 5000, 10000]
FormHandler.fillOptions("cost-name", costInterval)
const tableCost = new TableHandler("cost-header", "cost-body", ["minInterval", "maxInterval", "amount"])

formCost.addHandler(interval => {
    tableCost.clear()
    interval = parseInt(interval.costName)
    let rows = colledge.getStatCost(interval)
    Object.entries(rows).forEach(r=>{
        try{
            tableCost.addRow({minInterval: (r[0]*interval), maxInterval: (r[0]*interval)+interval, amount: r[1]})
        } catch(e){
            console.log(e)
        }  
    })
})

// lodash countBy