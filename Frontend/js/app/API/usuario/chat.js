/* ---------------------- JAVASCRIPT PARA CHAT ---------------------- */
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

document.getElementById('send-button').addEventListener('click', () => {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    if (messageText) {
        appendMessage(messageText, 'sent');
        messageInput.value = '';
        setTimeout(() => {
            appendMessage('Respuesta automática', 'received');
        }, 1000);
    }
});

function appendMessage(text, type) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'sent' ? 'text-right' : 'text-left';
    messageDiv.innerHTML = `<div class="inline-block p-2 my-2 rounded-lg ${type === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} fade-in">${text}</div>`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
/* ---------------------- JAVASCRIPT PARA CHAT ---------------------- */

const port = 55939;
const url = 'http://127.0.0.1:5500'

let urlActual = window.location.href;
let parametrosURL = new URLSearchParams(new URL(urlActual).search);
let clienteParam = parametrosURL.get('ch');

let paisParam = clienteParam.substring(0,1);
let tdocParam = clienteParam.substring(1,2);
let ndocParam = clienteParam.substring(2);

let chatExiste;
let chatId;

const obtenerDatosPersona = async (pais, tdoc, ndoc) => {
    const API_URL_Personas = `http://localhost:${port}/api/Persona?Pais=${pais}&Tdoc=${tdoc}&Ndoc=${ndoc}`;
    let data = await fetchApi2(API_URL_Personas, 'GET');
    document.getElementById("nombre-persona-chat").textContent = data.Nombre;
}

const obtenerEstadoConexion = async (pais, tdoc, ndoc) => {
    const API_URL_Personas = `http://localhost:${port}/api/Credenciales?id1=${pais}&id2=${tdoc}&id3=${ndoc}`;
    let data = await fetchApi2(API_URL_Personas, 'GET');
    let divUltAcceso = document.getElementById("div-ult-acceso-persona-chat");
    let ultAccesoPersona = data.FecUltAcc;
    // Nota: Cuando se cree el atributo con la fecha correcta
    //       solo cambiar el valor de 'ultAccesoPersona' con el atributo correspondiente
    const status = checkOnlineStatus(ultAccesoPersona);
    if(status === 1) // Desconectado
    {
        divUltAcceso.innerHTML += `
        <p class="text-sm text-white bg-gray-800 p-1 px-2 rounded inline-flex items-center">
            <i class="fa-solid fa-circle text-red-800 text-xs mr-1"></i>
            <span class="font-bold select-none">Desconectado</span>
        </p>
    `
    }
    else // Conectado
    {
        divUltAcceso.innerHTML += `
        <p class="text-sm text-white bg-gray-800 p-1 px-2 rounded inline-flex items-center">
            <i class="fa-solid fa-circle text-green-400 text-xs mr-1"></i>
            <span class="font-bold select-none">En línea</span>
        </p>
    `
    }
}

function checkOnlineStatus(lastAccessTime) {
    // Convertir la fecha obtenida (lastAccessTime) a un objeto Date
    const lastAccessDate = new Date(lastAccessTime);
    
    // Obtener la fecha y hora actual
    const currentDate = new Date();
    
    // Calcular la diferencia en milisegundos
    const differenceInMs = currentDate - lastAccessDate;
    
    // Convertir la diferencia a segundos
    const differenceInSeconds = differenceInMs / 1000;
    
    // Verificar si la diferencia es menor o igual a 60 segundos
    if (differenceInSeconds <= 60) {
        return 0;
    } else {
        return 1;
    }
}

const VerificarExistenciaChat = async () => {
    let PaisEmisor = parseInt(localStorage.getItem("pais").trim())
    let TdocEmisor = parseInt(localStorage.getItem("tdoc").trim())
    let NdocEmisor = localStorage.getItem("ndoc").trim()
    let PaisReceptor = parseInt(paisParam.trim())
    let TdocReceptor = parseInt(tdocParam.trim())
    let NdocReceptor = ndocParam.trim()
    console.log(PaisEmisor, TdocEmisor, NdocEmisor, PaisReceptor, TdocReceptor, NdocReceptor)
    //const API_URL_chat = `http://localhost:${port}/api/DataChat?pEmi=${PaisEmisor}&tEmi=${TdocEmisor}&nEmi=${NdocEmisor}&pRec=${PaisReceptor}&tRec=${TdocReceptor}&nRec=${NdocReceptor}`;
    const API_URL_chat = `http://localhost:${port}/api/DataChat?pEmi=1&tEmi=1&nEmi=44767442&pRec=1&tRec=3&nRec=24998546727`;
    let data = await fetchApi2(API_URL_chat, 'GET');
    (data[0] === undefined || data[0] === null) ? chatExiste = "N" : chatExiste = "S";
    if(chatExiste === 'S')
    {
        chatId = data.Id
    }
}

const CrearChat = () => {
    const API_URL = `http://localhost:${port}/api/DataChat`;

    let datosFormulario = {
        PaisEmisor: localStorage.getItem("pais"),
        TdocEmisor: localStorage.getItem("tdoc"),
        NdocEmisor: localStorage.getItem("ndoc"),
        PaisReceptor: paisParam,
        TdocReceptor: tdocParam,
        NdocReceptor: ndocParam,
        Contenido: '',
        Fecha: '9/6/2024',
        Leido: 0,
    }

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosFormulario)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Hubo un problema al enviar el formulario: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log("Respuesta de la API:", data);
        // Aquí puedes hacer algo con la respuesta de la API, como redirigir a otra página
    })
    .catch(error => {
        console.error("Error al enviar el formulario:", error);
    });
}

const EnviarMensaje = () => {
    const API_URL = `http://localhost:${port}/api/MessageChat`;

    let mensaje = document.getElementById("message-input");
    let fecha = obtenerFecha();

    let datosFormulario = {
        Id_Chat: chatId,
        PaisEmisor2: localStorage.getItem("pais"),
        TdocEmisor2: localStorage.getItem("tdoc"),
        NdocEmisor2: localStorage.getItem("ndoc"),
        PaisReceptor2: paisParam,
        TdocReceptor2: tdocParam,
        NdocReceptor2: ndocParam,
        Mensaje: mensaje,
        Fecha: '9/6/2024',
        Leido: 0,
    }

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosFormulario)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Hubo un problema al enviar el formulario: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log("Respuesta de la API:", data);
        // Aquí puedes hacer algo con la respuesta de la API, como redirigir a otra página
    })
    .catch(error => {
        console.error("Error al enviar el formulario:", error);
    });
}

function obtenerFecha() {
    var fechaActual = new Date();
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por eso sumamos 1
    var año = fechaActual.getFullYear();

    // Formatear el día y el mes para asegurarnos de tener dos dígitos
    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }

    var fechaFormateada = dia + '/' + mes + '/' + año;
    return fechaFormateada;
}

// Método para hacer peticiones API
const fetchApi2 = async (url, method) => { 
    return fetch(url, {method: method})
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

const SendButton = () => {
    VerificarExistenciaChat()
    console.log(chatExiste);
    console.log(chatId)
    //if(chatExiste === 'N') CrearChat();
    //EnviarMensaje();
}

obtenerEstadoConexion(paisParam, tdocParam, ndocParam)
obtenerDatosPersona(paisParam, tdocParam, ndocParam)