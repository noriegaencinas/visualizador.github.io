/* Agregar los cuadros que necesita el tablero */
document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("chessboard");
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  
    for (let row = 8; row >= 1; row--) {
      for (let col = 0; col < 8; col++) {
        const square = document.createElement("div");
        const id = letters[col] + row;
        square.id = id;
        square.classList.add("square");
        if ((row + col) % 2 === 0) {
          square.classList.add("black");
        } else {
          square.classList.add("white");
        }
        board.appendChild(square);
      }
    }
    colocar_piezas();
});

/* Establece a las piezas en su posición inicial y limpia todo */
function colocar_piezas() {
  const squares = document.querySelectorAll(".square");
  squares.forEach(function(square) {    
    if (square.style.backgroundImage) {      
      square.style.backgroundImage = "";
    }
  });
  for (let col = 0; col < 8; col++) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const white_id = letters[col] + 2;
    document.getElementById(white_id).style.backgroundImage = 'url(img/PeonB.png)';
    const black_id = letters[col] + 7;    
    document.getElementById(black_id).style.backgroundImage = 'url(img/PeonN.png)';
  }
  document.getElementById('a1').style.backgroundImage = 'url(img/TorreB.png)';
  document.getElementById('b1').style.backgroundImage = 'url(img/CaballoB.png)';
  document.getElementById('c1').style.backgroundImage = 'url(img/AlfilB.png)';
  document.getElementById('d1').style.backgroundImage = 'url(img/ReinaB.png)';
  document.getElementById('e1').style.backgroundImage = 'url(img/ReyB.png)';
  document.getElementById('f1').style.backgroundImage = 'url(img/AlfilB.png)';
  document.getElementById('g1').style.backgroundImage = 'url(img/CaballoB.png)';
  document.getElementById('h1').style.backgroundImage = 'url(img/TorreB.png)';

  document.getElementById('a8').style.backgroundImage = 'url(img/TorreN.png)';
  document.getElementById('b8').style.backgroundImage = 'url(img/CaballoN.png)';
  document.getElementById('c8').style.backgroundImage = 'url(img/AlfilN.png)';
  document.getElementById('d8').style.backgroundImage = 'url(img/ReinaN.png)';
  document.getElementById('e8').style.backgroundImage = 'url(img/ReyN.png)';
  document.getElementById('f8').style.backgroundImage = 'url(img/AlfilN.png)';
  document.getElementById('g8').style.backgroundImage = 'url(img/CaballoN.png)';
  document.getElementById('h8').style.backgroundImage = 'url(img/TorreN.png)';
}

function limpiarTablero() {
  const squares = document.querySelectorAll(".square"); // Obtener todos los cuadros
  squares.forEach(function(square) {
    square.style.backgroundImage = "none";
  }); 
}

// permite seleccionar de las partidas prestablecidas en el programa
function seleccionar_partida() {
  limpiarTablero();
  colocar_piezas();
  var ta = document.getElementById("movimientos");
  var selected_item = document.getElementById("select_partida").value;

  let file_path = "";
  var parrafo = document.getElementById("flag_visual");
  switch (selected_item) {
    case "0":
      file_path = "files/empty.txt";
      parrafo.setAttribute("disabled", true);
      break;
    case "1":
      file_path = "files/partida1.txt";
      break;
    case "2":
      file_path = "files/partida2.txt";
      break;
    case "3":
      file_path = "files/partida3.txt";
      break;
    default:
      alert("algo malo paso");
      break;
  }

  var xhr  = new XMLHttpRequest();
  xhr.open('GET', file_path, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      ta.value = xhr.responseText; // Aquí puedes trabajar con el contenido del archivo
    }
  };
  xhr.send();
}

//botón reiniciar todo
function boton_reiniciar() { //medioflojera
  limpiarTablero();
  colocar_piezas();
  //limpia el elemento si se subio por el usuario
  document.getElementById("cargarBoton").value = ""; // Establecer el valor del input a una cadena vacía
  //reinicia el numero de jugadas
  num_jugada = 0;
}


var num_jugada = 0;
// permite visualizar el partido de ajedrez paso a paso
function boton_pasos() {    
  //determina de quien fue el turno con operador ternario
  let turno = (num_jugada + 1) % 2 == 0 ? 'negras' : 'blancas';
  
  //definimos la jugada que estamos realizando en esta pasada
  let jugadas = remover_numeros_conid("movimientos");
  lista_jugadas = jugadas.split(/\s+|\n+/); //se dividen las jugadas una por una
  jugada_actual = lista_jugadas[num_jugada];

  //obtenemos la celda final de cualquier jugada
  celda_final = jugada_actual;
  celda_final = obtener_celda_final(celda_final);  // no funciona cuando son promociones | quita mayusculas, x, +, # y letra extra cuando peon captura

  
  //contexto de captura ejemplo exd5
  if (jugada_actual.includes('x')) {
    let algo = jugada_actual.split('x');
    let detalles_inicio = algo[0];
    let detalles_final = algo[1];
  }  

  let pieza_actual = "";

  // estas son jugadas muy especificas
  if (jugada_actual == 'O-O-O'){ //para el lado de la dama
    pieza_actual = "enroque largo";
    if (turno == 'blancas') {
      mover_pieza('e1','c1'); //se mueve rey
      mover_pieza('h1','f1'); //se mueve torre
    }
    if (turno == 'negras'){
      mover_pieza('e8','c8'); //se mueve rey
      mover_pieza('a8','d8'); //se mueve torre
    }    
  }

  // estas son jugadas muy especificas
  if (jugada_actual == 'O-O'){ //para el lado del rey
    pieza_actual = "enroque corto";
    if (turno == 'blancas') {
      mover_pieza('e1','g1'); //se mueve rey
      mover_pieza('h1','f1'); //se mueve torre
    }
    if (turno == 'negras'){
      mover_pieza('e8','g8'); //se mueve rey
      mover_pieza('h8','f8'); //se mueve torre
    } 
  }

  if (noEmpiezaConMayuscula(jugada_actual)) { // es una jugada de peon
    pieza_actual = "Peón";
    let columna = celda_final[0];
    let fila = celda_final[1];

    if (jugada_actual.includes('x')) {
      let algo = jugada_actual.split('x');
      columna = algo[0];      
    }  

    let celda_inicial;
    if (turno == 'blancas'){
      for (let i = fila; i >= 1; i--) {      
        celda_inicial = columna + i; //i es la fila en este caso                
        if (compararFondoDeImagen(celda_inicial,'url(/img/PeonB.png)')) {
          mover_pieza(celda_inicial, celda_final);
        }
      }   
    }
    else{
      for (let index = parseInt(fila); index <= 8; index++) {
        celda_inicial = columna + index;
        if (compararFondoDeImagen(celda_inicial,'url(/img/PeonN.png)')) {
          mover_pieza(celda_inicial, celda_final);
        }
      }   
    }
  }

  if (jugada_actual.startsWith('B')){
    pieza_actual = "Alfil";
    if (turno == 'blancas'){   
    }
    else{ // turno negras  
      
    }

  }

  if (jugada_actual.startsWith('N')){ // Nf3 Nc6 |  Nxf7
    pieza_actual = "Caballo";
    if (turno == 'blancas'){   
    }
    else{ // turno negras  
      
    }
  }

  if (jugada_actual.startsWith('R')){
    pieza_actual = "Torre";
    if (turno == 'blancas'){   
    }
    else{ // turno negras  
      
    }
  }

  if (jugada_actual.startsWith('Q')){
    pieza_actual = "Dama";
    if (turno == 'blancas'){   
    }
    else{ // turno negras  
      
    }
  }

  if (jugada_actual.startsWith('K')){    
    pieza_actual = "Rey";
    if (turno == 'blancas'){   
    }
    else{ // turno negras  
      
    }
    

  }

  if (jugada_actual.startsWith('K')){
    pieza_actual = "Rey";
  }

  //mover_pieza('a2','a4');  

  //Testing
  prueba = document.getElementById("paraPruebas");
  num_jugada = num_jugada + 1; //para mejor vision
  prueba.textContent = "Jugada #" + num_jugada + " " + lista_jugadas[num_jugada-1] + " <> " + pieza_actual + " " + turno + " Se mueve a " + celda_final;
}

function recorrerCuadros() {
  const squares = document.querySelectorAll(".square"); // Obtener todos los cuadros
  
  // Recorrer cada cuadro
  squares.forEach(function(square) {
    // Realizar alguna acción en cada cuadro
    console.log("Cuadro ID:", square.id);
    console.log("Clases:", square.classList);
    // Agregar más acciones aquí según sea necesario
  });
}

function obtener_celda_final(texto) {
  // Utilizar una expresión regular para eliminar las mayúsculas, 'x', '+', y '#'  
  let texto_fin = "";
  texto_fin = texto.replace(/[A-Zx+#]/g, "");
  if (texto_fin.length > 2){
    texto_fin = texto_fin.substring(texto_fin.length - 2);
  }
  return texto_fin;
}

function limpiar_jugada(texto) {
  // Utilizar una expresión regular para eliminar las mayúsculas, 'x', '+', y '#'  
  return texto_fin = texto.replace(/[A-Zx+#]/g, "");
}

function quitarMayusculas(palabra) {
  return palabra.replace(/[A-Z]/g, "");
}

function noEmpiezaConMayuscula(variable) {
  // Utilizar una expresión regular para verificar si la primera letra no es una mayúscula
  return /^[^A-Z]/.test(variable);
}

function removerNumeros(cadena) {
  // Utilizar una expresión regular para reemplazar todos los números con una cadena vacía
  return cadena.replace(/\d/g, "");
}

// ayuda a limpiar la notación de ajedrez removiendo numero de sus jugadas ejemplo 1. e4 e4 -> e4 e5
function remover_numeros_conid(id) {
  let texto = document.getElementById(id).value.replace(/\d+\.\s*/g, "");  
  return texto;
}

function compararFondoDeImagen(idElemento, urlImagen) {  

  var idElemento = document.getElementById(idElemento);

  if (!idElemento) {
    console.error("El elemento con el ID " + idElemento + " no existe.");
    return false;
  }

  // Obtener el valor de la propiedad 'background-image' del estilo computado del elemento
  var backgroundImageValue = window.getComputedStyle(idElemento).getPropertyValue('background-image');

  backgroundImageValue = backgroundImageValue.replace(/^url\("http:\/\/\d+\.\d+\.\d+\.\d+:3000/, 'url("'); // Elimina la parte de la IP

  return urlImagen == backgroundImageValue;
}

//introduciendo el id de un square permite mover la pieza hacia otro id tambien proveido
function mover_pieza(from_id, to_id){
  const element = document.getElementById(from_id);
  const computedStyle = window.getComputedStyle(element);
  const backgroundImage = computedStyle.getPropertyValue('background-image');
  
  document.getElementById(to_id).style.backgroundImage = backgroundImage;
  element.style.backgroundImage = 'none';
}


// botón para visualizar la partida de ajedrez completa con un delay especifico
function boton_completar() {
  remover_numeros();

}

// permite agregar una partida desde la computadora del usuario
function cargarPartida() {
  var archivo = document.getElementById("cargarBoton").files[0];
  var scanner = new FileReader();

  scanner.onload = function (e) {
    document.getElementById("movimientos").value = e.target.result;
    /*document.getElementById("texto").value = document.getElementById("cargarBoton").files;*/
  };
  scanner.readAsText(archivo);  
}

//da detalles de las reglas de ajedrez
function reglas() {
  alert(`Notación de piezas:

    Rey: K
    Reina: Q
    Torre: R
    Alfil: B
    Caballo: N
    Peón: no se indica ninguna letra (por ejemplo, e4)
    Notación de columnas:
    
    Las columnas se indican con letras de la "a" a la "h". La columna más a la izquierda es la "a" y la columna más a la derecha es la "h".
    Notación de filas:
    
    Las filas se indican con números del 1 al 8. El lado de las blancas está en las filas 1 y 2, mientras que el lado de las negras está en las filas 7 y 8.
    Notación de movimientos:
    
    Se utiliza la notación abreviada de la pieza seguida de la casilla a la que se mueve. Por ejemplo, Re4 significa que el Rey se mueve a la casilla e4.
    Capturas:
    
    Cuando una pieza captura a otra, se utiliza "x" para indicar la captura. Por ejemplo, Bxe4 significa que el Alfil captura en la casilla e4.
    Enroque:
    
    El enroque corto se indica con O-O y el enroque largo se indica con O-O-O.
    Peones:
    
    Cuando un peón avanza sin capturar, solo se indica la casilla de destino. Por ejemplo, e4 significa que el peón se mueve a e4.
    Promoción de peones:
    
    Cuando un peón alcanza la octava fila, se promociona a otra pieza (generalmente una reina). La promoción se indica agregando la letra de la pieza deseada después del movimiento del peón. Por ejemplo, e8=Q significa que el peón en e8 se promociona a una reina.
    Jaque:
    
    Se indica con el símbolo "+" al final del movimiento. Por ejemplo, Nf7+ significa que el Caballo ha dado jaque.
    Jaque mate:
    
    Se indica con el símbolo "#" al final del movimiento. Por ejemplo, Qh8# significa que la Reina ha dado jaque mate.`);
}