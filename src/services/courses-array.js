export default class CoursesArray{
    #courses
    constructor(){
        this.#courses = []
    }

    add(course){
        this.#courses.push(course)
    }
    remove(id){
        this.#courses.splice(this.#courses.findIndex(e => e.id == id), 1)
    }
    update(id, newCourse){
        this.#courses[this.#courses.findIndex(e => e.id == id)] = newCourse
    }
    get(id){
        return id!=undefined?this.#courses.find(c=>c.id==id):[...this.course]
    }
    exists(id){
        return this.get(id)?true: false
    }
    getCourses(){
        return this.#courses
    }

}