// Componente que faz a foto aparecer ao olhar para o ponto por 1,5 segundos
AFRAME.registerComponent('abre-foto', {
  init: function () {
    const tela = document.querySelector('#tela-foto');
    
    this.el.addEventListener('click', () => {
      tela.setAttribute('visible', true);
    });
  }
});

// Componente para permitir arrastar a foto com o mouse
AFRAME.registerComponent('arrastavel', {
  init: function () {
    this.arrastando = false;
    const raycaster = document.querySelector('[camera] a-cursor').components.raycaster;

    // Quando o usuário clica e segura na foto
    this.el.addEventListener('mousedown', (evt) => {
      this.arrastando = true;
    });

    // Quando o usuário solta o clique do mouse
    window.addEventListener('mouseup', () => {
      this.arrastando = false;
    });

    // A cada frame, se estiver arrastando, move a foto para onde o mouse aponta
    this.el.sceneEl.addEventListener('tick', () => {
      if (!this.arrastando) return;

      // Pega a interseção atual do cursor/raycaster no espaço 3D
      const intersecao = raycaster.intersections[0];
      if (intersecao) {
        // Pega o ponto no espaço (X, Y, Z) para onde o mouse está apontando
        const ponto3D = intersecao.point;
        
        // Atualiza a posição da foto para esse ponto
        this.el.object3D.position.copy(ponto3D);
      }
    });
  }
});
