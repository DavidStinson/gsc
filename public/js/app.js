const unitRadios = document.getElementById("radio-inputs")
const unitOne = document.getElementById("unit-one")
const form = document.getElementById("form")

if(unitRadios) {
  unitRadios.addEventListener('change', changeUnit)
}

if(unitOne) {
  unitOne.checked = true
}

function changeUnit(evt) {
  form.setAttribute("action", `/build/${evt.target.value}`)
}