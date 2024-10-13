const url = 'http://127.0.0.1:5500/Frontend'
const port = 55939;

let paisLs = localStorage.getItem("pais");
let tdocLs = localStorage.getItem("tdoc");
let ndocLs = localStorage.getItem("ndoc");
let spanFechaHoy = document.getElementById("fecha-hoy");
spanFechaHoy.textContent = obtenerFecha();

const obtenerPersona = async (pais, tdoc, ndoc) => {
    const API_URL = `http://localhost:${port}/api/Persona?Pais=${pais}&Tdoc=${tdoc}&Ndoc=${ndoc}`;
    try {
        let data = await fetchApi(API_URL, "GET");
        let nombreCliente = document.getElementById("nombre-cliente");
        nombreCliente.textContent = data.Nombre;
        const API_URL_CL = `http://localhost:${port}/api/Cliente/${pais}/${tdoc}/${ndoc}`;
            try{
                let data = await fetchApi(API_URL_CL, "GET");
                // Cliente o Usuario
                let fotoInput = document.getElementById("logo-cli");
                fotoInput.src = data.FotoBase64 ? `data:image/jpeg;base64,${data.FotoBase64}` : 'ruta/por_defecto.jpg';
            }
            catch(error)
            {
                console.error("Error:", error);
            }
    } catch (error) {
        console.error("Error:", error);
    }
}

const obtenerCategorias = async () => {
    const API_URL = `http://localhost:${port}/api/Categoria`;
    try {
        let data = await fetchApi(API_URL, "GET");
        let selectCategorias = document.getElementById("select-categorias");
        selectCategorias.innerHTML += `
            <option selected disabled>Seleccionar</option>
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

const crearOferta = () => {
    const API_URL = `http://localhost:${port}/api/Oferta`;

    let pais = localStorage.getItem("pais");
    let tdoc = localStorage.getItem("tdoc");
    let ndoc = localStorage.getItem("ndoc");
    let nombreOferta = document.getElementById("nombreOferta").value;
    let categoriaOferta = document.getElementById("select-categorias").value;
    let descripcionOferta = document.getElementById("descOferta").value;
    let fotoOferta = document.getElementById("file-input-oferta").value;
    let precioOferta = document.getElementById("precioOferta").value;


    let datosFormulario = {
        Tipo_Oferta: 1, // Por ahora no se va a trabajar con este campo
        Pais: pais,
        Tdoc: tdoc,
        Ndoc: ndoc,
        Nombre: nombreOferta,
        Descripcion: descripcionOferta,
        Categoria: categoriaOferta,
        Foto: null,
        Precio: precioOferta,
        Estado: 1, // 1: Online, 2: Offline
        FechaPubl: '9/6/2024'
    }

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosFormulario)
    })
    .then(async response => {
        if (!response.ok) {
            throw new Error("Hubo un problema al enviar el formulario: " + response.status);
        }
    })
    .then(data => {
        console.log("Respuesta de la API:", data);
        // Aquí puedes hacer algo con la respuesta de la API, como redirigir a otra página
    })
    .catch(error => {
        console.error("Error al enviar el formulario:", error);
    });
}



const ofertaUpdatePhoto = async () => {
    // Obtengo último id de oferta (para saber cual es el que se creó)
    let UltimoId = 0;
    const API_URL_Gid = `http://localhost:${port}/api/Oferta/byIdDesc`;
    try {
        let data = await fetchApi(API_URL_Gid, "GET");
        UltimoId = data[0].Id;
    } catch (error) {
        console.error("Error:", error);
    }

    const API_URL = `http://localhost:${port}/api/Oferta/updatePhoto/${UltimoId+1}`;
    
    const fotoInput = document.getElementById('file-input-oferta');
    const formData = new FormData();

    if (fotoInput.files.length === 0) {
        alert("Por favor, selecciona una imagen.");
        return;
    }

    // Añade el archivo seleccionado al FormData
    formData.append('foto', fotoInput.files[0]);

    fetch(API_URL, {
        method: 'PUT',
        body: formData,
        headers: {
            // Si tu API requiere autenticación, añade el token aquí
            // 'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al actualizar la foto');
        return response.text(); // O response.json() si tu API devuelve JSON
    })
    .then(data => {

    })
    .catch(error => {

    });
}

function redireccionarAOfertas()
{
    setInterval(() => {
        window.location.href = `${url}/app/cliente/ofertas.html`;
    }, 1000);
}
function obtenerFecha() {
    var fechaActual = new Date();
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por eso sumamos 1
    var año = fechaActual.getFullYear();

    // Formatear el día y el mes para asegurarnos de tener dos dígitos
    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }

    var fechaFormateada = dia + '/' + mes + '/' + año;
    return fechaFormateada;
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

obtenerPersona(paisLs, tdocLs, ndocLs)
obtenerCategorias()

document.getElementById("btn-crear-oferta").addEventListener("click", async () => {
    await crearOferta();
    await ofertaUpdatePhoto();
    document.getElementById("btn-crear-oferta").textContent = 'Creando...'
    redireccionarAOfertas();
})
  
const fotoInput = document.getElementById('file-input-oferta');
const fotoPubli = document.getElementById('foto-publi');

fotoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            fotoPubli.src = e.target.result; // Actualiza la fuente de la imagen
        };
        
        reader.readAsDataURL(file); // Lee el archivo como URL de datos
    }
});
