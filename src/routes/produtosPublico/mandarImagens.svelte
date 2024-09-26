<script>
    import {auth} from '../../firebase'

    export let imageId = ''; // Defina a prop para receber o ID
    let imageUrl = '';
    let imageNotFound = false;
    let errorMessage = '';
  
    // Função para verificar se a imagem existe
    const checkImageExists = async () => {
      try {
        const res = await fetch(`/images/${imageId}.jpg`);
        if (res.ok) {
          imageUrl = res.url;
          imageNotFound = false;
        } else {
          imageNotFound = true;
        }
      } catch (error) {
        imageNotFound = true;
      }
    };
  
    const handleDrop = async (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', imageId);
  
        try {
          const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
          });
          const result = await response.json();
  
          if (result.success) {
            imageUrl = result.imageUrl;
            imageNotFound = false;
          } else {
            checkImageExists()
        }
        } catch (error) {
          errorMessage = 'Erro ao fazer upload da imagem.';
        }
      } else {
        errorMessage = 'Por favor, envie um arquivo de imagem válido.';
      }
    };
  
    const handleDragOver = (event) => {
      event.preventDefault();
    };
  
    const handleDelete = async () => {
    const formData = new FormData();
    formData.append('id', imageId);

    try {
      const response = await fetch('/delete', {
        method: 'POST',
        body: formData,  // Use FormData aqui
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          imageUrl = '';
          imageNotFound = true;

        } else {
          errorMessage = result.error;
        }
      } 
    } catch (error) {
      console.log('Erro ao excluir a imagem.');
    }
    checkImageExists()
  };

    $: if (imageId) {
      checkImageExists();
    }
  </script>
  
  {#if imageNotFound && auth.currentUser}
  <div
  on:drop={handleDrop}
  on:dragover={handleDragOver}
  class="dropzone"
  role="button"
  aria-label="Área para arrastar e soltar uma imagem"
  tabindex="0">
  <p>Arraste e solte uma imagem aqui para o ID: {imageId}</p>
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
</div>
  {:else}
    <div class="image-display">
      <img src={imageUrl} alt="Produto sem Imagem" />
      {#if auth.currentUser}
        <button class="delete-btn" on:click={handleDelete}>Excluir</button>
      {/if}
    </div>
  {/if}
  
  <style>
    .dropzone {
      border: 2px dashed #ccc;
      padding: 20px;
      text-align: center;
      color: #666;
      cursor: pointer;
    }
  
    .image-display img {
      max-width: 100%;
      height: auto;
    }
  
    .error {
      color: red;
    }
  </style>
  