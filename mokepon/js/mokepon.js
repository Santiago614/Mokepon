const sectionSelecionarAtaque = document.getElementById("seleccionar-ataque");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonTierra = document.getElementById("boton-tierra");
const botonFuego = document.getElementById("boton-fuego");
const botonAgua = document.getElementById("boton-agua");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionSelecionarMascota = document.getElementById("seleccionar-mascota");
const inputHipodoge = document.getElementById("hipodoge");
const inputCapipepo = document.getElementById("capipepo");
const inputRatigueya = document.getElementById("ratigueya");
const inputLangostelvi = document.getElementById("langostelvi");
const inputTucapalma = document.getElementById("tucapalma");
const inputPydos = document.getElementById("pydos");
const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");

const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");

let ataqueJugador,
  ataqueEnemigo,
  resultado,
  vidasJugador = 3,
  vidasEnemigo = 3;

class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
  }
}

let hipodoge = new Mokepon(
  "Hipodoge",
  "assets/img/mokepons_mokepon_hipodoge_attack.webp",
  3
);

let capipepo = new Mokepon(
  "Capipepo",
  "assets/img/mokepons_mokepon_capipepo_attack.webp",
  3
);

let ratigueya = new Mokepon(
  "Ratigueya",
  "assets/img/mokepons_mokepon_ratigueya_attack.webp",
  3
);

function iniciarJuego(params) {
  sectionSelecionarAtaque.style.display = "none";
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  botonFuego.addEventListener("click", ataqueFuego);
  botonAgua.addEventListener("click", ataqueAgua);
  botonTierra.addEventListener("click", ataqueTierra);
  botonReiniciar.addEventListener("click", reiniciarJuego);
}
function seleccionarMascotaJugador() {
  sectionSelecionarMascota.style.display = "none";

  sectionSelecionarAtaque.style.display = "flex";

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
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
  //Revisar las vidas
  revisarVidas();
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;

  botonFuego.disabled = true;
  botonAgua.disabled = true;
  botonTierra.disabled = true;

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
