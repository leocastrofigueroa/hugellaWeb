const SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWlSu1ArQX5fcque-RsWUCUP9d4qZLI6me9R--dCHuUUPm38XrORq88R0pDVrdEUqcNUzax_E5kBuW/pub?gid=861638820&single=true&output=csv";

// Convierte correctamente el CSV aunque las descripciones tengan comas
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

  return filas.slice(1).map((fila, index) => {
    const datos = {};

    encabezados.forEach((encabezado, columna) => {
      datos[encabezado] = fila[columna]?.trim() || "";
    });

    const valorOferta = (
      datos["OFERTA"] || ""
    ).toUpperCase().trim();

    const precioNormal = Number(
      (datos["PRECIO"] || "").replace(/[^\d]/g, "")
    );

    const precioOferta = Number(
      (datos["PRECIO OFERTA"] || "").replace(/[^\d]/g, "")
    );

    return {
      // Usamos la posición de la fila como ID único
      id: index + 1,

      carpeta: datos["REFERENCIA IMAGENES"],

      categoria: datos["TIPO"],

      nombre: datos["PRODUCTO"],

      marca: datos["MARCA"],

      precio: precioNormal,

      precioOferta:
        precioOferta > 0 ? precioOferta : null,

      oferta:
        valorOferta === "SI" ||
        valorOferta === "SÍ" ||
        valorOferta === "TRUE" ||
        valorOferta === "1",

      descripcion:
        datos["DESCRIPCION"] ||
        datos["DESCRIPCIÓN"] ||
        datos["CARACTERISTICAS"] ||
        datos["CARACTERÍSTICAS"] ||
        "",

      destacado: false,

      carrusel: false,
    };
  });
}

const productsPromise = fetch(SHEETS_URL)
  .then((respuesta) => {
    if (!respuesta.ok) {
      throw new Error("No se pudo acceder a Google Sheets");
    }

    return respuesta.text();
  })
  .then(convertirCSV);

export default productsPromise;