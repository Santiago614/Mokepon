const sectionSelecionarAtaque = document.getElementById("seleccionar-ataque");
const botonMascotaJugador = document.getElementById("boton-mascota");

const botonReiniciar = document.getElementById("reiniciar");

const sectionSelecionarMascota = document.getElementById("seleccionar-mascota");
const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");

const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");

const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById("contenedor-ataques");

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

let jugadorId = null,
  ataqueJugador = [],
  ataqueEnemigo = [],
  mokeponesEnemigos,
  opcionDeMokepones,
  ataquesMokeponEnemigo,
  vidasJugador = 3,
  vidasEnemigo = 3,
  mokepones = [],
  inputHipodoge,
  inputCapipepo,
  inputRatigueya,
  mascotaJugador,
  mascotaJugadorObjeto,
  botonTierra,
  botonFuego,
  botonAgua,
  botones = [],
  indexAtaqueJugador,
  indexAtaqueEnemigo,
  victoriasJugador = 0,
  victoriasEnemigo = 0,
  lienzo = mapa.getContext("2d"),
  intervalo,
  mapaBackground = new Image(),
  alturaQueBuscamos,
  anchoDelMapa = window.innerWidth - 50;
const anchoMaxMapa = 350;

if (anchoDelMapa > anchoMaxMapa) {
  anchoDelMapa = anchoMaxMapa;
}

alturaQueBuscamos = (anchoDelMapa * 600) / 800;

//Medidas del mapa
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

mapaBackground.src = "../mokepon/assets/img/mokemap.webp";
class Mokepon {
  constructor(nombre, foto, vida, fotoMapa, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let hipodoge = new Mokepon(
  "Hipodoge",
  "assets/img/mokepons_mokepon_hipodoge_attack.webp",
  3,
  "assets/img/hipodoge.webp"
);

let capipepo = new Mokepon(
  "Capipepo",
  "assets/img/mokepons_mokepon_capipepo_attack.webp",
  3,
  "assets/img/capipepo.webp"
);

let ratigueya = new Mokepon(
  "Ratigueya",
  "assets/img/mokepons_mokepon_ratigueya_attack.webp",
  3,
  "assets/img/ratigueya.webp"
);

//Push -> Insertar datos en el arreglo
const hipodoge_ataques = [
  { nombre: "🌊", id: "boton-agua" },
  { nombre: "🌊", id: "boton-agua" },
  { nombre: "🌊", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🎄", id: "boton-tierra" },
];

//Push -> Insertar datos en el arreglo
hipodoge.ataques.push(...hipodoge_ataques);

const capipepo_ataques = [
  { nombre: "🎄", id: "boton-tierra" },
  { nombre: "🎄", id: "boton-tierra" },
  { nombre: "🎄", id: "boton-tierra" },
  { nombre: "🌊", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
];

capipepo.ataques.push(...capipepo_ataques);

const ratigueya_ataques = [
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌊", id: "boton-agua" },
  { nombre: "🎄", id: "boton-tierra" },
];

ratigueya.ataques.push(...ratigueya_ataques);

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego(params) {
  sectionSelecionarAtaque.style.display = "none";
  sectionVerMapa.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}" />
        <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
          <p>${mokepon.nombre}</p>
          <img
          src="${mokepon.foto}"
          alt="${mokepon.nombre}"
          /> </label
        ><br />
    `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;
    inputHipodoge = document.getElementById("Hipodoge");
    inputCapipepo = document.getElementById("Capipepo");
    inputRatigueya = document.getElementById("Ratigueya");
  });

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

  botonReiniciar.addEventListener("click", reiniciarJuego);

  unirseAlJuego();
}

function unirseAlJuego(params) {
  fetch("http://localhost:8080/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
        jugadorId = respuesta;
      });
    }
  });
}

function seleccionarMascotaJugador() {
  sectionSelecionarMascota.style.display = "none";

  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else {
    alert("Selecciona una mascota para poder continuar.");
    location.reload();
  }

  seleccionarMokepon(mascotaJugador);

  extraerAtaques(mascotaJugador);
  sectionVerMapa.style.display = "flex";
  iniciarMapa();
}

function seleccionarMokepon(mascotaJugador) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mokepon: mascotaJugador,
    }),
  });
}

function extraerAtaques(mascotaJugador) {
  let ataques;
  mokepones.forEach((mokepon) => {
    if (mascotaJugador === mokepon.nombre) {
      ataques = mokepon.ataques;
    }
  });
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    opcionDeAtaque = `
    <button id="${ataque.id}" class="boton-de-ataque B-Ataque">${ataque.nombre}</button>
    `;
    contenedorAtaques.innerHTML += opcionDeAtaque;
  });
  botonTierra = document.getElementById("boton-tierra");
  botonFuego = document.getElementById("boton-fuego");
  botonAgua = document.getElementById("boton-agua");
  botones = document.querySelectorAll(".B-Ataque");
}

function secuenciaAtaque(params) {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        ataqueJugador.push("FUEGO");
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else if (e.target.textContent === "🌊") {
        ataqueJugador.push("AGUA");
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else {
        ataqueJugador.push("TIERRA");
        boton.style.background = "#112f58";
        boton.disabled = true;
      }
      ataqueAleatorioEnemigo();
    });
  });
}

function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

function ataqueAleatorioEnemigo(params) {
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("FUEGO");
  } else if (ataqueAleatorio == 2 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("AGUA");
  } else {
    ataqueEnemigo.push("TIERRA");
  }
  iniciarPelea();
}

function iniciarPelea(params) {
  if (ataqueJugador.length === 5) {
    combate();
    //crearMensaje();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
  for (let i = 0; i < ataqueJugador.length; i++) {
    if (ataqueJugador[i] === ataqueEnemigo[i]) {
      indexAmbosOponentes(i, i);
      crearMensaje("EMPATE");
    } else if (
      (ataqueJugador[i] == "FUEGO" && ataqueEnemigo[i] == "TIERRA") ||
      (ataqueJugador[i] == "AGUA" && ataqueEnemigo[i] == "FUEGO") ||
      (ataqueJugador[i] == "TIERRA" && ataqueEnemigo[i] == "AGUA")
    ) {
      indexAmbosOponentes(i, i);

      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(i, i);

      crearMensaje("PERDISTE");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
  }
  revisarVictorias();
}
function revisarVictorias(params) {
  if (victoriasJugador == victoriasEnemigo) {
    crearMensajeFinal("Esto fue un grandioso empate :)");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("Felicitaciones! Ganaste :)");
  } else {
    crearMensajeFinal("Lo siento, perdiste :(");
  }
}

function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML += indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML += indexAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
  //Revisar las vidas
  revisarVictorias();
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;

  botonReiniciar.style.display = "block";
}

function reiniciarJuego(params) {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas(params) {
  mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;

  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  mascotaJugadorObjeto.pintarMokepon();
  console.log(mascotaJugadorObjeto.x);
  console.log(mascotaJugadorObjeto.y);
  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

  mokeponesEnemigos.forEach(function (mokepon) {
    mokepon.pintarMokepon();
  });

  if (
    mascotaJugadorObjeto.velocidadX !== 0 ||
    mascotaJugadorObjeto.velocidadY !== 0
  ) {
    revisarColision(hipodogeEnemigo);
    revisarColision(capipepoEnemigo);
    revisarColision(ratigueyaEnemigo);
  }
}

function enviarPosicion(x, y) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x,
      y,
    }),
  }).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ enemigos }) {
        console.log(enemigos);
        mokeponesEnemigos = enemigos.map(function (enemigo) {
          let mokeponEnemigo = null;
          const mokeponNombre = enemigo.mokepon.nombre || "";
          //Enemigos
          if (mokeponNombre === "Hipodoge") {
            mokeponEnemigo = new Mokepon(
              "Hipodoge",
              "assets/img/mokepons_mokepon_hipodoge_attack.webp",
              3,
              "assets/img/hipodoge.webp"
            );
          } else if (mokeponNombre === "Capipepo") {
            mokeponEnemigo = new Mokepon(
              "Capipepo",
              "assets/img/mokepons_mokepon_capipepo_attack.webp",
              3,
              "assets/img/capipepo.webp"
            );
          } else {
            mokeponEnemigo = new Mokepon(
              "Ratigueya",
              "assets/img/mokepons_mokepon_ratigueya_attack.webp",
              3,
              "assets/img/ratigueya.webp"
            );
          }

          mokeponEnemigo.x = enemigo.x;
          mokeponEnemigo.y = enemigo.y;
          return mokeponEnemigo;
        });
      });
    }
  });
}

function moverDerecha(params) {
  mascotaJugadorObjeto.velocidadX = 5;
}

function moverIzquierda(params) {
  mascotaJugadorObjeto.velocidadX = -5;
}

function moverArriba(params) {
  mascotaJugadorObjeto.velocidadY = -5;
}

function moverAbajo(params) {
  mascotaJugadorObjeto.velocidadY = 5;
}

function detenerMovimiento(params) {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverArriba();
      break;
    case "ArrowDown":
      moverAbajo();
      break;
    case "ArrowLeft":
      moverIzquierda();
      break;
    case "ArrowRight":
      moverDerecha();
      break;

    default:
      break;
  }
}

function iniciarMapa(params) {
  mascotaJugadorObjeto = obtenerObjetoMascosta();

  intervalo = setInterval(pintarCanvas, 50);

  window.addEventListener("keydown", sePresionoUnaTecla);
  window.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMascosta() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const izquierdaMascota = mascotaJugadorObjeto.x;

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }
  detenerMovimiento();
  clearInterval(intervalo);
  sectionSelecionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = "none";
  seleccionarMascotaEnemigo(enemigo);
  // alert("Hay colisión " + enemigo.nombre);
}

//Llamar apenas cargue todo el html
window.addEventListener("load", iniciarJuego);
