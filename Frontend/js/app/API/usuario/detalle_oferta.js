const port = 55939;
const url = 'http://127.0.0.1:5500'

let urlActual = window.location.href;
let parametrosURL = new URLSearchParams(new URL(urlActual).search);
let idOferta = parametrosURL.get('id');

let nombreOferta = document.getElementById("nombre-detalle")
let precioOferta = document.getElementById("precio-detalle")
let descOferta = document.getElementById("desc-detalle")
let selectCategorias = document.getElementById("select-categorias-detalle")
let spanFechaPubl = document.getElementById("fecha-publ")

const obtenerOferta = async (id) => {
    const API_URL = `http://localhost:${port}/api/Oferta/${id}`;
    try {
        let data = await fetchApi2(API_URL, "GET");
        let categoryOffer = await ObtenerGenerico("Categoria", data.Categoria)
        document.getElementById("categoria-oferta").innerHTML = categoryOffer.Nombre
        document.getElementById("fecha-oferta").innerHTML = data.FechaPubl
        document.getElementById("nombre-oferta").innerHTML = data.Nombre
        document.getElementById("precio-oferta").innerHTML = data.Precio
        document.getElementById("desc-oferta").innerHTML = data.Descripcion

        let pais = data.Pais;
        let tdoc = data.Tdoc;
        let ndoc = data.Ndoc;
        const API_URL_PER = `http://localhost:${port}/api/Persona?Pais=${pais}&Tdoc=${tdoc}&Ndoc=${ndoc}`;
        try {
            let dataPersona = await fetchApi2(API_URL_PER, "GET");
            let paisPersona = dataPersona.Pais.toString().trim();
            let tdocPersona = dataPersona.Tdoc.toString().trim();
            let ndocPersona = dataPersona.Ndoc.trim();
            const CodCli = paisPersona+tdocPersona+ndocPersona
            document.getElementById("div-nombre-cliente").innerHTML = `
            <div class="font-bold"><a href="./detalle_usuario.html?cl=${CodCli}">${dataPersona.Nombre}</a></div>
            `

            let paisUsu = localStorage.getItem("pais");
            let tdocUsu = localStorage.getItem("tdoc");
            let ndocUsu = localStorage.getItem("ndoc");
            const CodUsu = paisUsu.trim()+tdocUsu.trim()+ndocUsu.trim()
            // SI la oferta ya se guardó, entonces dar error
            let oferta = await ObtenerOfertasGuardadas(CodUsu, id);

            if (oferta === null || !oferta === undefined){
                // El contador para que luego de tocar el boton, no tire exception de clave duplicada en el servidor
                let contadorClick = 0
                document.getElementById("btn-guardar-oferta").addEventListener("click", () => {
                    contadorClick += 1
                    if(contadorClick === 1) guardarOferta2(CodUsu, idOferta);
                })
            } 
            else
            {
                document.getElementById("btn-guardar-oferta").innerHTML = `<i class="fa-solid fa-bookmark"></i> Guardado`
                document.getElementById("btn-guardar-oferta").style.color = "gray"
                document.getElementById("btn-guardar-oferta").style.userSelect = "none"
                document.getElementById("btn-guardar-oferta").style.cursor = "default"
            }

        } catch (error) {
            console.error("Error:", error);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

const guardarOferta2 = async (CodUsu, IdOferta) => {

        const API_URL = `http://localhost:${port}/api/GuardarOferta`;
        let fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let datosFormulario = {
            "Codigo_Usu": CodUsu.trim(),
            "Id_Oferta": IdOferta,
            "Fecha_Guardado": fechaActual
        };

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
        })
        .catch(error => {
            console.error("Error al enviar el formulario:", error);
        });

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

const ObtenerOfertasGuardadas = async (CodUsu, IdOferta) => {
    const API_URL = `http://localhost:${port}/api/GuardarOferta?Codigo_Usu=${CodUsu}&Id_Oferta=${IdOferta}`;

    try {
        const response = await fetch(API_URL, { method: 'GET' });
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error(`Error al obtener oferta guardada:`, error);
        return null;
    }
};

obtenerOferta(idOferta);
