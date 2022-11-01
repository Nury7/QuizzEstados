let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;

window.onload = function () {

  //carga el local storage
  estadosList = JSON.parse(localStorage.getItem('estados')) 
  console.log(estadosList);
  escogerPreguntaAleatoria();
};

//variables
let pregunta;
let posibles_respuestas;
btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4")
];
let npreguntas = [];

let preguntas_hechas = 0;
let preguntas_correctas = 0;
//La siguiente función devuelve el valor entero redondeado más bajo de la variable x:
function escogerPreguntaAleatoria() {
  let n;
  if (preguntas_aleatorias) {
    n = Math.floor(Math.random() * estadosList.length);
  } else {
    n = 0;
  }

  while (npreguntas.includes(n)) {
    n++;
    if (n >= estadosList.length) {
      n = 0;
    }
    if (npreguntas.length == estadosList.length && mostrar_pantalla_juego_términado) {
      //Aquí es donde el juego muesrtra una alerta y se reinicia
        swal.fire({
          title: "Juego finalizado",
          text:
            "Puntuación: " + preguntas_correctas + "/" + (preguntas_hechas ),
          icon: "success"
        });
      if (reiniciar_puntos_al_reiniciar_el_juego) {
        preguntas_correctas = 0
        preguntas_hechas = 0
      }
      npreguntas = [];
    }
  }
  npreguntas.push(n);
  preguntas_hechas++;

  escogerPregunta(n);
}

function escogerPregunta(n) {
  pregunta = estadosList[n];
  
  select_id("pregunta").innerHTML ='Cual es la cantidad de habitantes de: <br>'+ pregunta.nombre
  select_id("numero").innerHTML = n;
  let pc = preguntas_correctas;
  if (preguntas_hechas > 1) {
    select_id("puntaje").innerHTML ="Contestadas correctamente: " + pc + "/" + (preguntas_hechas - 1);
  } else {
    select_id("puntaje").innerHTML = "";
  }
  //como el contenido debe de ser mostrado  con objectFit redimenciona y se ajusta 
  
  desordenarRespuestas(pregunta);
  //si la pregunta tiene imagen
  
  
}




function desordenarRespuestas(pregunta) {
  habitantes = estadosList;
  aleatorio = Math.floor(Math.random()*habitantes.length);
  aleatorio2 = Math.floor(Math.random()*habitantes.length);
  aleatorio3 = Math.floor(Math.random()*habitantes.length);


 posibles_respuestas = [
   pregunta.habitantes,
   habitantes[aleatorio].habitantes,
   habitantes[aleatorio2].habitantes,
   habitantes[aleatorio3].habitantes
   
 ];



  //promesa
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

let suspender_botones = false;

function oprimir_btn(i) {
  if (suspender_botones) {
    return;
  }
  suspender_botones = true;
  //si el boton presionado es la respuesta correcta
  if (posibles_respuestas[i] == pregunta.habitantes) {
    preguntas_correctas++;
    btn_correspondiente[i].style.background = "lightgreen";
  } else {
    btn_correspondiente[i].style.background = "pink";
  }
  for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.habitantes) {
      btn_correspondiente[j].style.background = "lightgreen";
      break;
    }
  }
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 1000);
}


function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = "white";
  }
  escogerPreguntaAleatoria();
}

function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}


