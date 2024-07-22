const port = 55939;
const url = 'http://127.0.0.1:5500'

let urlActual = window.location.href;
let parametrosURL = new URLSearchParams(new URL(urlActual).search);
let clienteParam = parametrosURL.get('cl');

let paisParam = clienteParam.substring(0,1);
let tdocParam = clienteParam.substring(1,2);
let ndocParam = clienteParam.substring(2);

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
        document.getElementById("telefono-cl").innerHTML = data.Telefono
        document.getElementById("telefono-aux-cl").innerHTML = data.Telefono_aux
        document.getElementById("email-cl").innerHTML = data.Email
        document.getElementById("domicilio-cl").innerHTML = data.Domicilio
        document.getElementById("tdomicilio-cl").innerHTML = data.Tipo_Domicilio
        const API_URL_CL = `http://localhost:${port}/api/Cliente?Pais=${pais}&Tdoc=${tdoc}&Ndoc=${ndoc}`;
        try {
            let dataCl = await fetchApi2(API_URL_CL, "GET");
            document.getElementById("presentacion-cl").innerHTML = dataCl.Presentacion
            let fechaAlt = obtenerFecha(paisParam, tdocParam, ndocParam);
            fechaAlt.then((fecha) => {
                document.getElementById("fecha-desde-cl").innerHTML = fecha
            })
            
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