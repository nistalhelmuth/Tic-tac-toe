const matriz= [];
for (let i = 0; i<3; i++){
  matriz[i] = new Array(3);
}

//estados
const state = {
  positionsy: [0, 1, 2],
  positionsx: [0, 1, 2],
  currentPlayer: 0,
  numPlays:0,
  tableboard: matriz,
};
  
//Funcion despues de obtener un resultado
function finalizado(jugador) { 
  const nextBtn = document.createElement('button');
  nextBtn.className = 'nextBtn';
  nextBtn.innerHTML = 'Otra';

  root.appendChild(nextBtn);

  const turno = document.getElementsByClassName('turno');
  if (jugador != -1) {
    if (jugador == 0 ){
      turno[0].innerHTML = 'ha ganado circulo!';
    }else {
      turno[0].innerHTML = 'ha ganado cruz!';
    }
    
  } else {
    turno[0].innerHTML = `los jugadores han empatado`;
  }

  const pos = document.getElementsByClassName('position')
  Array.prototype.forEach.call(pos, function(pos){
    const nuevo = pos.cloneNode(true);
    nuevo.classList.add('pointer');
    pos.parentNode.replaceChild(nuevo, pos);
    
  });
  
  nextBtn.onclick = () => {
    location.reload();
  };
}

const render = lState => {
  //definicion de la estructura de la pagina
  const title = document.createElement('h1');
  title.innerHTML = 'Tic-tac-toe';

  const tablero = document.createElement('div');
  tablero.className = 'tablero';

  const turno = document.createElement('h3');
  turno.className = 'turno';
  turno.innerHTML = 'turno de: ';
  
  const turnoImg = document.createElement('div');
  turnoImg.className = 'position';
  turnoImg.classList.add('cross');

  turno.appendChild(turnoImg);

  if (root.hasChildNodes()) {
    root.innerHTML = null;
  }
  
  root.appendChild(title);
  root.appendChild(tablero);
  root.appendChild(turno);

  //por cada linea
  lState.positionsy.forEach(function(posy) {
      
    const linea = document.createElement('div');
    linea.className = 'linea'; 
    tablero.appendChild(linea);

    //por cada linea
    lState.positionsx.forEach(function(posx) {

      const positionElement = document.createElement('div');
      positionElement.className = 'position'; 

      //comportamiento para cada posicion al realizar click
      positionElement.addEventListener('click',function myOnclick() {
        if(!positionElement.classList.contains('circle') && !positionElement.classList.contains('cross')){

          lState.currentPlayer = (lState.currentPlayer + 1)% 2; 

          //pintar pieza
          if (lState.currentPlayer == 0) {
            positionElement.classList.add('circle');
            turnoImg.classList.remove('circle');
            turnoImg.classList.add('cross');
          }else {
            positionElement.classList.add('cross');
            turnoImg.classList.remove('cross');
            turnoImg.classList.add('circle');
          }

          lState.tableboard[posy][posx]=lState.currentPlayer;

          //verficacion horizontal
          for (let i = 0; i<3; i++){
            let ganar = true;
            const jugador = lState.tableboard[i][0];
            for (let o = 1; o<3; o++){
              if (jugador != lState.tableboard[i][o] || jugador == undefined) {
                ganar=false;
              }
            }; 

            if (ganar ){
              finalizado(jugador);
              ganar=false;
            }
            
          };

          //verficacion vertical
          for (let i = 0; i<3; i++) {
            let ganar = true;
            const jugador = lState.tableboard[0][i];
            for (let o = 1; o<3; o++){
              if (jugador != lState.tableboard[o][i] || jugador == undefined) {
                ganar=false;
              }
            }; 

            if (ganar){
              finalizado(jugador);
              ganar=false;
            }
          }

          //verficacion diagonal 1
          let ganar = true;
          let jugador = lState.tableboard[0][0];
          for (let i = 1; i<3; i++){
            if (jugador != lState.tableboard[i][i] || jugador == undefined) {
                ganar=false;
              }
          }
          
          if (ganar){
            finalizado(jugador);
            ganar=false;
          };

          //verficacion diagonal 2
          ganar = true;
          jugador = lState.tableboard[0][2];
          for (let i = 1; i<3; i++){
            if (jugador != lState.tableboard[i][2-i] || jugador == undefined) {
                ganar=false;
              }
          }
          
          if (ganar){
            finalizado(jugador);
            ganar=false;
          }

          lState.numPlays +=1;

        }else {
          alert('Seleccione otra casilla');
        }
        //empate
        if (lState.numPlays>8){
          finalizado(-1);
        }

      });
      linea.appendChild(positionElement);
    })
  })

}
  
render(state);
  