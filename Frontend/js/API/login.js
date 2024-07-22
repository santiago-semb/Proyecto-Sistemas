const port = 55939
const url = 'http://127.0.0.1:5500/Frontend'

let errLogin = document.getElementById("err-login");
errLogin.style.display = 'none';

const validarCredenciales = async (user, password) => {
    const API_URL = `http://localhost:${port}/api/Credenciales?user=${user}&password=${password}`;
    try {
        let data = await fetchApi(API_URL, "GET");
        if(data === null)
        {
            errLogin.style.display = 'block'
        }
        else
        {
            errLogin.style.display = 'none'
            let paisLogin = data.Pais;
            let tdocLogin = data.Tdoc;
            let ndocLogin = data.Ndoc;
            let tipoPersona = data.Tipo;

            const API_URL_per = `http://localhost:${port}/api/Persona?Pais=${paisLogin}&Tdoc=${tdocLogin}&Ndoc=${ndocLogin}`;
            let dataPersona = await fetchApi(API_URL_per, "GET");

            if(dataPersona != null)
            {                  
                let rolPersona = dataPersona.Rol;
                localStorage.setItem("pais", paisLogin);
                localStorage.setItem("tdoc", tdocLogin);
                localStorage.setItem("ndoc", ndocLogin);
                localStorage.setItem("tipo", dataPersona.Tipo);
                localStorage.setItem("rol", rolPersona);

                if(rolPersona === 2) // 1: Usuario, 2: Cliente
                {
                    redirigirUsuCli("cliente")
                }
                else if(rolPersona === 1)
                {
                    redirigirUsuCli("usuario")
                }
                else
                {
                    console.error("Error al obtener rol de persona")
                }
            }
            else
            {
                console.error("Error al obtener persona");
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

const redirigirUsuCli = (usucli) => {
    let nuevaUrl = `${url}/app/${usucli}/ofertas.html`;
    window.location.replace(nuevaUrl);
}

document.getElementById("btn-iniciar-sesion").addEventListener("click", async () => {
    document.getElementById("btn-iniciar-sesion").textContent = 'Validando...'
    setInterval(() => {
        document.getElementById("btn-iniciar-sesion").textContent = 'Confirmar'
    }, 100);
    let user_form = document.getElementById("usuario_login").value;
    let password_form = document.getElementById("contrasenia_login").value;
    await validarCredenciales(user_form, password_form);
})
