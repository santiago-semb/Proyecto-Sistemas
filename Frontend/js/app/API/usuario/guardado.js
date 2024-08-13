
const port = 55939;

let paisLs = localStorage.getItem("pais");
let tdocLs = localStorage.getItem("tdoc");
let ndocLs = localStorage.getItem("ndoc");
let TipoPersona = localStorage.getItem("tipo");
let RolPersona = localStorage.getItem("rol");

let codigo_usuario = paisLs.trim()+tdocLs.trim()+ndocLs.trim();

const obtenerOfertas = async (Codigo_Usu) => {
    const API_URL = `http://localhost:${port}/api/GuardarOferta?Codigo_Usu=${Codigo_Usu}`;
    let data = await fetchApi(API_URL, 'GET');
    const _tbody = document.getElementById("tbody-guardar-ofertas");
    data.forEach(async oferta => {
        let offerId = oferta.Id_Oferta;
        let cod_usu = oferta.Codigo_Usu;
        const API_URL2 = `http://localhost:${port}/api/Oferta/${offerId}`;
        let mi_oferta = await fetchApi(API_URL2, 'GET'); 
        let ownerPais = mi_oferta.Pais;
        let ownerTdoc = mi_oferta.Tdoc;
        let ownerNdoc = mi_oferta.Ndoc;
        let offerOwnerPK = `${ownerPais}${ownerTdoc}${ownerNdoc}`;
        const API_URL3 = `http://localhost:${port}/api/Persona?Pais=${ownerPais}&Tdoc=${ownerTdoc}&Ndoc=${ownerNdoc}`;
        let offerOwner = await fetchApi(API_URL3, 'GET');
        _tbody.innerHTML += `
            <tr class="hover:bg-gray-100" id="tr-tabla-guardado">
                <td class="py-2 px-4 border-b font-bold text-gray-600">${oferta.Fecha_Guardado}</td>
                <td class="py-2 px-4 border-b font-bold text-gray-600">${mi_oferta.FechaPubl}</td>
                <td class="py-2 px-4 border-b underline"><a href="./detalle_oferta.html?id=${mi_oferta.Id}">${mi_oferta.Nombre}</a></td>
                <td class="py-2 px-4 border-b underline">
                    <a href="./detalle_usuario.html?cl=${offerOwnerPK}">
                    ${offerOwner.Nombre}
                    </a>
                </td>
                <td class="py-2 px-4 border-b text-black font-bold">$${mi_oferta.Precio}</td>
                <td class="py-2 px-4 border-b" >
                    <button onclick="eliminarOfertaGuardada(${cod_usu},${offerId})" class="text-red-500 px-3 py-1 rounded hover:text-red-700">
                        <i class="fa-solid fa-square-xmark text-3xl" id="btn-eliminar-guardado"></i>
                    </button>
                </td>
            </tr>
        `
    });
}

// Método para hacer peticiones API
const fetchApi = async (url, method) => { 
    return fetch(url, {method: method})
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error:", error);
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

const eliminarOfertaGuardada = (Codigo_Usu, Id_Oferta) => {
    const API_URL = `http://localhost:${port}/api/GuardarOferta?CodUsu=${Codigo_Usu}&IdOfer=${Id_Oferta}`;
    fetchApi(API_URL, 'DELETE');
    const boton = event.target.closest('button');
    const tr = boton.closest('tr');
    tr.remove();
}

obtenerOfertas(codigo_usuario);