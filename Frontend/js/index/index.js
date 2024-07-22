$(document).ready(() => {
    $("#main-content").css({'opacity': '0', 'transition': '500ms all'})
    $("#text-compra").css({'opacity': '0', 'transition': '500ms all'})
    $("#text-vende").css({'opacity': '0', 'transition': '500ms all'})
    $("#text-ps").css({'opacity': '0', 'transition': '500ms all'})
    setInterval(() => {
        $("#main-content").css({'opacity': '100'})
        setInterval(() => {
            $("#text-compra").css({'opacity': '100'})
        }, 500);
        setInterval(() => {
            $("#text-vende").css({'opacity': '100'})
        }, 1000);
        setInterval(() => {
            $("#text-ps").css({'opacity': '100'})
        }, 1500);
    }, 500);
})
