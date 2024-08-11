const port = 55939;

let paisLs = localStorage.getItem("pais");
let tdocLs = localStorage.getItem("tdoc");
let ndocLs = localStorage.getItem("ndoc");

const obtenerPersona = async (pais, tdoc, ndoc) => {
    const API_URL = `http://localhost:${port}/api/Persona?Pais=${pais}&Tdoc=${tdoc}&Ndoc=${ndoc}`;
    try {
        let data = await fetchApi(API_URL, "GET");
        let nombrePersona = data.Nombre
        let titulopersona = document.getElementById("nombre-persona-juridica")
        titulopersona.textContent = nombrePersona;
    } catch (error) {
        console.error("Error:", error);
    }
}

const obtenerOfertas = async (pais, tdoc, ndoc) => {
    const API_URL = `http://localhost:${port}/api/Oferta/byDoc/${pais}/${tdoc}/${ndoc}`;
    const _tbody = document.getElementById("tbody_offers");

    try {
        let data = await fetchApi(API_URL, "GET");
        let tablaOfertas = document.getElementById("tabla-ofertas")
        let divNoOfertas = document.getElementById("div-no-ofertas")
        if(data[0] === undefined || data[0] === null)
        {
            tablaOfertas.classList.add('hidden'); // Usa Tailwind CSS para ocultar
            divNoOfertas.classList.remove('hidden'); // Usa Tailwind CSS para mostrar
        }
        else
        {
            tablaOfertas.classList.remove('hidden'); // Usa Tailwind CSS para mostrar
            divNoOfertas.classList.add('hidden'); // Usa Tailwind CSS para ocultar

            // Crear un array de promesas para ObtenerGenerico
            let promises = data.map(async (offer) => {
                let ofertaId = offer.Tipo_Oferta;
                let categoriaId = offer.Categoria;

                // Esperar a que se resuelvan las promesas de ObtenerGenerico
                let tipoOferta = await ObtenerGenerico("TipoOferta", ofertaId).then(res => res.Nombre).catch(err => {
                    console.log(err);
                    return "Tipo de oferta no disponible";
                });

                let categoriaOferta = await ObtenerGenerico("Categoria", categoriaId).then(res => res.Nombre).catch(err => {
                    console.log(err);
                    return "Categoría de oferta no disponible";
                });

                return {
                    ...offer,
                    tipoOferta,
                    categoriaOferta
                };
            });

            // Esperar a que todas las promesas se resuelvan
            let resultados = await Promise.all(promises);

            // Construir el HTML después de que todas las promesas se hayan resuelto
            resultados.forEach(offer => {
                let tipoOff = offer.Tipo_Oferta
                tipoOff = tipoOff
                let btnOnline = `
                <button onclick="cambiarOfflineOnline(${offer.Id}); changeState(${offer.Id});" id="${offer.Id}-estado" class="online rounded bg-green-800 w-1/2 text-white uppercase text-xs font-mono border-2 border-green-900">
                    Online
                </button>
                `;
                let btnOffline = `
                <button onclick="cambiarOfflineOnline(${offer.Id}); changeState(${offer.Id});" id="${offer.Id}-estado" class="offline rounded bg-red-700 w-1/2 text-white uppercase text-xs font-mono border-2 border-red-800">
                    Offline
                </button>
                `;
                
                _tbody.innerHTML += `
                <tr class="hover:bg-gray-100" id="tr-tabla-guardado">
                    <td class="py-2 px-4 border-b">
                        ${offer.Id}
                        <button onclick="copyIdToClipboard(${offer.Id})" id="${offer.Id}" class="text-gray-400 hover:text-gray-800 focus:outline-none">
                            <i class="far fa-copy ml-1"></i>
                        </button>
                    </td>
                    <td class="py-2 px-4 border-b text-gray-600 font-bold">
                        ${offer.FechaPubl}
                        <button onclick="copyIdToClipboard(${offer.FechaPubl})" id="${offer.FechaPubl}" class="text-gray-400 hover:text-gray-800 focus:outline-none">
                            <i class="far fa-copy ml-1"></i>
                        </button>
                    </td>
                    <td class="py-2 px-4 border-b underline"><a href="../../../../Frontend/app/cliente/detalle_oferta.html?id=${offer.Id}" id="a-detalle-oferta">${offer.Nombre}</a></td>
                    <td class="py-2 px-4 border-b">
                        ${ (tipoOff === 1) ? `<div class='text-xs w-full rounded py-1 text-black bg-gray-200 font-bold'>${offer.tipoOferta}</div>` : `<div class='text-xs w-full rounded py-1 text-black bg-gray-200 font-bold'>${offer.tipoOferta}</div>`  }
                    </td>
                    <td class="py-2 px-4 border-b"><div class="text-xs w-full mx-auto rounded p-1 text-black bg-zinc-600 font-bold">${offer.categoriaOferta}</div></td>
                    <td class="py-2 border-b">
                        <span>${(offer.Estado === 1) ? btnOnline : btnOffline}</span>
                    </td>
                </tr>
                `;
            });
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

const ObtenerGenerico = async (queObtener, id) => {
    const API_URL = `http://localhost:${port}/api/${queObtener}/${id}`;

    try {
        const response = await fetch(API_URL, { method: 'GET' });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al obtener ${queObtener}:`, error);
    }
};

const changeState = (offerId) => {
    const API_URL = `http://localhost:${port}/api/Oferta/estadoUpd/${offerId}`;

    fetch(API_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
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
        console.error("Error al enviar el formulario pj:", error);
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


obtenerPersona(paisLs, tdocLs, ndocLs);
obtenerOfertas(paisLs, tdocLs, ndocLs);