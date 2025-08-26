// =================================================================
// SCRIPT DE CONSTRUCCIÓN PARA LA PWA DE LA BIBLIA
// =================================================================

// 1. Importar las librerías necesarias
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

console.log('🚀 Iniciando el script de construcción de datos...');

// 2. Definir rutas a los archivos
const SOURCE_DATA_DIR = './_source_data';
const OUTPUT_DIR = './static/data'; // Los datos irán a la carpeta 'static' de SvelteKit

const indiceFilePath = path.join(SOURCE_DATA_DIR, 'LibroPuebloDeDios - Índice.csv');
const escrituraFilePath = path.join(SOURCE_DATA_DIR, 'LibroPuebloDeDios - Escritura.csv');

// 3. Función principal asíncrona
async function construirDatos() {
    try {
        // Asegurarnos de que el directorio de salida exista
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
            console.log(`📂 Directorio de salida creado en: ${OUTPUT_DIR}`);
        }

        // --- PASO A: Leer y procesar los dos archivos CSV ---

        const librosPromesa = leerCSV(indiceFilePath);
        const versiculosPromesa = leerCSV(escrituraFilePath);

        // Esperar a que ambos archivos se lean en paralelo
        const [librosData, versiculosData] = await Promise.all([librosPromesa, versiculosPromesa]);
        console.log(`✅ Archivos CSV leídos: ${librosData.length} libros y ${versiculosData.length} versículos encontrados.`);

        // --- PASO B: Procesar y estructurar los datos ---

        // Limpiar y ordenar la lista de libros
        const librosProcesados = librosData
            .map(libro => ({
                full_name: libro.Libro,
                abbreviation: libro.Abreviatura,
                testament: libro.Testamento === 'Antiguo' ? 'antiguo_testamento' : 'nuevo_testamento',
                classification: libro.Clasificación,
                order: parseInt(libro.Orden, 10),
                num_chapters: parseInt(libro.Capítulos, 10),
            }))
            .sort((a, b) => a.order - b.order);

        // Agrupar todos los versículos por libro para acceso rápido
        const versiculosAgrupados = {};
        for (const v of versiculosData) {
            const abrev = v.Abreviatura;
            if (!versiculosAgrupados[abrev]) {
                versiculosAgrupados[abrev] = [];
            }
            versiculosAgrupados[abrev].push({
                capitulo: parseInt(v.Capitulo, 10),
                versiculo: parseInt(v.Versiculo, 10),
                texto: v.Texto,
            });
        }
        console.log('🔄 Versículos agrupados por libro.');

        // --- PASO C: Generar los archivos JSON de salida ---

        // 1. Generar el índice principal (books.json)
        generarIndicePrincipal(librosProcesados);

        // 2. Generar un archivo JSON por cada libro
        for (const libro of librosProcesados) {
            generarArchivoDeLibro(libro, versiculosAgrupados[libro.abbreviation]);
        }

        console.log('\n🎉 ¡Proceso de construcción de datos completado con éxito!');
        console.log(`✨ Todos los archivos JSON han sido generados en la carpeta ${OUTPUT_DIR}.`);

    } catch (error) {
        console.error('❌ Error catastrófico durante el proceso de construcción:', error);
    }
}

// --- Funciones auxiliares ---

function leerCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

function generarIndicePrincipal(libros) {
    const bibliaCompleta = {
        antiguo_testamento: [],
        nuevo_testamento: [],
    };

    const clasificaciones = {
        antiguo_testamento: {},
        nuevo_testamento: {},
    };

    for (const libro of libros) {
        const testamentoActual = clasificaciones[libro.testament];
        if (!testamentoActual[libro.classification]) {
            testamentoActual[libro.classification] = {
                classification_name: libro.classification,
                books: [],
            };
        }
        testamentoActual[libro.classification].books.push({
            full_name: libro.full_name,
            abbreviation: libro.abbreviation,
            order: libro.order,
            num_chapters: libro.num_chapters,
        });
    }

    bibliaCompleta.antiguo_testamento = Object.values(clasificaciones.antiguo_testamento);
    bibliaCompleta.nuevo_testamento = Object.values(clasificaciones.nuevo_testamento);
    
    fs.writeFileSync(path.join(OUTPUT_DIR, 'books.json'), JSON.stringify(bibliaCompleta, null, 2));
    console.log('    - Creado: books.json (índice principal)');
}

function generarArchivoDeLibro(libroInfo, versiculos) {
    if (!versiculos) {
        console.warn(`    - ⚠️ Advertencia: No se encontraron versículos para el libro ${libroInfo.full_name}`);
        return;
    }

    const capitulos = [];
    for (let i = 1; i <= libroInfo.num_chapters; i++) {
        const versiculosDelCapitulo = versiculos
            .filter(v => v.capitulo === i)
            .sort((a, b) => a.versiculo - b.versiculo)
            .map(v => v.texto);
        
        capitulos.push({
            chapter_number: i,
            verses: versiculosDelCapitulo,
        });
    }

    const contenidoLibro = {
        book_full_name: libroInfo.full_name,
        abbreviation: libroInfo.abbreviation,
        chapters: capitulos,
    };
    
    const nombreArchivo = `${libroInfo.abbreviation}.json`;
    fs.writeFileSync(path.join(OUTPUT_DIR, nombreArchivo), JSON.stringify(contenidoLibro)); // No indentado para ahorrar espacio
    console.log(`    - Creado: ${nombreArchivo}`);
}

// Ejecutar el script
construirDatos();