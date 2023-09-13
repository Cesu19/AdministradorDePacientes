// Iniciando el proyecto para subirlo a Git Hub


//Campos del formulario

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// UX (Interfaz del usuario)
const formulario = document.querySelector('#nueva-cita');

const contenedorCitas= document.querySelector('#citas');

// Registrar los eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);
}
// Objeto principal 
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
} 
// Agrega los datos al objetio de citas
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);
}