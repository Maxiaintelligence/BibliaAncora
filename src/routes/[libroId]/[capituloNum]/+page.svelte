<script>
  export let data;

  $: ({ nombreLibro, idLibro, capitulo, totalCapitulos, numeroCapituloActual } = data);
  $: capituloAnterior = numeroCapituloActual - 1;
  $: capituloSiguiente = numeroCapituloActual + 1;
  $: mostrarAnterior = numeroCapituloActual > 1;
  $: mostrarSiguiente = numeroCapituloActual < totalCapitulos;

  let versiculosSeleccionados = new Set();
  function seleccionarVersiculo(numeroVersiculo) {
    if (versiculosSeleccionados.has(numeroVersiculo)) {
      versiculosSeleccionados.delete(numeroVersiculo);
    } else {
      versiculosSeleccionados.add(numeroVersiculo);
    }
    versiculosSeleccionados = versiculosSeleccionados;
  }
  
  $: if (capitulo) {
    versiculosSeleccionados = new Set();
  }
</script>

<main class="contenedor-principal">

  <header class="encabezado-lectura">
    <div class="fila-superior">
      <a href="/{idLibro}" class="boton-volver">&larr; {nombreLibro}</a>
    </div>
    
    <div class="navegacion-superior">
      
      {#if mostrarAnterior}
        <a href="/{idLibro}/{capituloAnterior}" class="boton-nav-superior" title="Capítulo Anterior">
          &larr;
        </a>
      {:else}
        <span class="espaciador-nav-superior"></span>
      {/if}

      <h1>{nombreLibro} {capitulo.chapter_number}</h1>

      {#if mostrarSiguiente}
        <a href="/{idLibro}/{capituloSiguiente}" class="boton-nav-superior" title="Capítulo Siguiente">
          &rarr;
        </a>
      {:else}
        <span class="espaciador-nav-superior"></span>
      {/if}
    </div>
  </header>
  
  <article class="texto-escritura">
    {#each capitulo.verses as textoVersiculo, index}
      {@const numeroVersiculo = index + 1}
      <div
        role="button"
        tabindex="0"
        on:click={() => seleccionarVersiculo(numeroVersiculo)}
        on:keydown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            seleccionarVersiculo(numeroVersiculo);
          }
        }}
        class:seleccionado={versiculosSeleccionados.has(numeroVersiculo)}
        class="versiculo-container"
      >
        <sup class="numero-versiculo">{numeroVersiculo}</sup>
        {textoVersiculo}
      </div>
    {/each}
  </article>

  <nav class="navegacion-capitulos">
    {#if mostrarAnterior}
      <a href="/{idLibro}/{capituloAnterior}" class="boton-nav">
        &larr; Capítulo Anterior
      </a>
    {:else}
      <span></span>
    {/if}

    {#if mostrarSiguiente}
      <a href="/{idLibro}/{capituloSiguiente}" class="boton-nav">
        Capítulo Siguiente &rarr;
      </a>
    {/if}
  </nav>

</main>

<style>
  .contenedor-principal {
    max-width: 800px;
    margin: 0 auto;
    padding: 1em;
  }

  .encabezado-lectura {
    padding: 1em 1.5em;
    margin-bottom: 2em;
    background-color: var(--color-fondo-suave);
    border-radius: 8px;
  }

  .fila-superior {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1.5em;
  }

  .boton-volver {
    text-decoration: none;
    color: var(--color-texto);
    background-color: #fff;
    padding: 0.5em 1em;
    border-radius: 20px;
    border: 1px solid var(--color-borde-suave);
    font-size: 0.9em;
  }

  .navegacion-superior {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  /* Eliminamos la regla .titulo-container que estaba causando la advertencia */
  .navegacion-superior h1 {
    margin: 0;
    font-size: 1.8rem;
    color: var(--color-texto);
    text-align: center;
    flex-grow: 1; /* Permitimos que ocupe el espacio central */
  }

  .boton-nav-superior {
    text-decoration: none;
    color: var(--color-primario);
    border: 1px solid var(--color-borde-suave);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    font-size: 1.5rem;
    font-weight: bold;
    transition: background-color 0.2s, color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  .boton-nav-superior:hover {
    background-color: var(--color-primario);
    color: var(--color-primario-texto);
  }

  .espaciador-nav-superior {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
  }

  .versiculo-container {
    margin-bottom: 1em;
    font-size: 1.2rem;
    line-height: 1.8;
    padding: 0.2em 0.5em;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    outline: none;
  }

  .versiculo-container:focus-visible {
    box-shadow: 0 0 0 2px var(--color-primario);
  }
  
  .versiculo-container.seleccionado {
    background-color: var(--color-primario);
    color: var(--color-primario-texto);
  }
  
  .numero-versiculo {
    font-weight: bold;
    color: var(--color-primario);
    font-size: 0.8em;
    margin-right: 0.5em;
    vertical-align: super; 
  }

  .versiculo-container.seleccionado .numero-versiculo {
    color: var(--color-primario-texto);
    opacity: 0.8;
  }

  .navegacion-capitulos {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2em;
    margin-top: 2em;
    border-top: 1px solid var(--color-borde-suave);
  }

  .boton-nav {
    text-decoration: none;
    color: var(--color-primario);
    background-color: transparent;
    border: 1px solid var(--color-borde-suave);
    padding: 0.8em 1.5em;
    border-radius: 30px;
    font-weight: bold;
    transition: background-color 0.2s, color 0.2s;
  }

  .boton-nav:hover {
    background-color: var(--color-primario);
    color: var(--color-primario-texto);
  }
</style>