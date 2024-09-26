import fs from 'fs';
import { join } from 'path';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id'); // Obtém o ID do FormData

    if (!id) {
      return {
        success: false,
        error: 'ID da imagem ausente.'
      };
    }

    const filePath = join(process.cwd(), 'static/images', `${id}.jpg`);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Deleta o arquivo
        return {
          success: true,
          message: 'Imagem excluída com sucesso.'
        };
      } else {
        return {
          success: false,
          error: 'Imagem não encontrada.'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao excluir a imagem.'
      };
    }
  }
};
