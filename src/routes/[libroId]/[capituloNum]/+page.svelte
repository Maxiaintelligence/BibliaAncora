<script>
  export let data;

  const { nombreLibro, idLibro, capitulo } = data;

  // Creamos un Set para almacenar los números de los versículos seleccionados.
  let versiculosSeleccionados = new Set();

  // Función que se ejecuta cada vez que se hace clic en un versículo.
  function seleccionarVersiculo(numeroVersiculo) {
    if (versiculosSeleccionados.has(numeroVersiculo)) {
      versiculosSeleccionados.delete(numeroVersiculo); // Deseleccionar
    } else {
      versiculosSeleccionados.add(numeroVersiculo); // Seleccionar
    }
    // Este truco le dice a Svelte que la variable ha cambiado para que actualice la vista.
    versiculosSeleccionados = versiculosSeleccionados;
  }
</script>

<main class="contenedor-principal">
  <header class="encabezado-lectura">
    <a href="/{idLibro}" class="boton-volver">&larr; {nombreLibro}</a>
    <h1>{nombreLibro} {capitulo.chapter_number}</h1>
  </header>
  
  <article class="texto-escritura">
    <!-- Iteramos sobre cada versículo y lo mostramos -->
    {#each capitulo.verses as textoVersiculo, index}
      {@const numeroVersiculo = index + 1}
      <p
        on:click={() => seleccionarVersiculo(numeroVersiculo)}
        class:seleccionado={versiculosSeleccionados.has(numeroVersiculo)}
      >
        <sup class="numero-versiculo">{numeroVersiculo}</sup>
        {textoVersiculo}
      </p>
    {/each}
  </article>
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

  /* REGLA ÚNICA Y CORREGIDA PARA LOS PÁRRAFOS DE VERSÍCULOS */
  .texto-escritura p {
    margin-bottom: 1em;
    font-size: 1.2rem;
    line-height: 1.8;
    padding: 0.2em 0.5em;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  /* REGLA PARA EL ESTADO SELECCIONADO */
  .texto-escritura p.seleccionado {
    background-color: var(--color-primario);
    color: var(--color-primario-texto);
  }
  
  /* REGLA ÚNICA Y CORREGIDA PARA EL NÚMERO DEL VERSÍCULO */
  .numero-versiculo {
    font-weight: bold;
    color: var(--color-primario);
    font-size: 0.8em;
    margin-right: 0.5em;
    vertical-align: super; 
  }

  /* REGLA PARA EL NÚMERO CUANDO EL VERSÍCULO ESTÁ SELECCIONADO */
  .texto-escritura p.seleccionado .numero-versiculo {
    color: var(--color-primario-texto);
    opacity: 0.8;
  }
</style>