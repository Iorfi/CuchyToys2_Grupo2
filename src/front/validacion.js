console.log(window)
window.addEventListener("load",function(){
    let formulario = document.querySelector("form.registro")
    console.log(formulario)
    formulario.addEventListener("submit", function(e){
        e.preventDefault()
        let campoNombre = document.querySelector("input.AlmacenarNombre")
        if(campoNombre.value == ""){
            alert("el campo de nombre tiene que estar completo")
        }
    })
})