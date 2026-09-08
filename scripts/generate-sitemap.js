import fs from "fs";
import path from "path";

const SHEETS_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWlSu1ArQX5fcque-RsWUCUP9d4qZLI6me9R--dCHuUUPm38XrORq88R0pDVrdEUqcNUzax_E5kBuW/pub?gid=861638820&single=true&output=csv";

function convertirCSV(texto) {
    const filas = [];
    let fila = [];
    let campo = "";
    let dentroDeComillas = false;

    for (let i = 0; i < texto.length; i++) {
        const caracter = texto[i];
        const siguiente = texto[i + 1];

        if (caracter === '"' && siguiente === '"') {
            campo += '"';
            i++;
            continue;
        }

        if (caracter === '"') {
            dentroDeComillas = !dentroDeComillas;
            continue;
        }

        if (caracter === "," && !dentroDeComillas) {
            fila.push(campo);
            campo = "";
            continue;
        }

        if (
            (caracter === "\n" || caracter === "\r") &&
            !dentroDeComillas
        ) {
            if (caracter === "\r" && siguiente === "\n") {
                i++;
            }

            fila.push(campo);
            campo = "";

            if (fila.some((valor) => valor.trim() !== "")) {
                filas.push(fila);
            }

            fila = [];
            continue;
        }

        campo += caracter;
    }

    if (campo !== "" || fila.length > 0) {
        fila.push(campo);

        if (fila.some((valor) => valor.trim() !== "")) {
            filas.push(fila);
        }
    }

    if (filas.length < 2) {
        return [];
    }

    const encabezados = filas[0].map((encabezado) =>
        encabezado.trim().toUpperCase()
    );

    return filas.slice(1).map((fila) => {
        const datos = {};

        encabezados.forEach((encabezado, columna) => {
            datos[encabezado] = fila[columna]?.trim() || "";
        });

        return {
            nombre: datos["PRODUCTO"] || "",
        };
    });
}

function crearSlug(texto = "") {
    return texto
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function buscarDuplicados(productos) {
    const slugs = new Map();

    productos.forEach((producto) => {
        if (!producto.nombre) return;

        const slug = crearSlug(producto.nombre);

        if (!slug) return;

        if (!slugs.has(slug)) {
            slugs.set(slug, []);
        }

        slugs.get(slug).push(producto.nombre);
    });

    return [...slugs.entries()].filter(
        ([, nombres]) => nombres.length > 1
    );
}

async function generarSitemap() {
    try {
        console.log("Generando sitemap...");

        const respuesta = await fetch(SHEETS_URL);

        if (!respuesta.ok) {
            throw new Error(
                "No se pudo acceder a Google Sheets"
            );
        }

        const texto = await respuesta.text();
        const productos = convertirCSV(texto);

        /*
         * COMPROBACIÓN DE URLs DUPLICADAS
         */

        const duplicados = buscarDuplicados(productos);

        if (duplicados.length > 0) {
            console.log("");
            console.warn(
                "ATENCIÓN: se encontraron URLs de productos duplicadas:"
            );

            duplicados.forEach(([slug, nombres]) => {
                console.warn("");
                console.warn(`/productos/${slug}`);

                nombres.forEach((nombre) => {
                    console.warn(`  - ${nombre}`);
                });
            });

            console.log("");
            console.warn(
                `Total de URLs duplicadas: ${duplicados.length}`
            );
            console.log("");
        } else {
            console.log(
                "Comprobación de URLs: no hay duplicados."
            );
        }

        /*
         * GENERACIÓN DEL SITEMAP
         */

        const urlsFijas = [
            "https://www.hugella.com.ar/",
            "https://www.hugella.com.ar/productos",
            "https://www.hugella.com.ar/ofertas",
            "https://www.hugella.com.ar/nosotros",
            "https://www.hugella.com.ar/contacto",
        ];

        const urlsProductos = productos
            .filter((producto) => producto.nombre)
            .map(
                (producto) =>
                    `https://www.hugella.com.ar/productos/${crearSlug(
                        producto.nombre
                    )}`
            );

        const urls = [
            ...urlsFijas,
            ...urlsProductos,
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
                .map(
                    (url) => `  <url>
    <loc>${url}</loc>
  </url>`
                )
                .join("\n")}
</urlset>
`;

        const destino = path.resolve(
            process.cwd(),
            "public",
            "sitemap.xml"
        );

        fs.writeFileSync(
            destino,
            xml,
            "utf8"
        );

        console.log(
            `Sitemap generado con ${urls.length} URLs`
        );

        console.log(
            `Productos incluidos: ${urlsProductos.length}`
        );
    } catch (error) {
        console.error(
            "Error generando sitemap:",
            error
        );

        process.exit(1);
    }
}

generarSitemap();