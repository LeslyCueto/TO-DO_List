const formulario = document.querySelector('#formulario'); //form
const inputTarea = document.querySelector('#tarea'); //input
const mensajeError = document.querySelector('.alert-danger'); //alerta
const contenedorTareas = document.querySelector('#contenedorTareas'); //contenedor
const templateTarea = document.querySelector('#templateTarea');//template tarea

//array para guardar las tareas
let tareas = [];

//funcion agregar tarea
const agregarTarea = (tarea) => {
    //creamos un objeto para tareas
    const tareaObjeto = {
        tarea: tarea,
        id: Date.now(),
    }
    //pushear el objeto al array de 'tareas'
    tareas.push(tareaObjeto);
    //llamamos la funcion 'mostrarTareas'
    mostrarTareas();
}
//funcion para mostrar las tareas en lista
const mostrarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas));

    contenedorTareas.textContent= "";
    const fragment = document.createDocumentFragment();
    //iterar para mostrar cada dato
    tareas.forEach((item) => {
        const clone = templateTarea.content.cloneNode(true);
        clone.querySelector('.lead').textContent = item.tarea;
        clone.querySelector('.btn-danger').dataset.id = item.id;
        fragment.appendChild(clone);
    });

    contenedorTareas.appendChild(fragment);
}

formulario.addEventListener('submit', (e) => {
    mensajeError.classList.add('d-none');
    e.preventDefault(); //para que no se actualice
    inputTarea.value.trim();

    if (!inputTarea.value.trim()) {
        mensajeError.classList.remove('d-none');//quitar display none
        return;
    }

    const tarea = inputTarea.value;
    //llamar funcion y darle el valor de 'tarea'
    agregarTarea(tarea);
})

//delegacion de eventos
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-danger')) {
        tareas = tareas.filter((item) => {
            //parsear el id que se guarda como string
            return item.id !== parseInt(e.target.dataset.id);
        });
        mostrarTareas();        
    };
})

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tareas')) {
        //guardar en localstorage el JSON nuevo
        tareas = JSON.parse(localStorage.getItem('tareas'));
        mostrarTareas();
    }
})

