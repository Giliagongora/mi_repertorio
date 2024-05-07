const pool = require("../config/ddbb.js");
const errores = require("../errores/errores.js");
// console.log(errores);
let tabla = canciones;
// console.log(tabla);

// Ingresa nueva cancion
async function agregar(titulo, artista, tono) {
  try {
    if (!titulo || !artista || !tono) {
      console.log("Tienes que llenar los campos vacios");
    } else {
      const result = await pool.query({
        text: "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING *",
        values: [titulo, artista, tono],
      });
      console.log(
        `Registro añadido correctamente: ${JSON.stringify(result.rows[0])}`
      );
      return result.rows[0];
    }

    if (result.rows[0] == 0) {
        console.log(mensaje);
        return mensaje;}
  } catch (error) {
    console.error('Se produjo un error:', error.message);
    throw error;
  }
}

// Devuelve todas la lista
async function canciones() {
  try {
    const result = await pool.query("SELECT * FROM canciones");
    return result.rows;
  } catch (error) {
    console.error('Se produjo un error:', error.message);
    throw error;
  }
}

async function editar(id, titulo, artista, tono) {
  try {
    const result = await pool.query({
      text: "UPDATE canciones SET id = $1, titulo = $2, artista = $3, tono= $4 WHERE id = $1 RETURNING *",
      values: [id, titulo, artista, tono],
    });
    console.log("Resultado de la consulta:", result.rows);
    console.log(
      `Registro editado correctamente: ${JSON.stringify(result.rows[0])}`
    );
    return result.rows[0];
    res.json(result);
  } catch (error) {
    console.error('Se produjo un error:', error.message);
    throw error;
  }
}

//funcion para eliminar un registro según su nombre recibido como un query.string
async function eliminar(id) {
  try {
    const result = await pool.query({
      text: "DELETE FROM canciones WHERE id = $1 RETURNING *",
      values: [id],
    });
    return result.rows[0];
  } catch (error) {
    console.error('Se produjo un error:', error.message);
    throw error;
  }
}

// agregar("love" , "jam", "Do");

module.exports = {
  agregar,
  canciones,
  editar,
  eliminar,
};
