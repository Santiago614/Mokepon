//Llama las librerias que trae npm
const express = require("express");
const cors = require("cors");

//Genera una instancia
const app = express();

app.use(cors());
app.use(express.json());

const jugadores = [];

class Jugador {
  constructor(id) {
    this.id = id;
  }
  asignarMokepon(mokepon) {
    this.mokepon = mokepon;
  }
  actualizarPosicion(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Mokepon {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

//Cuando reciba una petición en la raiz, entregue una respuesta
//Endpoint ->API
app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`;
  const jugador = new Jugador(id);

  jugadores.push(jugador);

  //Activar la configuración del sistema para que se vea en otro servidor
  res.setHeader("Access-Control-Allow-Origin", "*");

  //Enviar respuesta
  res.send(id);
});

app.post("/mokepon/:jugadorId", (req, res) => {
  //Accedo a la variable que se envio por URL
  const jugadorId = req.params.jugadorId || "";
  const nombre = req.body.mokepon || "";
  const mokepon = new Mokepon(nombre);

  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarMokepon(mokepon);
  }

  console.log(jugadores);
  console.log(jugadorId);
  res.end();
});

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
  const jugadorId = req.params.jugadorId || "";
  const x = req.body.x || 0;
  const y = req.body.y || 0;

  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y);
  }

  const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id);

  res.send({
    enemigos,
  });
});

app.listen(8080, () => {
  console.log("Servidor funcionando");
});
