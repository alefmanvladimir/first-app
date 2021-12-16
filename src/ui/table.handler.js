export default class TableHandler{
    #keys
    #bodyElement
    #removeFunc
    constructor(idHeader, idBody, keys, sortFunc, removeFunc){
        this.#keys = keys
        this.#removeFunc = removeFunc
        const headerElement = document.getElementById(idHeader)
        if(!headerElement){
            throw "Wrong header"
        }

        this.#bodyElement = document.getElementById(idBody)
        if(!this.#bodyElement){
            throw "Wrong body id"
        }
        fillTableHeaders(headerElement, keys, this.#removeFunc)
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
                ${this.#getRecordDate(obj, id)}
            </tr>
        `
        if(this.#removeFunc){
            
            const elements = document.querySelectorAll(`.removeElem`)
            elements.forEach(elem=>{
                elem.addEventListener('click', this.#removeFunc.bind(this, elem.getAttribute("name")))
            })
        }
    }

    removeRow(id){
        document.getElementById(id).remove()
    }

    clear(){
        this.#bodyElement.innerHTML = ''
    }

    #getRecordDate(obj, id){
        let res = this.#keys.map(k=>`<td>${obj[k].constructor.name==="Date"?obj[k].toISOString().substr(0, 10): obj[k]}</td>`).join('')
        if(this.#removeFunc){
            res += `
            <td class="removeElem" name="${id}">
                <img src="https://icons-for-free.com/iconfiles/png/512/remove+icon-1320166863280113920.png">
            </td>
            `
        }
        
        return res
    }
}



function fillTableHeaders(headerElement, keys, removeFunc){
    headerElement.innerHTML = getColumns(keys, removeFunc)
}

function getColumns(keys, removeFunc){
    let res = keys.map(k=>`<th style="cursor: pointer">${k}</th>`).join('')
    res += removeFunc?`<th></th>`:''
    return res
}