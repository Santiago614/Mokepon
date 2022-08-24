let ataqueJugador,
  ataqueEnemigo,
  resultado,
  vidasJugador = 3,
  vidasEnemigo = 3;
function iniciarJuego(params) {
  let sectionSelecionarAtaque = document.getElementById("seleccionar-ataque");
  sectionSelecionarAtaque.style.display = "none";

  let botonMascotaJugador = document.getElementById("boton-mascota");
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

  let botonFuego = document.getElementById("boton-fuego");
  botonFuego.addEventListener("click", ataqueFuego);
  let botonAgua = document.getElementById("boton-agua");
  botonAgua.addEventListener("click", ataqueAgua);
  let botonTierra = document.getElementById("boton-tierra");
  botonTierra.addEventListener("click", ataqueTierra);

  let botonReiniciar = document.getElementById("boton-reiniciar");
  botonReiniciar.addEventListener("click", reiniciarJuego);
}
function seleccionarMascotaJugador() {
  let sectionSelecionarMascota = document.getElementById("seleccionar-mascota");
  sectionSelecionarMascota.style.display = "none";

  let sectionSelecionarAtaque = document.getElementById("seleccionar-ataque");
  sectionSelecionarAtaque.style.display = "block";

  let inputHipodoge = document.getElementById("hipodoge");
  let inputCapipepo = document.getElementById("capipepo");
  let inputRatigueya = document.getElementById("ratigueya");
  let inputLangostelvi = document.getElementById("langostelvi");
  let inputTucapalma = document.getElementById("tucapalma");
  let inputPydos = document.getElementById("pydos");
  let spanMascotaJugador = document.getElementById("mascota-jugador");
  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = "Hipodoge";
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = "Capipepo";
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = "Ratigueya";
  } else if (inputLangostelvi.checked) {
    spanMascotaJugador.innerHTML = "Langostelvi";
  } else if (inputTucapalma.checked) {
    spanMascotaJugador.innerHTML = "Tucapalma";
  } else if (inputPydos.checked) {
    spanMascotaJugador.innerHTML = "Pydos";
  } else {
    alert("Selecciona una mascota");
  }
  seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
  let mascoraAleatorio = aleatorio(1, 6);
  let spanMascotaEnemigo = document.getElementById("mascota-enemigo");
  if (mascoraAleatorio == 1) {
    spanMascotaEnemigo.innerHTML = "Hipodoge";
  } else if (mascoraAleatorio == 2) {
    spanMascotaEnemigo.innerHTML = "Capipepo";
  } else if (mascoraAleatorio == 3) {
    spanMascotaEnemigo.innerHTML = "Ratigueya";
  } else if (mascoraAleatorio == 4) {
    spanMascotaEnemigo.innerHTML = "Langostelvi";
  } else if (mascoraAleatorio == 5) {
    spanMascotaEnemigo.innerHTML = "Tucapalma";
  } else {
    spanMascotaEnemigo.innerHTML = "Pydos";
  }
}

function ataqueFuego(params) {
  ataqueJugador = "FUEGO";
  ataqueAleatorioEnemigo();
}
function ataqueAgua(params) {
  ataqueJugador = "AGUA";
  ataqueAleatorioEnemigo();
}
function ataqueTierra(params) {
  ataqueJugador = "TIERRA";
  ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo(params) {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "FUEGO";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "AGUA";
  } else {
    ataqueEnemigo = "TIERRA";
  }
  combate();
  crearMensaje();
}

function combate() {
  let spanVidasJugador = document.getElementById("vidas-jugador");
  let spanVidasEnemigo = document.getElementById("vidas-enemigo");

  if (ataqueEnemigo == ataqueJugador) {
    resultado = "EMPATE";
  } else if (
    (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") ||
    (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") ||
    (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA")
  ) {
    resultado = "GANASTE";
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else {
    resultado = "PERDISTE";
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
  }
}
function revisarVidas(params) {
  if (vidasEnemigo == 0) {
    crearMensajeFinal("Felicitaciones! Ganaste :)");
  } else if (vidasJugador == 0) {
    crearMensajeFinal("Lo siento, perdiste :(");
  }
}

function crearMensaje(params) {
  let sectionMensajes = document.getElementById("mensajes");

  let parrafo = document.createElement("p");
  parrafo.innerHTML =
    "Tu mascota atacó con " +
    ataqueJugador +
    ", la mascota del enemigo atacó con " +
    ataqueEnemigo +
    " - " +
    resultado;
  sectionMensajes.appendChild(parrafo);
  //Revisar las vidas
  revisarVidas();
}

function crearMensajeFinal(resultadoFinal) {
  let sectionMensajes = document.getElementById("mensajes");

  let parrafo = document.createElement("p");
  parrafo.innerHTML = resultadoFinal;
  sectionMensajes.appendChild(parrafo);

  let botonFuego = document.getElementById("boton-fuego");
  botonFuego.disabled = true;
  let botonAgua = document.getElementById("boton-agua");
  botonAgua.disabled = true;
  let botonTierra = document.getElementById("boton-tierra");
  botonTierra.disabled = true;

  let botonReiniciar = document.getElementById("reiniciar");
  botonReiniciar.style.display = "block";
}

function reiniciarJuego(params) {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Llamar apenas cargue todo el html
window.addEventListener("load", iniciarJuego);
