const state = {
    positionsy: [0, 1, 2],
    positionsx: [0, 1, 2],
    currentPlayer: 0,
    tablero: [[0,0,0],[0,0,0],[0,0,0]]
  };
  
  const render = lState => {
    const title = document.createElement('h1');
    title.innerHTML = 'SEMAFORO';
  
    const tablero = document.createElement('div');
    tablero.className = 'tablero';

    const turno = document.createElement('h3');
    turno.innerHTML = 'Turno del jugador 1';
  
    // Clear previous root content
    if (root.hasChildNodes()) {
      root.innerHTML = null;
    }
  
    // Main rendering
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
            positionElement.addEventListener('click',function () {
                if(!positionElement.classList.contains('circle') && !positionElement.classList.contains('cross')){
                    lState.currentPlayer = (lState.currentPlayer + 1)% 2; 
                    lState.turno.innerHTML = `Turno del jugador ${lState.currentPlayer}`;
                    if (lState.currentPlayer == 0) {
                        positionElement.classList.add('circle');
                    }else {
                        positionElement.classList.add('cross');
                    }
                    
                }else {
                    alert('Seleccione otra casilla');
                }
            });
            linea.appendChild(positionElement);

        })
    })
  
  }
  
  render(state);
  