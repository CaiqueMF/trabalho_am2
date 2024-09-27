<script>
    import {auth} from '../../firebase'

    export let idImagem = ''; // Defina a prop para receber o ID
    let urlImagem = '';
    let naoAchouImagem = false;
    let mensagemErro = '';
  
    // Função para verificar se a imagem existe
    const checarImagemExiste = async () => {
      try {
        const res = await fetch(`/images/${idImagem}.jpg`);
        if (res.ok) {
          urlImagem = res.url;
          naoAchouImagem = false;
        } else {
          naoAchouImagem = true;
        }
      } catch (error) {
        naoAchouImagem = true;
      }
    };
  
    const jogarImagem = async (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', idImagem);
  
        try {
          const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
          });
          const result = await response.json();
  
          if (result.success) {
            urlImagem = result.urlImagem;
            naoAchouImagem = false;
          } else {
            checarImagemExiste()
        }
        } catch (error) {
          mensagemErro = 'Erro ao fazer upload da imagem.';
        }
      } else {
        mensagemErro = 'Por favor, envie um arquivo de imagem válido.';
      }
    };
  
    const handleDragOver = (event) => {
      event.preventDefault();
    };
  
    const deletarImagem = async () => {
    const formData = new FormData();
    formData.append('id', idImagem);

    try {
      const response = await fetch('/delete', {
        method: 'POST',
        body: formData,  // Use FormData aqui
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          urlImagem = '';
          naoAchouImagem = true;

        } else {
          mensagemErro = result.error;
        }
      } 
    } catch (error) {
      console.log('Erro ao excluir a imagem.');
    }
    checarImagemExiste()
  };

    $: if (idImagem) {
      checarImagemExiste();
    }
  </script>
  
  {#if naoAchouImagem && auth.currentUser}
  <div
  on:drop={jogarImagem}
  on:dragover={handleDragOver}
  class="soltar-imagem"
  role="button"
  aria-label="Área para arrastar e soltar uma imagem"
  tabindex="0">
  <p>Arraste e solte uma imagem aqui</p>
  {#if mensagemErro}
    <p class="error">{mensagemErro}</p>
  {/if}
</div>
    {:else}
    <div class="container">
        <div class="display-imagem">
            <img src={urlImagem} alt="Produto sem Imagem" />
            {#if auth.currentUser}
              <button class="botao-deletar" on:click={deletarImagem}>Excluir</button>
            {/if}
          </div>
    </div> 
  {/if}


  <style>
    .container {
        position: relative;
    }
    .display-imagem {
        position: relative;
    }
    .soltar-imagem {
      border: 2px dashed #ccc;
      padding: 20px;
      text-align: center;
      color: #666;
      cursor: pointer;
    }
  
    .display-imagem img {
      max-width: 100%;
      height: auto;
      max-height: 350px;
    }
  
    .error {
      color: red;
    }

    .botao-deletar {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #ff007f;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    opacity: 0.3;
    transition: opacity 0.2s ease;
    font-family: 'Special Elite', sans-serif;
    font-weight: bold;
    font-size: 35px;
    

  }

  .botao-deletar:hover {
    opacity: 1;
  }
  </style>
  