let rocket = {}

$("#submit").click(function(e){
    e.preventDefault()
    verificaEntrada()
})

function rocketLaunch(){
$.ajax({
    url: `https://api.nasa.gov/planetary/apod?api_key=fyRzg47S2e6heKGjqIqXpQm0Jde971ZrxMTQyAQW&&date=${$("#data").val()}`,
    success: function(result){
        rocket = result;
        rocketPackage()
    },
    error: function(erro){
        console.log(erro)
    }
})}

function rocketPackage(){
    $("h3, h2").css("display", "inline-block")
    $("#descricao").html(`${rocket.explanation}`)
    $("#descricao").css("padding", "0.5rem")
    
    if(rocket.media_type === "image"){
        $("#media").html(`<img class="tooltip" src=${rocket.url}>
        <span class="tooltiptext"><em> ${rocket.title}</em> </span> 
        `)
    }else if(rocket.media_type === "video"){
        $("#media").html(`<iframe src=${rocket.url}> </iframe><br><span> Título do Vídeo:<em> ${rocket.title} </em></span> `)
    }else{
        $("#media").html(`esta data não tem mídia associada.`)
    }

    try{
        if(rocket.copyright != undefined){
        $("#caption").html(`<em>copyright:${rocket.copyright}</em>`)
        }else{
            $("#caption").empty()
            throw new Error ("copyright não foi definida")
        }
    }catch(erro){
        console.log(erro)
    } 
}

function verificaEntrada(){
    if ($("#data").val() > "1995-06-16" && $("#data").val() <= new Date().toISOString().split("T")[0]){
        rocketLaunch()
    }else{
        $("#media").empty()
        $("#caption").empty()
        $("h2").css("display","none")
        $("h3").css("display","none")
        $("#descricao").html("Infelizmente sua requisição não pode ser atendida, a data de pesquisa deve ser entre 16/06/1995 e a data de hoje. pois ainda não temos a mídia de uma data futura e o projeto começou dia 16/06/1995");
        $("#descricao").css("padding", "1rem")
    }

}
