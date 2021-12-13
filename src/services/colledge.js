import { getRandomInteger } from "../util/random"
export default class Colledge{
    #coursesProvider
    #courseData
    constructor(coursesProvider, courseData){
        this.#coursesProvider = coursesProvider
        this.#courseData = courseData
    }

    addCourse(course){
        course.id = this.#getId()
        if(!this.#validate(course)){
            return null
        }
        
        this.#coursesProvider.add(course)
    }

    #validate(course){
        const checkId = course.id>=this.#courseData.minId && course.id <= this.#courseData.maxId
        const checkCost = course.cost>=this.#courseData.minCost && course.cost <= this.#courseData.maxCost
        const checkHours = course.hours>=this.#courseData.minHours && course.hours <= this.#courseData.maxHours
        const checkYear = course.openDate.getFullYear()>=this.#courseData.minYear && course.openDate.getFullYear() <= this.#courseData.maxYear
        
        const checkName = this.#courseData.courseNames.findIndex(courseName => courseName === course.courseName)
        const checkLecturer = this.#courseData.lecturers.findIndex(lecturerName => lecturerName === course.lecturerName)
        const checkType = this.#courseData.types.findIndex(type => type === course.type)
        const checkTiming = this.#courseData.timing.findIndex(dayEvening => dayEvening === course.dayEvening)

        let strError = ""

            strError += !checkId?`incorrect id - ${course.id}\n`:''
            strError += !checkCost?`incorrect cost - ${course.cost}\n`:''
            strError += !checkHours?`incorrect hours - ${course.hours}\n`:''
            strError += !checkYear?`incorrect openDate - ${course.openDate}\n`:''
            strError += checkName===-1?`incorrect course name - ${course.courseName}\n`:''
            strError += checkLecturer===-1?`incorrect lecturer - ${course.lecturerName}\n`:''
            strError += checkType===-1?`incorrect type of course - ${course.type}\n`:''
            strError += checkTiming===-1?`incorrect timing - ${course.dayEvening}\n`:''
        
        if(strError){
            throw new Error(strError)
        }
        return true
    }
    
    #getId(){
        
        let id = getRandomInteger(this.#courseData.minId, this.#courseData.maxId)
        while(this.#coursesProvider.get(id)!==undefined){
            id = getRandomInteger(this.#courseData.minId, this.#courseData.maxId)
        }
        return id
    }

    getAllCourses(){
        return this.#coursesProvider.getCourses()
    }
}