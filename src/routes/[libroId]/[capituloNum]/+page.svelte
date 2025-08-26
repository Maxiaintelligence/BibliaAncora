<script>
  // Versión final con bug de navegación corregido
  export let data;

  // Declaraciones Reactivas.
  // El '$:' le dice a Svelte que vuelva a ejecutar estas líneas
  // cada vez que una de las variables de las que dependen (como 'data') cambie.
  $: ({ nombreLibro, idLibro, capitulo, totalCapitulos, numeroCapituloActual } = data);
  $: capituloAnterior = numeroCapituloActual - 1;
  $: capituloSiguiente = numeroCapituloActual + 1;
  $: mostrarAnterior = numeroCapituloActual > 1;
  $: mostrarSiguiente = numeroCapituloActual < totalCapitulos;

  // Esta lógica no necesita ser reactiva, ya que solo maneja el estado de la selección
  let versiculosSeleccionados = new Set();
  function seleccionarVersiculo(numeroVersiculo) {
    if (versiculosSeleccionados.has(numeroVersiculo)) {
      versiculosSeleccionados.delete(numeroVersiculo);
    } else {
      versiculosSeleccionados.add(numeroVersiculo);
    }
    versiculosSeleccionados = versiculosSeleccionados;
  }
  
  // Una lógica extra: cuando cambiamos de capítulo, limpiamos los versículos seleccionados.
  $: if (capitulo) {
    versiculosSeleccionados = new Set();
  }
</script>

<main class="contenedor-principal">
<header class="encabezado-lectura">
  <a href="/{idLibro}" class="boton-volver">&larr; {nombreLibro}</a>
  
  <!-- NUEVO CONTENEDOR PARA LA NAVEGACIÓN SUPERIOR -->
  <div class="navegacion-superior">
    
    <!-- Botón Anterior (Copiado de la navegación de abajo) -->
    {#if mostrarAnterior}
      <a href="/{idLibro}/{capituloAnterior}" class="boton-nav-superior" title="Capítulo Anterior">
        &larr;
      </a>
    {:else}
      <!-- Un espaciador para mantener el título centrado -->
      <span class="espaciador-nav-superior"></span>
    {/if}

    <h1>{nombreLibro} {capitulo.chapter_number}</h1>

    <!-- Botón Siguiente (Copiado de la navegación de abajo) -->
    {#if mostrarSiguiente}
      <a href="/{idLibro}/{capituloSiguiente}" class="boton-nav-superior" title="Capítulo Siguiente">
        &rarr;
      </a>
    {:else}
      <!-- Un espaciador para mantener el título centrado -->
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
  /* --- NUEVOS ESTILOS PARA LA NAVEGACIÓN SUPERIOR --- */
  .navegacion-superior {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 1em; /* Un poco de espacio sobre el título */
  }

  .navegacion-superior h1 {
    margin: 0 1em; /* Evita que el título se pegue a los botones */
    flex-grow: 1; /* Permite que el título ocupe el espacio sobrante */
  }

  .boton-nav-superior {
    text-decoration: none;
    color: var(--color-primario);
    border: 1px solid var(--color-borde-suave);
    border-radius: 50%; /* Para hacerlos redondos */
    width: 44px;  /* Ancho fijo */
    height: 44px; /* Alto fijo */
    font-size: 1.5rem;
    font-weight: bold;
    transition: background-color 0.2s, color 0.2s;
    
    /* Usamos flexbox para centrar la flecha dentro del círculo */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0; /* Evita que el botón se encoja */
  }

  .boton-nav-superior:hover {
    background-color: var(--color-primario);
    color: var(--color-primario-texto);
  }

  .espaciador-nav-superior {
    /* Debe ocupar el mismo espacio que el botón para mantener el balance */
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