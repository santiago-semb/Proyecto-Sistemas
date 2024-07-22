document.getElementById("btn-continuar").addEventListener("click", () => {
    
    let user = document.getElementById("usuario").value;
    let con = document.getElementById("contraseña").value;

    let obj = {
        "Pais": ,
        "Tdoc": ,
        "Ndoc": ,
        "Usuario": user,
        "Contra": con,
        "Rol":
    }

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


    window.location.href = 'http://127.0.0.1:5500/alta-persona.html'
})