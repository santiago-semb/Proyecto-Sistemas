const port = 55939;
const url = 'http://127.0.0.1:5500'

let paisLs = localStorage.getItem("pais")
let tdocLs = localStorage.getItem("tdoc")
let ndocLs = localStorage.getItem("ndoc")

const obtenerChatsBloqueados = async () => {
    let paisLs = localStorage.getItem("pais")
    let tdocLs = localStorage.getItem("tdoc")
    let ndocLs = localStorage.getItem("ndoc")
    const tbody = document.getElementById("tbody-tabla-bloqueados");
    const cartelNoChat = document.getElementById("no-chat");
    const tablaChatsNoBloqueados = document.getElementById("tabla-chat-bloqueados");
    const API_URL_Chat = `http://localhost:${port}/api/BlockChat/list/${paisLs}/${tdocLs}/${ndocLs}`;
    let data = await fetchApi2(API_URL_Chat, 'GET');
    if(data[0] === undefined || data[0] === null)
    {
        tablaChatsNoBloqueados.classList.add('hidden'); // Usa Tailwind CSS para ocultar
        cartelNoChat.classList.remove('hidden'); // Usa Tailwind CSS para mostrar
    }
    else
    {
        tablaChatsNoBloqueados.classList.remove('hidden'); // Usa Tailwind CSS para mostrar
        cartelNoChat.classList.add('hidden'); // Usa Tailwind CSS para ocultar
        data.forEach(async e => {
            let paisForEach = e.PaisBloqueado
            let tdocForEach = e.TdocBloqueado
            let ndocForEach = e.NdocBloqueado
            const API_URL_PER = `http://localhost:${port}/api/Persona?Pais=${paisForEach}&Tdoc=${tdocForEach}&Ndoc=${ndocForEach}`;
            let data = await fetchApi2(API_URL_PER, 'GET');
            let ownerPais = paisForEach;
            let ownerTdoc = tdocForEach;
            let ownerNdoc = ndocForEach;
            let offerOwnerPK = `${ownerPais}${ownerTdoc}${ownerNdoc}`;

            let rolPersona = data.Rol
            let fotoowner = ""

            if(rolPersona == 1)
                {
                    const API_URL_US = `http://localhost:${port}/api/Usuario/${ownerPais}/${ownerTdoc}/${ownerNdoc}`;
                    let data = await fetchApi2(API_URL_US, "GET");
                    // Cliente o Usuario
                    fotoowner = data.FotoBase64 ? `data:image/jpeg;base64,${data.FotoBase64}` : 'ruta/por_defecto.jpg';
                }
            if(rolPersona == 2)
                {
                    const API_URL_CL = `http://localhost:${port}/api/Cliente/${ownerPais}/${ownerTdoc}/${ownerNdoc}`;
                    let data = await fetchApi2(API_URL_CL, "GET");
                    // Cliente o Usuario
                    fotoowner = data.FotoBase64 ? `data:image/jpeg;base64,${data.FotoBase64}` : 'ruta/por_defecto.jpg';
                }


            tbody.innerHTML += `
                <tr class="border border-gray-300">
                    <td class="py-4"><b>${e.Chat_Id}</b></td>
                    <td>
                        <div class='flex items-center justify-center'>
                            <img src="${fotoowner}" style="width: 40px; height: 40px;" alt="Foto 1" class="rounded-full object-cover">
                            <span class='text-md font-bold ml-4 underline'><a href="./detalle_usuario.html?cl=${offerOwnerPK}">${data.Nombre}</a></span>
                        </div>
                    </td>
                    <td>
                        <button onclick="desbloquearChat(${e.Id},${e.Chat_Id})" class="text-red-500 px-3 py-1 rounded hover:text-red-700">
                            Desbloquear
                        </button>
                    </td>
                </tr>
            ` 
        });
    }
}

const desbloquearChat = (id, chat_id) => {
    const API_URL = `http://localhost:${port}/api/BlockChat/${id}/${chat_id}`;
    fetchApi2(API_URL, 'DELETE');
    const boton = event.target.closest('button');
    const tr = boton.closest('tr');
    tr.remove();
    verificarRegistrosTabla();
}

const verificarRegistrosTabla = () => {
    // Seleccionar el tbody de la tabla
    let tbody = document.getElementById('tbody-tabla-bloqueados');
    // Contar el número de filas en el tbody
    let filas = tbody.getElementsByTagName('tr').length;
    // Obtener el elemento para el mensaje de error
    let mensajeError = document.getElementById('no-chat');
    // Mostrar o ocultar el mensaje de error basado en el número de filas
    if (filas === 0) {
        mensajeError.style.display = 'block'; // Mostrar el mensaje de error
        document.getElementById("tabla-chat-bloqueados").style.display = 'none'
    } else {
        mensajeError.style.display = 'none'; // Ocultar el mensaje de error
    }
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

obtenerChatsBloqueados();