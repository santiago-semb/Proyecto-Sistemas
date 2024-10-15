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
    let pais = parseInt(localStorage.getItem("pais"));
    let tdoc = parseInt(localStorage.getItem("tdoc"));
    let ndoc = localStorage.getItem("ndoc");
    const API_URL_Chats = `http://localhost:${port}/api/DataChat/listdoc/${pais}/${tdoc}/${ndoc}`;
    let data = await fetchApi2(API_URL_Chats, 'GET');
    const menuChat = document.getElementById("chat-list");
    let IdChatParaUsoBtnEliminar = 0;
    if (!data || data.length === 0) {
        menuChat.innerHTML += `
            <p class="chat-item-for-nochat select-none">
                <span class='text-xs font-bold mx-auto'>No tienes chats disponibles</span>
            </p>
        `;
        return;
    }
    else
    {
        let chats = [];
        for (const chat of data) {
            chats.push(chat.Id);
        }
    
        // Obtener mensajes no leídos para todos los chats
        const API_URL_UnreadMessages = `http://localhost:${port}/api/MessageChat/list/noread/${pais}/${tdoc}/${ndoc}`;
        let datamessage = await fetchApi2(API_URL_UnreadMessages, 'GET');
        
        // Crear un mapa para contar mensajes no leídos por chat
        let unreadMessageCount = new Map();
        if (datamessage && datamessage.length > 0) {
            datamessage.forEach(msg => {
                if (msg.Leido == 0 && chats.includes(msg.Id_Chat)) {
                    let currentCount = unreadMessageCount.get(msg.Id_Chat) || 0;
                    unreadMessageCount.set(msg.Id_Chat, currentCount + 1);
                }
            });
        }

        let paisLs = parseInt(localStorage.getItem("pais"))
        let tdocLs = parseInt(localStorage.getItem("tdoc"))
        let ndocLs =localStorage.getItem("ndoc")

        for (const chat of data) {
            let idChat = chat.Id;

            const API_URL_ChatsBloqued = `http://localhost:${port}/api/BlockChat/blocked/${paisLs}/${tdocLs}/${ndocLs.trim()}/${idChat}`;
            let dataBlockChat = await fetchApi2(API_URL_ChatsBloqued, 'GET');
            // Si no está en la lista de chat bloqueados, entonces mostrar en el menú
            if(dataBlockChat === false)
            {
                let paisR = chat.PaisReceptor;
                let tdocR = chat.TdocReceptor;
                let ndocR = chat.NdocReceptor;
                let paisE = chat.PaisEmisor;
                let tdocE = chat.TdocEmisor;
                let ndocE = chat.NdocEmisor;

                
                let paisApi, tdocApi, ndocApi;
                let paramChat;

                if (paisR === pais && tdocR === tdoc && ndocR.trim() === ndoc.trim()) {
                    paisApi = paisE;
                    tdocApi = tdocE;
                    ndocApi = ndocE;
                    paramChat = `${chat.PaisEmisor}${chat.TdocEmisor}${chat.NdocEmisor}`;
                } else if (paisE === pais && tdocE === tdoc && ndocE.trim() === ndoc.trim()) {
                    paisApi = paisR;
                    tdocApi = tdocR;
                    ndocApi = ndocR;
                    paramChat = `${chat.PaisReceptor}${chat.TdocReceptor}${chat.NdocReceptor}`;
                }
                
                console.log(pais, tdoc, ndoc)

                console.log(paisR, tdocR, ndocR.trim())
                console.log(paisE, tdocE, ndocE.trim())

                console.log(paisR === pais && tdocR === tdoc && ndocR.trim() === ndoc)
                console.log(paisE === pais && tdocE === tdoc && ndocE.trim() === ndoc)

                const API_URL_Per = `http://localhost:${port}/api/Persona?Pais=${paisApi}&Tdoc=${tdocApi}&Ndoc=${ndocApi}`;
                let dataPersona = await fetchApi2(API_URL_Per, 'GET');
                let nombreCompleto = dataPersona.Nombre;
                let rolPersona = dataPersona.Rol;
                let fotoPersona = "";
                if(rolPersona == 1)
                {
                    const API_URL_Us = `http://localhost:${port}/api/Usuario?Pais=${paisApi}&Tdoc=${tdocApi}&Ndoc=${ndocApi}`;
                    let data = await fetchApi2(API_URL_Us, 'GET');
                    fotoPersona = data.FotoBase64 ? `data:image/jpeg;base64,${data.FotoBase64}` : '../../assets/img/user.jfif';
                }
                if(rolPersona == 2)
                {
                    const API_URL_Cl = `http://localhost:${port}/api/Cliente?Pais=${paisApi}&Tdoc=${tdocApi}&Ndoc=${ndocApi}`;
                    let data = await fetchApi2(API_URL_Cl, 'GET');
                    fotoPersona = data.FotoBase64 ? `data:image/jpeg;base64,${data.FotoBase64}` : '../../assets/img/user.jfif';
                }

                // Obtener la cantidad de mensajes no leídos para este chat
                let cantMensajesNoLeidos = unreadMessageCount.get(chat.Id) || 0;
                let hayMensajesNoLeidos = cantMensajesNoLeidos > 0 
                    ? `<span id="mensajesNoLeidos" class="flex-shrink-0 rounded-full px-2 py-1 bg-blue-500 text-white text-xs font-bold">${cantMensajesNoLeidos}</span>`
                    : '';
        
                menuChat.innerHTML += `
                    <a href="./chat.html?ch=${paramChat}&nr=${cantMensajesNoLeidos}" class="flex items-center justify-between chat-item">
                        <div class='flex items-center justify-between'>
                            <img src="${fotoPersona}" alt="Chat 1" class="chat-img rounded-full object-cover mr-3">
                            <span class='text-xs font-bold'>${nombreCompleto.toUpperCase()}</span>
                        </div>
                        ${hayMensajesNoLeidos}
                    </a>
                `;
            }
    }
    menuChat.innerHTML += `
    <a href="./chat_bloqueados.html" class="flex items-center justify-center bg-gray-900 py-1 border-t-4 border-gray-700"> 
        <div>
            <span><i class="fa-solid fa-ban text-red-700"></i> Chats Bloqueados</span>
        </div>
    </a>
    `
}

    
};

obtenerChatsMenu()