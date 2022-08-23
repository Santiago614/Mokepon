function iniciarJuego(params) {
  let botonMascotaJugador = document.getElementById("boton-mascota");
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
}
function seleccionarMascotaJugador() {
  let inputHipodoge = document.getElementById("hipodoge");
  let inputCapipepo = document.getElementById("capipepo");
  let inputRatigueya = document.getElementById("ratigueya");
  let inputLangostelvi = document.getElementById("langostelvi");
  let inputTucapalma = document.getElementById("tucapalma");
  let inputPydos = document.getElementById("pydos");
  if (inputHipodoge.checked) {
    
  } else if (inputCapipepo.checked) {
    alert("Seleccionaste capipepo");
  } else if (inputRatigueya.checked) {
    alert("Seleccionaste ratigueya");
  } else if (inputLangostelvi.checked) {
    alert("Seleccionaste langostelvi");
  } else if (inputTucapalma.checked) {
    alert("Seleccionaste tucapalma");
  } else if (inputPydos.checked) {
    alert("Seleccionaste pydos");
  }else {
    alert("Selecciona una mascota");
  }
}

//Llamar apenas cargue todo el html
window.addEventListener("load", iniciarJuego);
