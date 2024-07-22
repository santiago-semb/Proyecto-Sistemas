$(document).ready(() => {
    $("#div-registrarse").show()
    $("#div-inicio").hide()
    $("#div-personas-fisicas").hide()
    $("#div-personas-juridicas").hide()
    $("#div-cliente-usuario").hide()

    $("#btn-registrarse").click(() => {

    $("#div-registrarse").hide()
    $("#div-inicio").fadeIn(1000)

    })

    $("#btn-siguiente-inicio").click(() => {
        let tipoPersona = document.getElementById("tipo").value
        if(tipoPersona === 'F')
            {    
                $("#div-inicio").hide()
                $("#div-personas-fisicas").fadeIn(1000)
                
                $("#btn-siguiente-personas-fisicas").click(() => {
                    $("#div-personas-fisicas").hide()
                    $("#div-cliente-usuario").fadeIn(1000)
                })
            }
            else if(tipoPersona === 'J')
            {
                $("#div-inicio").hide()
                $("#div-personas-juridicas").fadeIn(1000)

                $("#btn-siguiente-personas-juridicas").click(() => {
                    $("#div-personas-juridicas").hide()
                    $("#div-cliente-usuario").fadeIn(1000)
                })
            }
            else
            {
                alert("Por favor seleccione tipo persona")
            }
        })

        $("#btn-finalizar").click(() => {
            $("#div-inicio").fadeOut(300)
            $("#div-personas-fisicas").fadeOut(300)
            $("#div-personas-juridicas").fadeOut(300)
            $("#div-cliente-usuario").fadeOut(300)
            $("#finalizado").fadeIn(1000)
        })

})
