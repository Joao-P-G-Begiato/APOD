let rocket = {}

$("#submit").click(function(e){
    e.preventDefault()
    rocketLaunch()
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
    if(rocket.media_type === "image"){
        $("#media").html(`<img class="tooltip" src=${rocket.url}>
        <span class="tooltiptext"><em> ${rocket.title}</em> </span> 
        `)
    }else{
        $("#media").html(`<iframe src=${rocket.url}> </iframe><br><span> Título do Vídeo:<em> ${rocket.title} </em></span> `)
        
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

