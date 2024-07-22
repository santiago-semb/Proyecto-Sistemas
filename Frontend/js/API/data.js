const port = 55939
const url = 'http://127.0.0.1:5500'

let uno = true;
let dosf = false;
let dosj = false;
let tres = false;

CargarPaises()
CargarTdoc()
CargarRoles()
CargarProvincias()
CargarLocalidades()
CargarBarrios()
CargarTipoDomicilio()

let pais_aux = 0;
let tdoc_aux = 0;
let ndoc_aux = "";
let nuevo_ndoc_aux;
let rol = "";
let nuevo_rol_aux;
let email_aux = "";

document.getElementById("btn-siguiente-inicio").addEventListener("click", () => {
    let selectRol = document.getElementById("rol")
    let index = selectRol.selectedIndex;
    let option = selectRol.options[index];
    rol = option.textContent

    let rolls = document.getElementById("rol").value
    let tipoperls = document.getElementById("tipo").value

    localStorage.setItem("rol-elegido", rolls);
    localStorage.setItem("tipo-persona", tipoperls);

    email_aux = document.getElementById("email").value

    CargarTipoEntidad()

    let select = document.getElementById("pais");
    let selectedIndex = select.selectedIndex;
    let selectedOption = select.options[selectedIndex];
    let pais = selectedOption.textContent;

    pais_aux = pais;
    pais_aux_cl_us = selectedIndex

    let select2 = document.getElementById("tdoc");
    let selectedIndex2 = select2.selectedIndex;
    let selectedOption2 = select2.options[selectedIndex2];
    let tdoc = selectedOption2.textContent;

    tdoc_aux = tdoc
    tdoc_aux_cl_us = selectedIndex2

    let ndoc = document.getElementById("ndoc").value

    ndoc_aux = ndoc

    if(document.getElementById("pais-2") != undefined && document.getElementById("tdoc-2") != undefined && document.getElementById("ndoc-2") != undefined)
    {
        document.getElementById("pais-2-cod").value = selectedIndex
        document.getElementById("tdoc-2-cod").value = selectedIndex2
        document.getElementById("pais-2").value = pais
        document.getElementById("tdoc-2").value = tdoc
        document.getElementById("ndoc-2").value = ndoc
    }

    if(document.getElementById("pais-3") != undefined && document.getElementById("tdoc-3") != undefined && document.getElementById("ndoc-3") != undefined)
    {
        document.getElementById("pais-3-cod").value = selectedIndex
        document.getElementById("tdoc-3-cod").value = selectedIndex2
        document.getElementById("pais-3").value = pais
        document.getElementById("tdoc-3").value = tdoc
        document.getElementById("ndoc-3").value = ndoc
    }


    
})




const EnviarFormulario = () =>
{
const API_URL = `http://localhost:${port}/api/persona`;

// Obtener los valores de los campos del formulario
let pais = document.getElementById("pais").value;
let tipoDocumento = document.getElementById("tdoc").value;
let numeroDocumento = document.getElementById("ndoc").value;
let tipoPersona = document.getElementById("tipo").value;
let nombre = document.getElementById("nombre").value;
let rol = document.getElementById("rol").value;
let provincia = document.getElementById("provincia").value;
let localidad = document.getElementById("localidad").value;
let barrio = document.getElementById("barrio").value;
let tipoDomicilio = document.getElementById("tipo_domicilio").value;
let domicilio = document.getElementById("domicilio").value;
let telefono = document.getElementById("telefono").value;
let telefonoAuxiliar = document.getElementById("telefono_aux").value;
let email = document.getElementById("email").value;
let fechaAlt = Date.now();

nuevo_ndoc_aux = numeroDocumento;
nuevo_rol_aux = rol;

let datosFormulario = {
    "Pais": pais,
    "Tdoc": tipoDocumento,
    "Ndoc": numeroDocumento,
    "Tipo": tipoPersona,
    "Nombre": nombre,
    "Rol": rol,
    "Provincia": provincia,
    "Localidad": localidad,
    "Barrio": barrio,
    "Tipo_Domicilio": tipoDomicilio,
    "Domicilio": domicilio,
    "Telefono": telefono,
    "Telefono_aux": telefonoAuxiliar,
    "Email": email
  };

  localStorage.setItem("pais", pais);
  localStorage.setItem("tdoc", tipoDocumento);
  localStorage.setItem("ndoc", numeroDocumento);
  localStorage.setItem("tipo", tipoPersona);
  localStorage.setItem("rol", rol);

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

function CargarPaises()
{
    const API_URL = `http://localhost:${port}/api/pais`;

fetch(API_URL, {method: 'GET'})
.then(response => response.json())
.then(data => {
    let selectPaises = document.getElementById("pais");
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
        let select = document.getElementById("tdoc");
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

function CargarRoles()
{
    const API_URL = `http://localhost:${port}/api/rol`;

    fetch(API_URL, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        let select = document.getElementById("rol");
        select.innerHTML += `<option value="" disabled selected>Seleccione...</option>`
        data.forEach(e => {
            let nombre = capitalizeFirstLetter(e.Nombre)
            select.innerHTML += `
                <option value="${e.Id}">${nombre}</option>
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

// ---------------------------------------

function CargarTipoEntidad()
{
    const API_URL = `http://localhost:${port}/api/tipoEntidad`;

    fetch(API_URL, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        let select = document.getElementById("tent");
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

function EnviarFormularioPJ()
{
    const API_URL = `http://localhost:${port}/api/PJ`;

// Obtener los valores de los campos del formulario
let pais = document.getElementById("pais-3-cod").value;
let tdoc = document.getElementById("tdoc-3-cod").value;
let ndoc = document.getElementById("ndoc-3").value;
let razsoc = document.getElementById("razsoc").value;
let tent = document.getElementById("tent").value;
let pag_web = document.getElementById("pagWeb").value;

// Construir un objeto con los datos del formulario
let datosFormulario = {
    "Pais": pais,
    "Tdoc": tdoc,
    "Ndoc": ndoc_aux,
    "RazSoc": razsoc,
    "TipoEnt": tent,
    "PagWeb": pag_web
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
    // Aquí puedes hacer algo con la respuesta de la API, como redirigir a otra página
})
.catch(error => {
    console.error("Error al enviar el formulario:", error);
});
}

function EnviarFormularioPF()
{
const API_URL = `http://localhost:${port}/api/PF`;

// Obtener los valores de los campos del formulario
let codPais = document.getElementById("pais-2-cod").value;
let codTdoc = document.getElementById("tdoc-2-cod").value;
let nom1 = document.getElementById("nom1").value;
let nom2 = document.getElementById("nom2").value;
let ape1 = document.getElementById("ape1").value;
let ape2 = document.getElementById("ape2").value;
let fecNac = document.getElementById("fecNac").value;
let sexo = document.getElementById("sexo").value;

let datosFormulario = {
    "Pais": codPais,
    "Tdoc": codTdoc,
    "Ndoc": ndoc_aux,
    "Nom1": nom1,
    "Nom2": nom2,
    "Ape1": ape1,
    "Ape2": ape2,
    "FecNac": "2024-05-20T17:29:01.8349027-03:00",
    "Sexo": sexo,
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
    // Aquí puedes hacer algo con la respuesta de la API, como redirigir a otra página
})
.catch(error => {
    console.error("Error al enviar el formulario:", error);
});
}

// ---------------------------------------

function EnviarFormularioCreden()
{
    const API_URL = `http://localhost:${port}/api/Credenciales`;
    let user = document.getElementById("nombre-usuario").value;
    let contra = document.getElementById("contrasenia").value;
    let ndoc = localStorage.getItem("ndoc");
    let datosFormulario = {
        "Pais": pais_aux_cl_us,
        "Tdoc": tdoc_aux_cl_us,
        "Ndoc": ndoc,
        "Usuario": user,
        "Contra": contra,
        "Email": email_aux,
        "FecAlt": "2024-06-05T19:42:50.7576633-03:00",
        "FecUltAcc": "2024-06-05T19:42:50.7576633-03:00",
        "FecUltMod": "2024-06-05T19:42:50.7576633-03:00",
        "Rol": nuevo_rol_aux
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
        // Aquí puedes hacer algo con la respuesta de la API, como redirigir a otra página
    })
    .catch(error => {
        console.error("Error al enviar el formulario:", error);
    });
}

function EnviarFormularioUsuCli()
{
    let cliente_o_usuario = (rol.trim() === "Usuario") ? 'Usuario' : 'Cliente';
    const API_URL = `http://localhost:${port}/api/${cliente_o_usuario}`;

    let fileInput = document.getElementById("foto");
    let fileName = ""
    // Verificar si se seleccionó un archivo
    if (fileInput.files.length > 0) {
        // Obtener el primer archivo seleccionado
        let file = fileInput.files[0];
        
        // Obtener el nombre del archivo
        fileName = file.name;
    }

    let presentacion = document.getElementById("presentacion").value;

    // Construir un objeto con los datos del formulario
    let datosFormulario = {
        "Pais": pais_aux_cl_us,
        "Tdoc": tdoc_aux_cl_us,
        "Ndoc": ndoc_aux,
        "FecAlt": "2024-06-05T19:42:50.7576633-03:00",
        "FecUltAcc": "2024-06-05T19:42:50.7576633-03:00",
        "Foto": fileName,
        "Presentacion": presentacion
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
        // Aquí puedes hacer algo con la respuesta de la API, como redirigir a otra página
    })
    .catch(error => {
        console.error("Error al enviar el formulario:", error);
    });
}

function RedirigirCliUs()
{
    let rolElegido = localStorage.getItem("rol-elegido");
    if(rolElegido === "1")
        {
            setInterval(() => {
                localStorage.removeItem("rol-elegido");
                window.location.href = `${url}/app/usuario/ofertas.html`; 
            }, 3000);
        }
        else if(rolElegido === "2")
        {
            setInterval(() => {
                localStorage.removeItem("rol-elegido");
                window.location.href = `${url}/app/cliente/ofertas.html`;
            }, 3000);
        }
        else
        {
            localStorage.removeItem("rol-elegido");
            // redirigir a pagina de inicio
            // informar error en la misma.
            setInterval(() => {
                window.location.href = url; 
            }, 3000);
        }
}

function EnviarData()
{
    let tipoPersona = localStorage.getItem("tipo-persona");
    EnviarFormulario();
    if(tipoPersona === "F"){EnviarFormularioPF()}else{EnviarFormularioPJ()};
    EnviarFormularioUsuCli();
    EnviarFormularioCreden();

    localStorage.removeItem("tipo-persona");

    RedirigirCliUs();
}

// ------------------------ OTROS --------------------------
function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}