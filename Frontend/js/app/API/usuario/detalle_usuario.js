
const port = 55939;
const url = 'http://127.0.0.1:5500'

let urlActual = window.location.href;
let parametrosURL = new URLSearchParams(new URL(urlActual).search);
let clienteParam = parametrosURL.get('cl');

let paisParam = clienteParam.substring(0,1);
let tdocParam = clienteParam.substring(1,2);
let ndocParam = clienteParam.substring(2);

document.getElementById("chat-with-client").href = `./chat.html?ch=${paisParam}${tdocParam}${ndocParam}`

const obtenerPersona = async (pais, tdoc, ndoc) => {
    const API_URL_PER = `http://localhost:${port}/api/Persona?Pais=${pais}&Tdoc=${tdoc}&Ndoc=${ndoc}`;
    try {
        let data = await fetchApi2(API_URL_PER, "GET");
        document.getElementById("nombre-cl").innerHTML = data.Nombre
        document.getElementById("tdoc-cl").innerHTML = data.Tdoc
        document.getElementById("ndoc-cl").innerHTML = data.Ndoc
        document.getElementById("pais-cl").innerHTML = data.Pais
        document.getElementById("provincia-cl").innerHTML = data.Provincia
        document.getElementById("localidad-cl").innerHTML = data.Localidad
        document.getElementById("barrio-cl").innerHTML = data.Barrio
        document.getElementById("telefono-cl").innerHTML = data.Telefono
        document.getElementById("telefono-aux-cl").innerHTML = data.Telefono_aux
        document.getElementById("email-cl").innerHTML = data.Email
        document.getElementById("domicilio-cl").innerHTML = data.Domicilio
        document.getElementById("tdomicilio-cl").innerHTML = data.Tipo_Domicilio
        let tipoPersona = data.Tipo;
        console.log(tipoPersona)
        if(tipoPersona === "J")
        {
            const API_URL_PJ = `http://localhost:${port}/api/PJ?Pais=${pais}&Tdoc=${tdoc}&Ndoc=${ndoc}`;
            try {
                let dataPj = await fetchApi2(API_URL_PJ, "GET");
                console.log(dataPj)
                document.getElementById("web-page-client").href = dataPj.PagWeb;
            } catch (error) {
                console.error("Error:", error);
            }
        }
        else
        {
            document.getElementById("web-page-client").style.display = 'none';
        }
        const API_URL_CL = `http://localhost:${port}/api/Cliente/${pais}/${tdoc}/${ndoc}`;
        try {
            let dataCl = await fetchApi2(API_URL_CL, "GET");
            document.getElementById("presentacion-cl").innerHTML = dataCl.Presentacion
            let fechaAlt = obtenerFecha(paisParam, tdocParam, ndocParam);
            fechaAlt.then((fecha) => {
                document.getElementById("fecha-desde-cl").innerHTML = fecha;
            })
            ObtenerGenerico("TipoDocumento", data.Tdoc).then(res => {
                document.getElementById("tdoc-cl").innerHTML = res.Nombre
            }).catch(err => console.log(err));
            ObtenerGenerico("Pais", data.Pais).then(res => {
                document.getElementById("pais-cl").innerHTML = res.Nombre
            }).catch(err => console.log(err));
            ObtenerGenerico("Provincia", data.Provincia).then(res => {
                document.getElementById("provincia-cl").innerHTML = res.Nombre
            }).catch(err => console.log(err));
            ObtenerGenerico("Localidad", data.Localidad).then(res => {
                document.getElementById("localidad-cl").innerHTML = res.Nombre
            }).catch(err => console.log(err));
            ObtenerGenerico("Barrio", data.Barrio).then(res => {
                document.getElementById("barrio-cl").innerHTML = res.Nombre
            }).catch(err => console.log(err));
            ObtenerGenerico("Localidad", data.Localidad).then(res => {
                document.getElementById("localidad-cl").innerHTML = res.Nombre
            }).catch(err => console.log(err));
            
        } catch (error) {
            console.error("Error:", error);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

const obtenerFecha = async (pais, tdoc, ndoc) => {
    const API_URL = `http://localhost:${port}/api/Credenciales?id1=${pais}&id2=${tdoc}&id3=${ndoc}`;
    try {
        let data = await fetchApi2(API_URL, "GET");
        return data.FecAlt
    } catch (error) {
        console.error("Error:", error);
    }
}

const ObtenerGenerico = async (queObtener, id) => {
    const API_URL = `http://localhost:${port}/api/${queObtener}/${id}`;

    try {
        const response = await fetch(API_URL, { method: 'GET' });
        const data = await response.json();
        let res;
        (queObtener === "TipoDocumento" || queObtener === "TipoDomicilio" || queObtener === "Rol" || queObtener === "TipoEntidad" || queObtener === "Provincia" || queObtener === "Localidad" || queObtener === "Barrio" || queObtener === "Pais") ? res = data : res = data[0];
        
        return res;
    } catch (error) {
        console.error(`Error al obtener ${queObtener}:`, error);
        return null;
    }
};

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

obtenerPersona(paisParam, tdocParam, ndocParam)