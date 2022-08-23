function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function seleccion(anfitrion, num) {
  switch (num) {
    case 1:
      return alert(anfitrion + " 🥌");
    case 2:
      return alert(anfitrion + "📰");
    case 3:
      return alert(anfitrion + "\u{2702}");

    default:
      return alert("Opción no válida!");
  }
}
function batalla(player1, machine) {
  if (player1 == machine) {
    return ["EMPATE", "0"];
  } else if (
    (player1 == 1 && machine == 3) ||
    (player1 == 2 && machine == 1) ||
    (player1 == 3 && machine == 2)
  ) {
    return ["GANASTE :)", "1"];
  } else {
    return ["PERDISTE :(", "2"];
  }
}
// 1 para piedra, 2 para papel, 3 para tijera
let jugador = 0;
// Math.... -> Generación de número aleatorio
let pc = 0;
let triunfos = 0;
let perdidas = 0;
while (triunfos < 3 && perdidas < 3) {
  pc = aleatorio(1, 3);
  jugador = parseInt(
    prompt("Elige: 1 para piedra, 2 para papel, 3 para tijera")
  );
  // COMBATE
  seleccion("Elegiste: ", jugador);
  seleccion("PC eligió: ", pc);
  let array = batalla(jugador, pc);
  alert(array[0]);
  if (array[1] == 1) {
    triunfos += 1;
  } else if (array[1] == 2) {
    perdidas += 1;
  }
}
alert("Ganaste: " + triunfos + " veces. Perdiste " + perdidas + " veces.");
