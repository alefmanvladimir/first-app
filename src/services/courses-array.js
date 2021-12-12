class CoursesArray{

    constructor(){
        this.courses = []
    }

    add(course){
        this.courses.push(course)
    }
    remove(id){
        this.courses.splice(this.courses.findIndex(id), 1)
    }
    update(id, newCourse){
        this.courses[this.courses.findIndex(id)] = newCourse
    }
    get(id){
        return this.courses.find(c=>c.id===id)
    }
    exists(id){
        return this.get(id)?true: false
    }
}