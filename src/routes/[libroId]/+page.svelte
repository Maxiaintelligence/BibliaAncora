<!-- src/routes/[libroId]/+page.svelte -->
<script>
  // Recibimos los datos del libro cargados por +page.js
  export let data;

  const libro = data.libro;
</script>

<main class="contenedor-principal">
  <header class="encabezado-libro">
    <!-- Botón para volver a la página de inicio -->
    <a href="/" class="boton-volver">&larr; Todos los Libros</a>
    <h1>{libro.book_full_name}</h1>
  </header>
  
  <section>
    <h2 class="titulo-seccion">Capítulos</h2>
    <div class="grid-capitulos">
      <!-- Iteramos sobre la lista de capítulos del libro -->
      {#each libro.chapters as capitulo}
        <a href="/{libro.abbreviation}/{capitulo.chapter_number}" class="capitulo-enlace">
        <div class="capitulo-boton">
        {capitulo.chapter_number}
        </div>
        </a>     
      {/each}
    </div>
  </section>
</main>

<style>
  .contenedor-principal {
    max-width: 900px;
    margin: 0 auto;
    padding: 1em;
  }

  .encabezado-libro {
    padding: 2em;
    margin-bottom: 2em;
    background-color: var(--color-fondo-suave);
    border-radius: 8px;
    text-align: center;
    position: relative;
  }

  .encabezado-libro h1 {
    margin: 0;
    font-size: 2rem;
    color: var(--color-primario);
  }

  .boton-volver {
    position: absolute;
    top: 1em;
    left: 1em;
    text-decoration: none;
    color: var(--color-texto);
    background-color: #fff;
    padding: 0.5em 1em;
    border-radius: 20px;
    border: 1px solid var(--color-borde-suave);
    font-size: 0.9em;
  }

  .titulo-seccion {
    font-size: 1.5rem;
    border-bottom: 2px solid var(--color-borde-suave);
    padding-bottom: 0.3em;
    margin-bottom: 1em;
  }

  .grid-capitulos {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    gap: 12px;
  }

  .capitulo-boton {
    aspect-ratio: 1 / 1; /* Hace que los botones sean cuadrados */
    border: 1px solid var(--color-borde-suave);
    background-color: var(--color-fondo);
    color: var(--color-texto);
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: background-color 0.2s, transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .capitulo-boton:hover {
    background-color: var(--color-fondo-suave);
    transform: translateY(-2px);
  }
  .capitulo-enlace {
  text-decoration: none;
  color: inherit; /* Hereda el color del texto para que no se vea azul */
  }
</style>