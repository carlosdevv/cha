import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route para buscar preview de links usando Open Graph
 * Isso permite mostrar uma prévia da imagem e informações do produto ao fazer hover
 */

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'URL é obrigatória' },
      { status: 400 }
    );
  }

  try {
    // Busca a página do produto
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)'
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar URL');
    }

    const html = await response.text();

    // Extrai os meta tags Open Graph
    const ogImage = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i)?.[1] ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:image["']/i)?.[1];
    
    const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i)?.[1] ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:title["']/i)?.[1];
    
    const ogDescription = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i)?.[1] ||
                         html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:description["']/i)?.[1];

    // Fallback para meta tags normais se não encontrar Open Graph
    const title = ogTitle || html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1];
    const description = ogDescription || html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1];

    return NextResponse.json({
      success: true,
      data: {
        title: title || 'Produto',
        description: description || '',
        image: ogImage || null,
        url
      }
    });

  } catch (error) {
    console.error('Erro ao buscar preview:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Não foi possível carregar o preview',
        data: null
      },
      { status: 200 } // Retorna 200 para não quebrar o fluxo do usuário
    );
  }
}

