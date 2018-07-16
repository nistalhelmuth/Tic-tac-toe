const matriz= [];
for (var i = 0; i<3; i++){
  matriz[i] = new Array(3);
}
const state = {
  positionsy: [0, 1, 2],
  positionsx: [0, 1, 2],
  currentPlayer: 0,
  numPlays:0,
  tableboard: matriz,
};
  
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

  lState.positionsy.forEach(function(posy) {
      
    const linea = document.createElement('div');
    linea.className = 'linea'; 
    tablero.appendChild(linea);

    lState.positionsx.forEach(function(posx) {

      const positionElement = document.createElement('div');
      positionElement.className = 'position'; 

      positionElement.addEventListener('click',function myOnclick() {
        if(!positionElement.classList.contains('circle') && !positionElement.classList.contains('cross')){

          lState.currentPlayer = (lState.currentPlayer + 1)% 2; 

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

          for (var i = 0; i<3; i++){
            let ganar = true;
            const jugador = lState.tableboard[i][0];
            for (var o = 1; o<3; o++){
              if (jugador != lState.tableboard[i][o] || jugador == undefined) {
                ganar=false;
              }
            }; 

            if (ganar ){
              finalizado(jugador);
              ganar=false;
            }
            
          };

          for (var i = 0; i<3; i++) {
            let ganar = true;
            const jugador = lState.tableboard[0][i];
            for (var o = 1; o<3; o++){
              if (jugador != lState.tableboard[o][i] || jugador == undefined) {
                ganar=false;
              }
            }; 

            if (ganar){
              finalizado(jugador);
              ganar=false;
            }
          }

          let ganar = true;
          let jugador = lState.tableboard[0][0];
          for (var i = 1; i<3; i++){
            if (jugador != lState.tableboard[i][i] || jugador == undefined) {
                ganar=false;
              }
          }
          
          if (ganar){
            finalizado(jugador);
            ganar=false;
          };

          ganar = true;
          jugador = lState.tableboard[0][2];
          for (var i = 1; i<3; i++){
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
        if (lState.numPlays>8){
          finalizado(-1);
        }

      });

      linea.appendChild(positionElement);
    })
  })

}
  
render(state);
  