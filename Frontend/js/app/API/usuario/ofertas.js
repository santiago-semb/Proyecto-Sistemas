const port = 55939;
const url = 'http://127.0.0.1:5500'

const obtenerCategorias = async () => {
    const API_URL = `http://localhost:${port}/api/Categoria`;
    try {
        let data = await fetchApi2(API_URL, "GET");
        const divCat = document.getElementById("div-mostrar-categorias")
        data.forEach(cat => {
            divCat.innerHTML += `
                <div class="font-bold m-2">
                    <button class="text-xs rounded p-1 text-white bg-red-500 font-bold">
                        ${cat.Nombre}
                    </button>
                </div>
            `
        });
        
    } catch (error) {
        console.error("Error:", error);
    }
}

const obtenerOfertas = async () => {
    const API_URL = `http://localhost:${port}/api/Oferta`;
    try {
        let data = await fetchApi2(API_URL, "GET");
        const divPublicaciones = document.getElementById("publicaciones")
        data.forEach(async publi => {
            let pais = publi.Pais;
            let tdoc = publi.Tdoc;
            let ndoc = publi.Ndoc;
            let persona = await obtenerCliente(pais, tdoc, ndoc);
            let paisPersona = persona.Pais.toString();
            let tdocPersona = persona.Tdoc.toString();
            let ndocPersona = persona.Ndoc;
            let categoryOffer = await ObtenerGenerico("Categoria", publi.Categoria);
            divPublicaciones.innerHTML += `
            <div class="bg-white shadow-md rounded-lg p-4 m-2 w-80">
                <div class="flex items-center justify-between">
                    <div class="mb-4" style="user-select: none;"><div class="font-bold"><div class="text-xs rounded p-1 text-white bg-red-500 font-bold">${categoryOffer.Nombre}</div></div></div>
                    <div class="text-gray-600 text-sm mb-2" style="user-select: none;">${publi.FechaPubl}</div>
                </div>
                <a href="./detalle_oferta.html?id=${publi.Id}"><img src="../../assets/img/imagen-index.png" alt="Foto de la publicación" class="mb-4 rounded-lg"></a>
                <div class="font-bold text-xl mb-2 text-center" style="user-select: none;">${publi.Nombre}</div>
                <div class="p-2 text-center text-gray-900"><b class="text-3xl" style="user-select: none;">$${publi.Precio}</b></div>
                <hr>
                <div class="flex items-center mt-4">
                    <img src="../../assets/img/logo.png" alt="Foto de usuario" class="rounded-full w-12 h-12 mr-4">
                    <div>
                        <div class="font-bold"><a href="./detalle_usuario.html?cl=${paisPersona+tdocPersona+ndocPersona}">${persona.Nombre}</a></div>
                    </div>
                </div>
            </div>
            `
        });
        
    } catch (error) {
        console.error("Error:", error);
    }
}

const obtenerCliente = async (pais, tdoc, ndoc) => {
    const API_URL = `http://localhost:${port}/api/Persona?Pais=${pais}&Tdoc=${tdoc}&Ndoc=${ndoc}`;
    try {
        let data = await fetchApi2(API_URL, "GET");
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}

// Método para hacer peticiones API
const fetchApi2 = (url, method) => { 
    return fetch(url, {method: method})
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

const ObtenerGenerico = async (queObtener, id) => {
    const API_URL = `http://localhost:${port}/api/${queObtener}/${id}`;

    try {
        const response = await fetch(API_URL, { method: 'GET' });
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error(`Error al obtener ${queObtener}:`, error);
        return null;
    }
};

obtenerCategorias()
obtenerOfertas()