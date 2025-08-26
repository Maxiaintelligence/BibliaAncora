// src/routes/[libroId]/+page.js

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  // 'params' contiene los parámetros dinámicos de la URL.
  // En nuestro caso, params.libroId será "Gn", "Ex", etc.
  const idDelLibro = params.libroId;

  // Usamos el id para construir la ruta al archivo JSON correcto.
  const response = await fetch(`/data/${idDelLibro}.json`);
  const datosDelLibro = await response.json();

  // Pasamos los datos del libro a nuestro componente visual.
  return {
    libro: datosDelLibro
  };
}