/* ---------------------- JAVASCRIPT PARA CHAT ---------------------- */

document.getElementById('send-button').addEventListener('click', () => {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    if (messageText) {
        appendMessage(messageText, 'sent');
        messageInput.value = '';
        /*setTimeout(() => {
            appendMessage('Respuesta automática', 'received');
        }, 1000);*/
    }
});

function appendMessage(text, type) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    let horaActual = obtenerHoraActualArgentina();
    messageDiv.className = type === 'sent' ? 'text-right' : 'text-left';
    messageDiv.innerHTML = `
        <span class='text-blue-700 text-xs'><i class='fa-regular fa-circle-check'></i></span>
        <div class="inline-block p-2 my-2 rounded-lg ${type === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} fade-in">
            ${text}
        </div>
        <span class='text-xs text-gray-400 pr-1 select-none'>${horaActual}</span>
        `;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function obtenerHoraActualArgentina() {
    // Crea un objeto Date con la fecha y hora actuales
    const now = new Date();

    // Define las opciones para formatear la hora en la zona horaria de Argentina
    const opciones = {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Usa el formato de 24 horas
    };

    // Crea un formateador para la hora con las opciones especificadas
    const formateador = new Intl.DateTimeFormat('es-AR', opciones);

    // Obtiene la hora formateada en una cadena
    const horaFormateada = formateador.format(now);

    // Devuelve el formato HH:MM
    return horaFormateada;
}

function obtenerHoraActualArgentinaConSegundos() {
    // Crea un objeto Date con la fecha y hora actuales
    const now = new Date();

    // Define las opciones para formatear la hora en la zona horaria de Argentina
    const opciones = {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Usa el formato de 24 horas
    };

    // Crea un formateador para la hora con las opciones especificadas
    const formateador = new Intl.DateTimeFormat('es-AR', opciones);

    // Obtiene la hora formateada en una cadena
    const horaFormateada = formateador.format(now);

    // Devuelve el formato HH:mm:ss
    return horaFormateada;
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
    let PaisEmisor = parseInt(paisParam.trim())
    let TdocEmisor = parseInt(tdocParam.trim())
    let NdocEmisor = ndocParam.trim()
    let PaisReceptor = parseInt(localStorage.getItem("pais").trim())
    let TdocReceptor = parseInt(localStorage.getItem("tdoc").trim())
    let NdocReceptor = localStorage.getItem("ndoc").trim()
    const API_URL_chat = `http://localhost:${port}/api/DataChat?pEmi=${PaisEmisor}&tEmi=${TdocEmisor}&nEmi=${NdocEmisor}&pRec=${PaisReceptor}&tRec=${TdocReceptor}&nRec=${NdocReceptor}`;
    let data = await fetchApi2(API_URL_chat, 'GET');
    (data === undefined || data === null) ? chatExiste = "N" : chatExiste = "S";
    if(chatExiste === 'S') chatId = data.Id;
    if(chatExiste === 'N')
    {
        await CrearChat();
        let PaisUsuario = parseInt(localStorage.getItem("pais").trim())
        let TdocUsuario= parseInt(localStorage.getItem("tdoc").trim())
        let NdocUsuario = localStorage.getItem("ndoc").trim()
        let PaisCliente = parseInt(paisParam.trim())
        let TdocCliente = parseInt(tdocParam.trim())
        let NdocCliente = ndocParam.trim()
        // Recupero el Id creado del chat
        const API_URL_chat_id = `http://localhost:${port}/api/DataChat?pEmi=${PaisUsuario}&tEmi=${TdocUsuario}&nEmi=${NdocUsuario}&pRec=${PaisCliente}&tRec=${TdocCliente}&nRec=${NdocCliente}`;
        let data = await fetchApi2(API_URL_chat_id, 'GET');
        chatId = data.Chat_Id;
    }
}

const CrearChat = async () => {
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

const EnviarMensaje = async (mensaje, chat) => {
    const API_URL = `http://localhost:${port}/api/MessageChat`;

    let fecha = obtenerHoraActualArgentinaConSegundos();

    let datosFormulario = {
        Id_Chat: chat,
        PaisEmisor2: localStorage.getItem("pais"),
        TdocEmisor2: localStorage.getItem("tdoc"),
        NdocEmisor2: localStorage.getItem("ndoc"),
        PaisReceptor2: paisParam,
        TdocReceptor2: tdocParam,
        NdocReceptor2: ndocParam,
        Mensaje: mensaje,
        Fecha: fecha,
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

const obtenerChat = async () => {
    await VerificarExistenciaChat()
    const API_URL_Chat = `http://localhost:${port}/api/MessageChat/list/${chatId}`;
    let data = await fetchApi2(API_URL_Chat, 'GET');
    const cartelNoMessages = document.getElementById("sin-mensajes-disponibles")
    if(data[0] === undefined || data[0] === null)
    {
        cartelNoMessages.style.display = 'block'
    }
    else
    {
        cartelNoMessages.style.display = 'none'
        const chatBox = document.getElementById("chat-box")
        let paisp = parseInt(localStorage.getItem("pais"));
        let tdocp = parseInt(localStorage.getItem("tdoc"));
        let ndocp = localStorage.getItem("ndoc");
        let persona = `${paisp}${tdocp}${ndocp}`
        let idMsg = 0;
        let actualizarEstadoMensaje = false;
        data.forEach(msg => {
            if(paisp === msg.PaisReceptor2 && tdocp === msg.TdocReceptor2 && ndocp === msg.NdocReceptor2)
            {   
                idMsg = msg.Id;
                actualizarEstadoMensaje = true
            }

            let fechaMsg = msg.Fecha;
            // Crear un objeto Date a partir de la cadena
            const dateObj = new Date(fechaMsg);
            // Obtener la hora y minutos
            const horas = dateObj.getHours().toString().padStart(2, '0');
            const minutos = dateObj.getMinutes().toString().padStart(2, '0');
            // Formatear como HH:MM
            const horaMinuto = `${horas}:${minutos}`;

            if((persona) === (`${msg.PaisEmisor2}${msg.TdocEmisor2}${msg.NdocEmisor2}`))
            {
                let enviado_o_visto;
                (msg.Leido == 0) ? enviado_o_visto = "<span class='text-blue-700 text-xs'><i class='fa-regular fa-circle-check'></i></span>" : enviado_o_visto = "<span class='text-blue-700 text-xs'><i class='fa-regular fa-eye'></i></span>";

                chatBox.innerHTML += `
                <div class='text-right'>
                    ${enviado_o_visto}
                    <div class="inline-block p-2 rounded-lg bg-blue-500 text-white fade-in">
                        <span>${msg.Mensaje}</span>
                    </div>
                    <span class='text-xs text-gray-400 pl-1 select-none'>${horaMinuto}</span>
                </div>
                `
            }
            else
            {
                chatBox.innerHTML += `
                <div class='text-left'>
                    <span class='text-xs text-gray-400 pr-1 select-none'>${horaMinuto}</span>
                    <div class="inline-block p-2 rounded-lg bg-gray-200 text-black fade-in">
                        <span>${msg.Mensaje}</span>
                    </div>     
                </div>
                `
            }
            if(actualizarEstadoMensaje) updateEstadoChat(idMsg);
        });

    }
}

const updateEstadoChat = (id) => {
    const API_URL = `http://localhost:${port}/api/MessageChat/${id}`;

    let datosFormulario = {
        Leido: 1,
      }
    
    fetch(API_URL, {
        method: "PUT",
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
    })
    .catch(error => {
        console.error("Error al enviar el formulario:", error);
    });
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

const SendButton = async () => {
    if(document.getElementById("sin-mensajes-disponibles") != undefined || document.getElementById("sin-mensajes-disponibles") != null)
    {
        const cartelNoMessages = document.getElementById("sin-mensajes-disponibles")
        cartelNoMessages.style.display = 'none'
    }
    let mensaje = document.getElementById("message-input").value;
    await VerificarExistenciaChat()
    await EnviarMensaje(mensaje, chatId);
}

const bloquearChat = async () => {
    const API_URL = `http://localhost:${port}/api/BlockChat`;

    let datosFormulario = {
        Chat_Id: chatId,
        PaisBloqueador: localStorage.getItem("pais"),
        TdocBloqueador: localStorage.getItem("tdoc"),
        NdocBloqueador: localStorage.getItem("ndoc"),
        PaisBloqueado: paisParam,
        TdocBloqueado: tdocParam,
        NdocBloqueado: ndocParam,
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

$('#menu-config-chat').click(() => {
    $('#mini-menu').toggle();
})

document.getElementById("btn-eliminar-chat").addEventListener("click", async () => {
    //await eliminarChat(chatId);
    await bloquearChat();
})

obtenerEstadoConexion(paisParam, tdocParam, ndocParam)
obtenerDatosPersona(paisParam, tdocParam, ndocParam)
obtenerChat()