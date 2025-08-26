<script>
  export let data;

  const { nombreLibro, idLibro, capitulo, totalCapitulos, numeroCapituloActual } = data;
  const capituloAnterior = numeroCapituloActual - 1;
  const capituloSiguiente = numeroCapituloActual + 1;
  const mostrarAnterior = numeroCapituloActual > 1;
  const mostrarSiguiente = numeroCapituloActual < totalCapitulos;

  let versiculosSeleccionados = new Set();

  function seleccionarVersiculo(numeroVersiculo) {
    if (versiculosSeleccionados.has(numeroVersiculo)) {
      versiculosSeleccionados.delete(numeroVersiculo);
    } else {
      versiculosSeleccionados.add(numeroVersiculo);
    }
    versiculosSeleccionados = versiculosSeleccionados;
  }
</script>

<main class="contenedor-principal">
  <header class="encabezado-lectura">
    <a href="/{idLibro}" class="boton-volver">&larr; {nombreLibro}</a>
    <h1>{nombreLibro} {capitulo.chapter_number}</h1>
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
      <!-- CORREGIDO: Etiqueta span con apertura y cierre -->
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
    padding: 1.5em;
    margin-bottom: 2em;
    background-color: var(--color-fondo-suave);
    border-radius: 8px;
    text-align: center;
    position: relative;
  }

  .encabezado-lectura h1 {
    margin: 0;
    font-size: 1.8rem;
    color: var(--color-texto);
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

  /* CORREGIDO: La regla ahora apunta a '.versiculo-container' en lugar de 'p' */
  .versiculo-container {
    margin-bottom: 1em;
    font-size: 1.2rem;
    line-height: 1.8;
    padding: 0.2em 0.5em;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    outline: none; /* Quita el borde azul por defecto al hacer clic */
  }

  /* NUEVO: Añadimos un estilo de foco para la navegación con teclado */
  .versiculo-container:focus-visible {
    box-shadow: 0 0 0 2px var(--color-primario); /* Un aro de color primario al enfocar con Tab */
  }
  
  /* CORREGIDO: La regla ahora apunta a '.versiculo-container.seleccionado' */
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

  /* CORREGIDO: La regla ahora apunta a '.versiculo-container.seleccionado' */
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