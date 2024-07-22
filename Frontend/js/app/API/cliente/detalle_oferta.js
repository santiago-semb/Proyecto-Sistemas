const port = 55939;
const url = 'http://127.0.0.1:5500/Frontend'

let urlActual = window.location.href;
let parametrosURL = new URLSearchParams(new URL(urlActual).search);
let idOferta = parametrosURL.get('id');

let paisLs = localStorage.getItem("pais");
let tdocLs = localStorage.getItem("tdoc");
let ndocLs = localStorage.getItem("ndoc");

let nombreOferta = document.getElementById("nombre-detalle")
let precioOferta = document.getElementById("precio-detalle")
let descOferta = document.getElementById("desc-detalle")
let selectCategorias = document.getElementById("select-categorias-detalle");
let spanFechaPubl = document.getElementById("fecha-publ")


const obtenerOferta = async (id) => {
    const API_URL = `http://localhost:${port}/api/Oferta/${id}`;
    try {
        let data = await fetchApi2(API_URL, "GET");
        nombreOferta.value = data.Nombre.trim()
        precioOferta.value = data.Precio
        descOferta.value = data.Descripcion.trim()
        spanFechaPubl.innerHTML = data.FechaPubl
        let categoriaElegida = data.Categoria;
        obtenerCategorias(categoriaElegida)
    } catch (error) {
        console.error("Error:", error);
    }
}

const actualizarOferta = (id) => {
    const API_URL = `http://localhost:${port}/api/Oferta/${id}`;
    
    let datosFormulario = {
        Tipo_Oferta: 1,
        Nombre: nombreOferta.value,
        Descripcion: descOferta.value,
        Categoria: selectCategorias.value,
        Foto: null,
        Precio: precioOferta.value,
        Estado: 1,
        FechaPubl: "2024-06-09T12:18:02.3174827-03:00"
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

const obtenerPersona = async (pais, tdoc, ndoc) => {
    const API_URL = `http://localhost:${port}/api/PJ?Pais=${pais}&Tdoc=${tdoc}&Ndoc=${ndoc}`;
    try {
        let data = await fetchApi2(API_URL, "GET");
        document.getElementById("usuario-detalle").innerHTML = data.RazSoc;
    } catch (error) {
        console.error("Error:", error);
    }
}

const obtenerCategorias = async (categoriaElegida) => {
    const API_URL = `http://localhost:${port}/api/Categoria`;
    try {
        let data = await fetchApi2(API_URL, "GET");
        const API_URL_cat = `http://localhost:${port}/api/Categoria/${categoriaElegida}`;
        let dataCategoria = await fetchApi2(API_URL_cat, "GET");
        nombreCategoriaElegida = dataCategoria.Nombre;
        console.log(categoriaElegida)
        selectCategorias.innerHTML += `
            <option selected value="${categoriaElegida}">${nombreCategoriaElegida}</option>
        `
        data.forEach(category => {
            selectCategorias.innerHTML += `
                <option value="${category.Id}">${category.Nombre}</option>
            `
        });
    } catch (error) {
        console.error("Error:", error);
    }
}


const eliminarOferta = (id) => {
    const API_URL = `http://localhost:${port}/api/Oferta/${id}`;
    try {
        fetchApi(API_URL, "DELETE");
    } catch (error) {
        console.error("Error:", error);
    }
}

function redireccionarAOfertas()
{
    setInterval(() => {
        window.location.href = `${url}/app/cliente/ofertas.html`;
    }, 200);
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

document.getElementById("delete-offer").addEventListener("click", () => {
    eliminarOferta(idOferta);
    redireccionarAOfertas();
})
document.getElementById("save-offer").addEventListener("click", () => {
    actualizarOferta(idOferta);
    redireccionarAOfertas();
})

obtenerPersona(paisLs, tdocLs, ndocLs)
obtenerOferta(idOferta);
