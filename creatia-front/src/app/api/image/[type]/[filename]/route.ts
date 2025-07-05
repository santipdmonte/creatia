import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string; filename: string } }
) {
  try {
    const { type, filename } = params;
    
    // Mapear los tipos a las rutas correctas
    const typeToPath: Record<string, string> = {
      'avatars': '../backend/resources_content/avatars',
      'elements': '../backend/resources_content/elements',
      'images': '../backend/images', 
      'templates': '../backend/resources_content/templates'
    };

    const folderPath = typeToPath[type];
    if (!folderPath) {
      return new NextResponse('Tipo de recurso no válido', { status: 400 });
    }

    // Decodificar el nombre del archivo
    const decodedFilename = decodeURIComponent(filename);
    
    // Construir la ruta completa del archivo
    const filePath = join(process.cwd(), folderPath, decodedFilename);
    
    // Leer el archivo
    const fileBuffer = await readFile(filePath);
    
    // Determinar el tipo de contenido basado en la extensión
    const ext = decodedFilename.toLowerCase().split('.').pop();
    let contentType = 'image/jpeg'; // default
    
    switch (ext) {
      case 'png':
        contentType = 'image/png';
        break;
      case 'webp':
        contentType = 'image/webp';
        break;
      case 'gif':
        contentType = 'image/gif';
        break;
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg';
        break;
    }

    // Retornar la imagen con los headers apropiados
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
    
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Imagen no encontrada', { status: 404 });
  }
} 