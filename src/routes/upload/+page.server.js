import fs from 'fs';
import { join } from 'path';

export const actions = {
    default: async ({ request }) => {
      const data = await request.formData();
      const file = data.get('file');
      const id = data.get('id');
  
      if (!file || !id) {
        return {
          success: false,
          error: 'File or ID is missing.'
        };
      }
  
      const uploadDir = join(process.cwd(), 'static/images');
      const filename = `${id}.jpg`;
  
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
  
      const filePath = join(uploadDir, filename);
      const buffer = Buffer.from(await file.arrayBuffer());
  
      try {
        fs.writeFileSync(filePath, buffer);
        return {
          success: true,
          urlImagem: `/images/${filename}`
        };
      } catch (error) {
        return {
          success: false,
          error: 'Erro ao fazer upload da imagem.'
        };
      }
    }
  };
