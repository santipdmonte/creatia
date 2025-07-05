import { NextRequest, NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const { type } = params;
    
    // Mapear los tipos a las rutas correctas
    const typeToPath: Record<string, string> = {
      'avatars': '../backend/resources_content/avatars',
      'elements': '../backend/resources_content/elements', 
      'images': '../backend/images',
      'templates': '../backend/resources_content/templates'
    };

    const folderPath = typeToPath[type];
    if (!folderPath) {
      return NextResponse.json({ error: 'Tipo de recurso no válido' }, { status: 400 });
    }

    // Construir la ruta absoluta desde la raíz del proyecto
    const absolutePath = join(process.cwd(), folderPath);
    
    // Leer los archivos de la carpeta
    const files = await readdir(absolutePath);
    
    // Filtrar solo archivos de imagen
    const imageFiles = files.filter(file => {
      const ext = file.toLowerCase();
      return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || 
             ext.endsWith('.png') || ext.endsWith('.webp') || 
             ext.endsWith('.gif');
    });

    // Crear objetos con información de los archivos
    const fileList = imageFiles.map((file, index) => ({
      id: `${type}-${index + 1}`,
      name: file,
      url: `/api/image/${type}/${encodeURIComponent(file)}`,
      size: 'N/A', // Por ahora, luego podemos agregar el tamaño real
      uploadDate: new Date().toISOString().split('T')[0]
    }));

    return NextResponse.json(fileList);
  } catch (error) {
    console.error('Error reading directory:', error);
    return NextResponse.json(
      { error: 'Error al leer la carpeta de recursos' }, 
      { status: 500 }
    );
  }
} 