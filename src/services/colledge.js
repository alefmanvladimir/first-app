import { getRandomInteger } from "../util/random"
export default class Colledge{
    #coursesProvider
    #courseData
    constructor(coursesProvider, courseData){
        this.#coursesProvider = coursesProvider
        this.#courseData = courseData
    }

    addCourse(course){
        
        if(!this.#validate(course)){
            return null
        }
        course.id = this.#getId()
        this.#coursesProvider.add(course)
    }

    #validate(course){
        const checkCost = course.cost>=this.#courseData.minCost && course.cost <= this.#courseData.maxCost
        const checkHours = course.hours>=this.#courseData.minHours && course.hours <= this.#courseData.maxHours
        const checkYear = course.openDate.getFullYear()>=this.#courseData.minYear && course.openDate.getFullYear() <= this.#courseData.maxYear
        
        const checkName = this.#courseData.courseNames.find(courseName => courseName === course.courseName)
        const checkLecturer = this.#courseData.lecturers.find(lecturerName => lecturerName === course.lecturerName)
        const checkType = this.#courseData.types.find(type => type === course.type)
        const checkTiming = this.#courseData.timing.find(dayEvening => dayEvening === course.dayEvening)

        let strError = ""

            strError += !checkCost?`incorrect cost - ${course.cost}\n`:''
            strError += !checkHours?`incorrect hours - ${course.hours}\n`:''
            strError += !checkYear?`incorrect openDate - ${course.openDate}\n`:''
            strError += !checkName?`incorrect course name - ${course.courseName}\n`:''
            strError += !checkLecturer?`incorrect lecturer - ${course.lecturerName}\n`:''
            strError += !checkType?`incorrect type of course - ${course.type}\n`:''
            strError += !checkTiming?`incorrect timing - ${course.dayEvening}\n`:''
        
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