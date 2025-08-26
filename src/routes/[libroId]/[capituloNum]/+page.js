// src/routes/[libroId]/[capituloNum]/+page.js (VERSIÓN FINAL VERIFICADA)

import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  const libroId = params.libroId;
  const capituloNum = parseInt(params.capituloNum, 10);

  const response = await fetch(`/data/${libroId}.json`);
  
  if (!response.ok) {
    throw error(404, 'Libro no encontrado');
  }

  const datosDelLibro = await response.json();
  const totalCapitulos = datosDelLibro.chapters.length;
  
  if (!datosDelLibro.chapters || capituloNum <= 0 || capituloNum > totalCapitulos) {
    throw error(404, 'Capítulo no encontrado');
  }
  
  const datosDelCapitulo = datosDelLibro.chapters[capituloNum - 1];

  if (!datosDelCapitulo) {
    throw error(404, 'Capítulo no encontrado');
  }

  return {
    nombreLibro: datosDelLibro.book_full_name,
    idLibro: libroId,
    capitulo: datosDelCapitulo,
    totalCapitulos: totalCapitulos,
    numeroCapituloActual: capituloNum,
  };
}