export default class FormHandler {
    #formElement
    #alertElement
    #inputElements
    
    constructor(idForm, idAlert) {
        this.#formElement = document.getElementById(idForm)
        if (!this.#formElement) {
            throw "Wrong form id"
        }
        if (idAlert) {
            this.#alertElement = document.getElementById(idAlert)
        }
        this.#inputElements = document.querySelectorAll(`#${idForm} [name]`)
        if (!this.#inputElements || this.#inputElements.length == 0) {
            throw "Wrong form content"
        }
        this.#inputElements = Array.from(this.#inputElements) // conversion to Array from NodeList

    }

    addHandler(hundlerFunc){
        this.#formElement.addEventListener('submit', this.#onSubmit.bind(this, hundlerFunc))
    }

    static fillOptions(idSelect, options){
        const selectElement = document.getElementById(idSelect)
        if(!selectElement){
            throw "Wrong select id"
        }
        selectElement.innerHTML += getOptions(options)
    }

    #onSubmit(handlerFunc, event){
        event.preventDefault()
        this.#alertElement.innerHTML=''
        try{
            const obj = this.#inputElements.reduce(createObject, {})
            handlerFunc(obj)
        } catch(e){
            this.#showAlert(e)
        }
        
    }

    #showAlert(error){
        this.#alertElement.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            ${error}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
    }
}

function createObject(obj, elem) {
    switch (elem.type) {
        case "radio": if(elem.checked){
            obj[elem.name] = elem.value
        }; break;
        case "checkbox": if(!obj[elem.name]){
            obj[elem.name] = []
        }; if(elem.checked){
            obj[elem.name].push(elem.value)
        }; break;

        default: obj[elem.name] = elem.value
    }

    return obj
}


function getOptions(options){
    return options.map(o=> `<option value="${o}">${o}</option>`).join('')
}