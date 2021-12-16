import _ from "lodash"
import { getRandomInteger } from "../util/random"
export default class Colledge{
    #coursesProvider
    #courseData
    constructor(coursesProvider, courseData){
        this.#coursesProvider = coursesProvider
        this.#courseData = courseData
    }

    addCourse(course){
        course = this.#convertFields(course)
        if(!this.#validate(course)){
            return null
        }
        course.id = this.#getId()
        this.#coursesProvider.add(course)
    }

    removeCourse(course){
        this.#coursesProvider.remove(course.id)
    }

    getCourse(id){
        let res = this.#coursesProvider.get(id)
        return res 
    }

    #convertFields(course){
        course.hours = +course.hours
        course.cost = +course.cost
        course.openDate = new Date(course.openDate)
        return course
    }

    #validate(course){
        const {minCost, maxCost, minHours, maxHours, minYear, maxYear, courseNames, lecturers, types, timing} = this.#courseData
        const {cost, hours, openDate, courseName, lecturerName, dayEvening, type} = course
        
        const checkCost = cost>=minCost && cost <= maxCost
        const checkHours = hours>=minHours && hours <= maxHours
        const checkYear = openDate.getFullYear()>=minYear && openDate.getFullYear() <= maxYear
        
        const checkName = courseNames.includes(courseName)
        const checkLecturer = lecturers.includes(lecturerName)
        const checkType = types.includes(type)
        const checkTiming = (()=>{
            if(dayEvening.length === 0 || dayEvening.length>timing.length){
                return false
            }
            for(let dy of dayEvening){
                if(!timing.includes(dy)){
                    return false
                }
            }
            return true
        })()

        let strError = ""

            strError += !checkCost?`<strong>Incorrect cost - ${cost}</strong>, min-${minCost} max-${maxCost}; <br/>`:''
            strError += !checkHours?`<strong>Incorrect hours - ${hours}</strong>, min-${minHours} max-${maxHours}; <br/>`:''
            strError += !checkYear?`<strong>Incorrect date - ${openDate.toDateString()}</strong>, min year-${minYear} max year-${maxYear}; <br/>`:''
            strError += !checkName?`<strong>Incorrect course name - ${courseName}</strong>; <br/>`:''
            strError += !checkLecturer?`<strong>Incorrect lecturer - ${lecturerName}</strong>; <br/>`:''
            strError += !checkType?`<strong>Incorrect type of course - ${type}</strong>; <br/>`:''
            strError += !checkTiming?`<strong>You should choose timing;</strong> <br/>`:''
        
        if(strError){
            throw strError
        }
        return true
    }
    
    #getId(){
        
        let id 
        do {
            id = getRandomInteger(this.#courseData.minId, this.#courseData.maxId)
        } while (this.#coursesProvider.exists(id))

        return id
    }

    getAllCourses(){
        return this.#coursesProvider.getCourses()
    }

    sort(key){
        return _.sortBy(this.getAllCourses(), [key])
    }
}