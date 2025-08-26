// src/routes/+page.js

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  // Hacemos una petición 'fetch' para obtener nuestro archivo de índice.
  // SvelteKit es lo suficientemente inteligente como para acceder directamente al archivo en el servidor.
  const response = await fetch(`/data/books.json`);
  
  // Convertimos la respuesta en un objeto JSON
  const biblia = await response.json();

  // Lo que retornemos aquí estará disponible en '+page.svelte'
  return {
    biblia: biblia
  };
}