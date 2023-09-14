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

class Citas {
    constructor() {
        this.citas= [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id);
    }
}

class UI {
    imprimirAlerta ( mensaje, tipo) {
        //Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        
        //Agregar clase a la Alerta
        if(tipo ==='error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error
        divMensaje.textContent= mensaje;
        //Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
        //Quitar la alerta
        setTimeout(() => {
            divMensaje.remove();
        },5000);
    }

    imprimirCitas({citas}) {

        this.limpiarHTML();
       
        citas.forEach( cita =>{
            const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id= id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent= mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML=`
            <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML=`
            <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML=`
            <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML=`
            <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML=`
            <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;
            //Boton de eliminar citas
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML= 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x-filled" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" stroke-width="0" fill="currentColor" /></svg>'
            
            btnEliminar.onclick= () => eliminarCita(id);
            //Agrega los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);

            //Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);

            
        })
    }

    limpiarHTML() {
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild( contenedorCitas.firstChild);
        }
    }
}

const ui = new UI();
const administrarCitas = new Citas();

// Registrar los eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
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
    
}

//Valida y agrega una nueva cita a la class de citas
function nuevaCita(e){
    e.preventDefault();
    //Extraer la informacion del objeto de citas
    const { mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;
    //Validar los campos
    if( mascota ==='' || propietario ==='' || telefono ==='' || fecha ==='' || hora ==='' || sintomas ==='') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    //Generar un id para el objeto Citaobj
    citaObj.id = Date.now();
    
    //Creando una nueva cita
    administrarCitas.agregarCita({...citaObj});
    //Reiniciar objeto para la validacion
    reiniciarObj();
    //Reiniciar el formulario
    formulario.reset();
    //Mostrar el HTML
    ui.imprimirCitas(administrarCitas);
}

function reiniciarObj() {
    citaObj.mascota= '',
    citaObj.propietario= '',
    citaObj.telefono= '',
    citaObj.fecha= '',
    citaObj.hora= '',
    citaObj.sintomas= ''
}

function eliminarCita(id){
    //Eliminar la cita
    administrarCitas.eliminarCita(id);
    //Muestra un mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');
    //Actualiza las citas
    ui.imprimirCitas(administrarCitas);

}