export default class TableHandler{
    #keys
    #bodyElement
    constructor(idHeader, idBody, keys, sortFunc){
        this.#keys = keys
        const headerElement = document.getElementById(idHeader)
        if(!headerElement){
            throw "Wrong header"
        }

        this.#bodyElement = document.getElementById(idBody)
        if(!this.#bodyElement){
            throw "Wrong body id"
        }
        fillTableHeaders(headerElement, keys, sortFunc)
        const columnsEl = document.querySelectorAll(`#${idHeader} th`)
        if(sortFunc){
            columnsEl.forEach(column => {
                column.addEventListener('click', sortFunc.bind(this, column.textContent))
            })
        }
        
    }

    addRow(obj, id){
        this.#bodyElement.innerHTML += `
            <tr id=${id}>
                ${this.#getRecordDate(obj)}
            </tr>
        `
    }

    clear(){
        this.#bodyElement.innerHTML = ''
    }

    #getRecordDate(obj){
        return this.#keys.map(k=>`<td>${obj[k].constructor.name==="Date"?obj[k].toISOString().substr(0, 10): obj[k]}</td>`).join('')
    }
}



function fillTableHeaders(headerElement, keys, sortFunc){
    headerElement.innerHTML = getColumns(keys, sortFunc)
}

function getColumns(keys, sortFunc){
    return keys.map(k=>`<th style="cursor: pointer">${k}</th>`).join('')
}