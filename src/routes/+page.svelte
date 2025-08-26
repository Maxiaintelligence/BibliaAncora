<!-- src/routes/+page.svelte (versión actualizada) -->
<script>
  // Esta parte no cambia. Recibe los datos de la Biblia desde +page.js
  export let data;

  const antiguoTestamento = data.biblia.antiguo_testamento;
  const nuevoTestamento = data.biblia.nuevo_testamento;
</script>

<main class="contenedor-principal">
  <header class="encabezado-principal">
    <h1>Libro Pueblo de Dios</h1>
  </header>

  <div class="testamento">
    <h2 class="titulo-testamento">Antiguo Testamento</h2>
    {#each antiguoTestamento as clasificacion}
      <section class="clasificacion-grupo">
        <h3 class="titulo-clasificacion">{clasificacion.classification_name}</h3>
        <div class="grid-libros">
          {#each clasificacion.books as libro}
            
            <a href="/{libro.abbreviation}" class="libro-enlace">
            <div class="libro-boton">
            {libro.abbreviation}
            </div>
            </a>
         
          {/each}
        </div>
      </section>
    {/each}
  </div>

  <div class="testamento">
    <h2 class="titulo-testamento">Nuevo Testamento</h2>
    {#each nuevoTestamento as clasificacion}
      <section class="clasificacion-grupo">
        <h3 class="titulo-clasificacion">{clasificacion.classification_name}</h3>
        <div class="grid-libros">
          {#each clasificacion.books as libro}

            <a href="/{libro.abbreviation}" class="libro-enlace">
            <div class="libro-boton">
            {libro.abbreviation}
            </div>
            </a>

          {/each}
        </div>
      </section>
    {/each}
  </div>
</main>

<style>
  /* Ahora los estilos son específicos de esta página y usan las variables globales */
  .contenedor-principal {
    max-width: 900px;
    margin: 0 auto;
    padding: 1em;
  }

  .encabezado-principal {
    background-color: var(--color-primario);
    color: var(--color-primario-texto);
    padding: 1.5em;
    text-align: center;
    border-radius: 8px;
    margin-bottom: 2em;
  }

  .encabezado-principal h1 {
    margin: 0;
    font-size: 1.8rem;
  }

  .titulo-testamento {
    font-size: 1.5rem;
    border-bottom: 2px solid var(--color-borde-suave);
    padding-bottom: 0.3em;
    margin-bottom: 1em;
  }
  
  .clasificacion-grupo {
    margin-bottom: 2em;
  }

  .titulo-clasificacion {
    font-size: 1rem;
    font-weight: normal;
    color: #666;
    margin-bottom: 0.8em;
  }

  .grid-libros {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: 12px;
  }

  .libro-boton {
    padding: 1em 0.5em;
    border: 1px solid var(--color-borde-suave);
    background-color: var(--color-fondo);
    color: var(--color-texto);
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    font-size: 0.9rem;
    transition: background-color 0.2s, transform 0.2s;
  }

  .libro-boton:hover {
    background-color: var(--color-fondo-suave);
    transform: translateY(-2px);
  }

  .libro-enlace {
text-decoration: none; /* Quita el subrayado de los enlaces */
}
</style>