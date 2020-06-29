
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json() } )
    .then( states => {

        for(state of states) {
            ufSelect.innerHTML = ufSelect.innerHTML +  `<option value="${state.id}">${state.nome}</option>`
        }

    })
}


populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res) => {return res.json() } )
    .then( cities => {
        for(city of cities) {
            citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })


}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta
// pegar todos LI
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []


function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe 
    itemLi.classList.toggle("selected")
    
    const itemId = event.target.dataset.id

    // console.log('ITEM ID: ', itemId)

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( function(item) {
        const itemFound = item == itemId
        return itemFound 
    } )

    // se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDiferent = item != itemId
            return itemIsDiferent
        })

        selectedItems = filteredItems
    } else {
         // se não estiver selecionado,
         // adicionar a seleção
        selectedItems.push(itemId)
    }

    // console.log('selectedItems: ', selectedItems)

    // atualizar o campo escondido com os dados itens selecionados
    collectedItems.value = selectedItems
 
}