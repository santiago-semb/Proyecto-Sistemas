const port = 55939;

$("#btn-guardar-perfil").hide();

let paisLs = localStorage.getItem("pais");
let tdocLs = localStorage.getItem("tdoc");
let ndocLs = localStorage.getItem("ndoc");
let TipoPersona = localStorage.getItem("tipo");
let RolPersona = localStorage.getItem("rol");

const obtenerPersona = async (pais, tdoc, ndoc) => {
    const API_URL = `http://localhost:${port}/api/Persona?Pais=${pais}&Tdoc=${tdoc}&Ndoc=${ndoc}`;
    try {
        let data = await fetchApi(API_URL, "GET");
        //let TipoPersona = data.Tipo;
        //let RolPersona = data.Rol;
        document.getElementById("unauthorized").style.display = 'none';
        if(RolPersona === "2") // 1: Usuario, 2: Cliente
        {
            if(TipoPersona === 'F')
            {
                document.getElementById("div-personas-juridicas").style.display = 'none';
            }
            else if(TipoPersona === 'J')
            {
                document.getElementById("div-personas-fisicas").style.display = 'none';
            }
            else
            {
                document.querySelector("body").style.display = 'none';
                document.getElementById("body").innerHTML += '<p>Error al encontrar tipo persona</p>'
            }
            // Persona
            let paisOption = document.getElementById("opcion-pais-perfil");
            let tdocOption = document.getElementById("opcion-tdoc-perfil");
            let ndocInput = document.getElementById("ndoc-perfil");
            let tipoOption = document.getElementById("opcion-tipo");
            let nombreInput = document.getElementById("input-nombre");
            let rolOption = document.getElementById("opcion-rol");
            let provinciaOption = document.getElementById("opcion-provincia");
            let localidadOption = document.getElementById("opcion-localidad");
            let barrioOption = document.getElementById("opcion-barrio");
            let tipodomOption = document.getElementById("opcion-tipodom")
            let domicilioInput = document.getElementById("domicilio-input");
            let telefonoInput = document.getElementById("telefono-input");
            let telefonoAuxInput = document.getElementById("telefono_aux-input");
            let emailInput = document.getElementById("email-input");
            paisOption.value = data.Pais; // Valor Id
            ObtenerGenerico("Pais", paisOption.value).then(res => {
                paisOption.textContent = `${res.Nombre} (${res.ISO3})`
            }).catch(err => console.log(err));
            tdocOption.value = data.Tdoc; // Valor Id
            ObtenerGenerico("TipoDocumento", tdocOption.value).then(res => {
                tdocOption.textContent = `${res.Nombre}`
            }).catch(err => console.log(err));
            ndocInput.value = data.Ndoc.trim();

            tipoOption.value = data.Tipo; // Valor Id

            nombreInput.value = data.Nombre.trim();
            rolOption.value = data.Rol; // Valor Id
            ObtenerGenerico("Rol", rolOption.value).then(res => {
                rolOption.textContent = `${res.Nombre.toUpperCase()}`
            }).catch(err => console.log(err));
            provinciaOption.value = data.Provincia; // Valor Id
            ObtenerGenerico("Provincia", provinciaOption.value).then(res => {
                provinciaOption.textContent = `${res.Nombre}`
            }).catch(err => console.log(err));
            localidadOption.value = data.Localidad, // Valor Id
            ObtenerGenerico("Localidad", localidadOption.value).then(res => {
                localidadOption.textContent = `${res.Nombre}`
            }).catch(err => console.log(err));
            barrioOption.value = data.Barrio // Valor Id
            ObtenerGenerico("Barrio", barrioOption.value).then(res => {
                barrioOption.textContent = `${res.Nombre}`
            }).catch(err => console.log(err));
            tipodomOption.value = data.Tipo_Domicilio; // Valor Id
            ObtenerGenerico("TipoDomicilio", tipodomOption.value).then(res => {
                tipodomOption.textContent = `${res.Nombre}`
            }).catch(err => console.log(err));
            domicilioInput.value = data.Domicilio.trim();
            telefonoInput.value = data.Telefono.trim();
            telefonoAuxInput.value = data.Telefono_aux.trim();
            emailInput.value = data.Email.trim();

            if(TipoPersona === "F")
            {
                tipoOption.textContent = "Física";
                const API_URL_PF = `http://localhost:${port}/api/PF?Pais=${pais}&Tdoc=${tdoc}&Ndoc=${ndoc}`;
                try{
                    let data = await fetchApi(API_URL_PF, "GET");
                    // Persona Fisica
                    let nom1Input = document.getElementById("nom1-input");
                    let nom2Input = document.getElementById("nom2-input");
                    let ape1Input = document.getElementById("ape1-input");
                    let ape2Input = document.getElementById("ape2-input");
                    let fecNacInput = document.getElementById("fecNac-input");
                    let sexoOption = document.getElementById("opcion-sexo");
                    nom1Input.value = data.Nom1;
                    nom2Input.value = data.Nom2;
                    ape1Input.value = data.Ape1;
                    ape2Input.value = data.Ape2;
                    fecNacInput.value = data.FecNac;
                    sexoOption.textContent = data.Sexo;
                    CargarPaises();
                    CargarTdoc();
                    CargarProvincias();
                    CargarLocalidades();
                    CargarBarrios();
                    CargarTipoDomicilio();
                }
                catch(error)
                {
                    console.error("Error:", error);
                }
            }
            else if(TipoPersona === "J")
            {
                tipoOption.textContent = "Jurídica";

                const API_URL_PJ = `http://localhost:${port}/api/PJ?Pais=${pais}&Tdoc=${tdoc}&Ndoc=${ndoc}`;
                try{
                    let data = await fetchApi(API_URL_PJ, "GET");
                    // Persona Juridica
                    let razsocInput = document.getElementById("razsoc-input");
                    let tipoentOption = document.getElementById("tipoent-option");
                    let pagwebInput = document.getElementById("pagWeb-input");
                    razsocInput.value = data.RazSoc;
                    tipoentOption.value = data.TipoEnt
                    ObtenerGenerico("TipoEntidad", tipoentOption.value).then(res => {
                        tipoentOption.textContent = `${res.Nombre}`
                        CargarTipoEntidad();
                    }).catch(err => console.log(err));
                    pagwebInput.value = data.PagWeb;
                    
                }
                catch(error)
                {
                    console.error("Error:", error);
                }      
            }
            else
            {
                console.error("La variable 'TipoPersona' tiene un valor inválido.")
            }

            const API_URL_CL = `http://localhost:${port}/api/Cliente/${pais}/${tdoc}/${ndoc}`;
            try{
                let data = await fetchApi(API_URL_CL, "GET");
                // Cliente o Usuario
                let fotoInput = document.getElementById("foto-input");
                let descripcionTextarea = document.getElementById("presentacion-textarea");
                //fotoInput.value = data.Foto;
                descripcionTextarea.value = data.Presentacion;
            }
            catch(error)
            {
                console.error("Error:", error);
            }
        }
        else
        {
            document.getElementById("main-content").style.display = 'none';
            document.getElementById("unauthorized").style.display = 'block';
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

const actualizarPersona = (pais, tdoc, ndoc) => {
    personaUpdate(pais, tdoc, ndoc);
    pjUpdate(pais, tdoc, ndoc);
    clienteUpdate(pais, tdoc, ndoc);
}

const personaUpdate = (pais, tdoc, ndoc) => {
    const API_URL = `http://localhost:${port}/api/Persona?Pais=${pais}&Tdoc=${tdoc}&Ndoc=${ndoc}`;
    let tipoDePersona = document.getElementById("tipo").value;
    let nombrePersona = document.getElementById("input-nombre").value;
    let rolDePersona = document.getElementById("select-rol").value;
    let provincia = document.getElementById("provincia").value; //
    let localidad = document.getElementById("localidad").value; //
    let barrio = document.getElementById("barrio").value; //
    let tipodom = document.getElementById("tipo_domicilio").value; //
    let dom = document.getElementById("domicilio-input").value;
    let tfno = document.getElementById("telefono-input").value;
    let tfno_aux = document.getElementById("telefono_aux-input").value;
    let email = document.getElementById("email-input").value;

    let datosFormularioPersona = {
        "Tipo": tipoDePersona,
        "Nombre": nombrePersona,
        "rol": rolDePersona,
        "Provincia": provincia,
        "Localidad": localidad,
        "Barrio": barrio,
        "Tipo_Domicilio": tipodom,
        "Domicilio": dom,
        "Telefono": tfno,
        "Telefono_aux": tfno_aux,
        "Email": email
      }


    fetch(API_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosFormularioPersona)
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

const pjUpdate = (pais, tdoc, ndoc) => {
    const API_URL = `http://localhost:${port}/api/PJ?Pais=${pais}&Tdoc=${tdoc}&Ndoc=${ndoc}`;

    let razsoc = document.getElementById("razsoc-input").value;
    let tipoent = document.getElementById("tent").value;
    let pagweb = document.getElementById("pagWeb-input").value;
    
    let datosFormulario = {
        "RazSoc": razsoc,
        "TipoEnt": tipoent,
        "PagWeb": pagweb
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
        console.error("Error al enviar el formulario pj:", error);
    });

}

const clienteUpdate = (pais, tdoc, ndoc) => {
    const API_URL = `http://localhost:${port}/api/Cliente?Pais=${pais}&Tdoc=${tdoc}&Ndoc=${ndoc}`;
    
    let presentacion = document.getElementById("presentacion-textarea").value;

    let datosFormulario = {
        "Foto": null,
        "Presentacion": presentacion,
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
        console.error("Error al enviar el formulario cliente:", error);
    });

}

function CargarPaises()
{
    const API_URL = `http://localhost:${port}/api/pais`;

fetch(API_URL, {method: 'GET'})
.then(response => response.json())
.then(data => {
    let selectPaises = document.getElementById("pais-perfil");
    selectPaises.innerHTML += `<option value="" disabled selected>Seleccione...</option>`
    data.forEach(pais => {
        selectPaises.innerHTML += `
            <option value="${pais.Codigo}">${pais.Nombre} (${pais.ISO3})</option>
        `
    });
})
.catch(error => {
    console.error("Error paises:", error);
});
}

function CargarTdoc()
{
    const API_URL = `http://localhost:${port}/api/tipoDocumento`;

    fetch(API_URL, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        let select = document.getElementById("tdoc-perfil");
        select.innerHTML += `<option value="" disabled selected>Seleccione...</option>`
        data.forEach(e => {
            select.innerHTML += `
            <option value="${e.Id}">${e.Nombre}</option>
            `
        });
    })
    .catch(error => {
        console.error("Error paises:", error);
    });
}

function CargarProvincias()
{
    const API_URL = `http://localhost:${port}/api/provincia`;

    fetch(API_URL, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        let select = document.getElementById("provincia");
        select.innerHTML += `<option value="" disabled selected>Seleccione...</option>`
        data.forEach(e => {
            select.innerHTML += `
                <option value="${e.Codigo}">${e.Nombre}</option>
            `
        });
    })
    .catch(error => {
        console.error("Error paises:", error);
    });
}

function CargarLocalidades()
{
    const API_URL = `http://localhost:${port}/api/localidad`;

    fetch(API_URL, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        let select = document.getElementById("localidad");
        select.innerHTML += `<option value="" disabled selected>Seleccione...</option>`
        data.forEach(e => {
            select.innerHTML += `
                <option value="${e.Codigo}">${e.Nombre}</option>
            `
        });
    })
    .catch(error => {
        console.error("Error paises:", error);
    });
}

function CargarBarrios()
{
    const API_URL = `http://localhost:${port}/api/barrio`;

    fetch(API_URL, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        let select = document.getElementById("barrio");
        select.innerHTML += `<option value="" disabled selected>Seleccione...</option>`
        data.forEach(e => {
            select.innerHTML += `
                <option value="${e.Codigo}">${e.Nombre}</option>
            `
        });
    })
    .catch(error => {
        console.error("Error paises:", error);
    });
}

function CargarTipoDomicilio()
{
    const API_URL = `http://localhost:${port}/api/tipoDomicilio`;

    fetch(API_URL, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        let select = document.getElementById("tipo_domicilio");
        select.innerHTML += `<option value="" disabled selected>Seleccione...</option>`
        data.forEach(e => {
            select.innerHTML += `
                <option value="${e.Id}">${e.Nombre}</option>
            `
        });
    })
    .catch(error => {
        console.error("Error paises:", error);
    });
}

function CargarTipoEntidad()
{
    const API_URL = `http://localhost:${port}/api/tipoEntidad`;

    fetch(API_URL, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        let select = document.getElementById("tent");
        //select.innerHTML += `<option value="" disabled selected>Seleccione...</option>`
        let option = document.getElementById("tipoent-option");
        data.forEach(e => {
            if(e.Id != parseInt(option.value))
            {
                select.innerHTML += `
                    <option value="${e.Id}">${e.Nombre}</option>
                `
            }
        });
    })
    .catch(error => {
        console.error("Error paises:", error);
    });
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

document.getElementById("btn-guardar-perfil").addEventListener("click", () => {
    actualizarPersona(paisLs, tdocLs, ndocLs);
})

obtenerPersona(paisLs, tdocLs, ndocLs);
