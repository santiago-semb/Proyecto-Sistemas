$(document).ready(() => {
    $("#div-mostrar-categorias").hide()
    localStorage.setItem("flecha", '1')
})

function quitarDisabled() {
    $("#btn-guardar-perfil").show();

    let formulario1 = document.getElementById('form-inicio');
    let formulario2 = document.getElementById('form-pf');
    let formulario3 = document.getElementById('form-pj');
    let formulario4 = document.getElementById('form-clus');

    let elementos1 = formulario1.elements;
    for (let i = 0; i < elementos1.length; i++) {
        elementos1[i].removeAttribute('disabled');
    }
    let elementos2 = formulario2.elements;
    for (let i = 0; i < elementos2.length; i++) {
        elementos2[i].removeAttribute('disabled');
    }
    let elementos3 = formulario3.elements;
    for (let i = 0; i < elementos3.length; i++) {
        elementos3[i].removeAttribute('disabled');
    }
    let elementos4 = formulario4.elements;
    for (let i = 0; i < elementos4.length; i++) {
        elementos4[i].removeAttribute('disabled');
    }
}

function guardarInfo()
{
    let formulario1 = document.getElementById('form-inicio');
    let formulario2 = document.getElementById('form-pf');
    let formulario3 = document.getElementById('form-pj');
    let formulario4 = document.getElementById('form-clus');

    let elementos1 = formulario1.elements;
    for (let i = 0; i < elementos1.length; i++) {
        elementos1[i].setAttribute('disabled', '');
    }
    let elementos2 = formulario2.elements;
    for (let i = 0; i < elementos2.length; i++) {
        elementos2[i].setAttribute('disabled', '');
    }
    let elementos3 = formulario3.elements;
    for (let i = 0; i < elementos3.length; i++) {
        elementos3[i].setAttribute('disabled', '');
    }
    let elementos4 = formulario4.elements;
    for (let i = 0; i < elementos4.length; i++) {
        elementos4[i].setAttribute('disabled', '');
    }
    document.getElementById("btn-guardar-perfil").style.backgroundColor = 'green'
    $("#btn-guardar-perfil").text("Guardado")  
    $("#btn-guardar-perfil").fadeOut(2000)

}

function mostrarCategorias()
{
    if(localStorage.getItem("flecha") === '1')
    {
        document.getElementById("icono-flecha").className = 'fa-solid fa-filter-circle-xmark'
        localStorage.setItem("flecha", '2')
    }
    else
    {
        document.getElementById("icono-flecha").className = 'fa-solid fa-filter'
        localStorage.setItem("flecha", '1')
    }
    $("#div-mostrar-categorias").toggle()
}

function guardarOferta()
{
    document.getElementById("btn-guardar-oferta").style.color = 'gray'
    document.getElementById("btn-guardar-oferta").style.userSelect = 'none'
    document.getElementById("btn-guardar-oferta").style.cursor = 'default'
    $("#text-guardar").text("Guardado")
}

function guardarPerfil()
{
    document.getElementById("btn-guardar-perfil").style.backgroundColor = 'green'
    $("#btn-guardar-perfil").text("Guardado")  
}

function copyIdToClipboard(id) {
    // Selecciona el contenido de la celda
    let idContent = document.createElement("textarea");
    idContent.value = id;
    document.body.appendChild(idContent);
    idContent.select();
    
    // Copia el contenido seleccionado al portapapeles
    document.execCommand("copy");

    // Elimina el elemento temporal
    document.body.removeChild(idContent);

    document.getElementById(id).innerHTML = `
    <i class="fa-solid fa-check ml-1"></i>
    `
    
    setInterval(() => {
        document.getElementById(id).innerHTML = `
        <i class="far fa-copy ml-1"></i>
        `
    }, 3000);
}

function cambiarOfflineOnline(id)
{
    var boton = document.getElementById(`${id}-estado`);
    
    if (boton.classList.contains('online')) {
        boton.classList.remove('online', 'bg-green-800', 'border-green-900');
        boton.classList.add('offline', 'bg-red-800', 'border-red-900');
        boton.textContent = 'Offline';
    } else {
        boton.classList.remove('offline', 'bg-red-800', 'border-red-900');
        boton.classList.add('online', 'bg-green-800', 'border-green-900');
        boton.textContent = 'Online';
    }
}

/*
// Esto es para los botones de filtro de 'productos' y 'servicios' en ofertas de usuario
const btnProductos = document.getElementById('productos');
const btnServicios = document.getElementById('servicios');

btnProductos.addEventListener('click', () => {
    btnProductos.classList.remove('bg-white', 'text-black');
    btnProductos.classList.add('bg-gray-800', 'text-white');
    btnServicios.classList.remove('bg-gray-800', 'text-white');
    btnServicios.classList.add('bg-white', 'text-black');
});

btnServicios.addEventListener('click', () => {
    btnServicios.classList.remove('bg-white', 'text-black');
    btnServicios.classList.add('bg-gray-800', 'text-white');
    btnProductos.classList.remove('bg-gray-800', 'text-white');
    btnProductos.classList.add('bg-white', 'text-black');
});
*/


// Función para alternar la visibilidad del menú de chats
function toggleChatList() {
    const chatList = document.getElementById('chat-list');
    const chatArrow = document.getElementById('chat-arrow');
    chatList.classList.toggle('show');
    if (chatList.classList.contains('show')) {
        chatArrow.classList.remove('fa-chevron-down');
        chatArrow.classList.add('fa-chevron-up');
    } else {
        chatArrow.classList.remove('fa-chevron-up');
        chatArrow.classList.add('fa-chevron-down');
    }
}

document.getElementById('chat-toggle').addEventListener('click', toggleChatList);

const obtenerChatsMenu = async () => {
    let pais = localStorage.getItem("pais")
    let tdoc = localStorage.getItem("tdoc")
    let ndoc = localStorage.getItem("ndoc")
    const API_URL_Chat = `http://localhost:${port}/api/DataChat/listdoc/${pais}/${tdoc}/${ndoc}`;
    let data = await fetchApi2(API_URL_Chat, 'GET');
    const menuChat = document.getElementById("chat-list")
    if(data[0] === undefined || data[0] === null)
    {
        menuChat.innerHTML += `
            <p>No tienes chats</p>
        `
    }
    else
    {
        // Obtener data del receptor del mensaje
        // para mostrar en el menú
        data.forEach(async chat => {
            let paisR = chat.PaisReceptor
            let tdocR = chat.TdocReceptor
            let ndocR = chat.NdocReceptor
            if(paisR === pais && tdocR === tdoc && ndocR === ndoc)
            {   
                const API_URL_Per = `http://localhost:${port}/api/Persona?Pais=${paisR}&Tdoc=${tdocR}&Ndoc=${ndocR}`;
                let dataPersona = await fetchApi2(API_URL_Per, 'GET');
                let nombreCompleto = dataPersona.Nombre;
    
                let paramChat = `${chat.PaisReceptor}${chat.TdocReceptor}${chat.NdocReceptor}`
                menuChat.innerHTML += `
                    <a href="./chat.html?ch=${paramChat}" class="chat-item">
                        <img src="https://via.placeholder.com/25" alt="Chat 1" class="chat-img rounded-full object-cover mr-3">
                        <span class='text-xs font-bold'>${nombreCompleto.toUpperCase()}</span>
                    </a>
                `
            }
            else
            {
                let paisE = chat.PaisEmisor
                let tdocE = chat.TdocEmisor
                let ndocE = chat.NdocEmisor
                const API_URL_Per = `http://localhost:${port}/api/Persona?Pais=${paisE}&Tdoc=${tdocE}&Ndoc=${ndocE}`;
                let dataPersona = await fetchApi2(API_URL_Per, 'GET');
                let nombreCompleto = dataPersona.Nombre;
    
                let paramChat = `${chat.PaisEmisor}${chat.TdocEmisor}${chat.NdocEmisor}`
                menuChat.innerHTML += `
                    <a href="./chat.html?ch=${paramChat}" class="chat-item">
                        <img src="https://via.placeholder.com/25" alt="Chat 1" class="chat-img rounded-full object-cover mr-3">
                        <span class='text-xs font-bold'>${nombreCompleto.toUpperCase()}</span>
                    </a>
                `
            }
        });
    }
}

obtenerChatsMenu()