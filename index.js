//Carga de servidor y definicion de las rutas
const express = require("express");
const app = express();
const port = 3000;

const {
  agregar,
  canciones,
  editar,
  eliminar,
} = require("./consultas/consultas.js");

//middleware para recibir desde el front como json
app.use(express.json()); // Le dice a tu aplicación Express cómo entender los datos que llegan en formato JSON, como cuando envías datos desde un cliente usando fetch() en JavaScript. Esto es útil para comunicaciones entre el cliente y el servidor.
app.use(express.urlencoded({ extended: true })); // Le dice a tu aplicación Express cómo entender los datos que llegan de formularios HTML. Cuando un formulario se envía desde un navegador al servidor, los datos se envían en este formato. Este middleware ayuda a tu aplicación a comprender y manejar esos datos fácilmente.

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Ruta para agregar una canción a la tabla de canciones
app.post("/cancion", async (req, res) => { // Define una ruta POST en el servidor. Cuando se realiza una solicitud POST a "/cancion", se ejecuta la función de devolución de llamada proporcionada. 
    // async (req, res) = Esta es la función de devolución de llamada asincrónica que maneja la solicitud POST. Toma dos parámetros, req (objeto de solicitud) y res (objeto de respuesta), que representan la solicitud HTTP entrante y la respuesta HTTP saliente, respectivamente.
  try {
    const { titulo, artista, tono } = req.body; // Extrae las propiedades "titulo", "artista" y "tono" del cuerpo de la solicitud. Estas propiedades deben enviarse en el cuerpo de la solicitud POST como datos JSON.
    // console.log("Valores:", titulo, artista, tono);
    const result = await agregar(titulo, artista, tono); // Llama a una función llamada "agregar" y espera su resultado. Esta función probablemente agrega una nueva canción a una base de datos u otro almacenamiento.
    res.json(result); //Envía el resultado de la función "agregar" como una respuesta JSON al cliente que realizó la solicitud POST.
  } catch (error) {
    console.error("Error al agregar la canción:", error);
  }
});

app.get("/canciones", async (req, res) => {
  try {
    const result = await canciones();
    res.json(result);
    
  } catch (error) {
    console.log(error);
  }
});

app.delete("/cancion", async (req, res) => {
  try {
    const { id } = req.query;
    const result = await eliminar(id); // Extrae el parámetro "id" de la consulta (query) de la solicitud. En este caso, se espera que el ID de la canción se envíe como parte de la URL de la solicitud DELETE
    res.json(result);
  } catch (error) {}
});

app.put("/cancion/:id", async (req, res) => {
  try {
    const id = req.params.id; // Extrae el parámetro de ID de la canción de los parámetros de la URL utilizando req.params.id. Este es el ID de la canción que se va a editar.
    const { titulo, artista, tono } = req.body;
    const result = await editar(id, titulo, artista, tono);
    res.json(result);
  } catch (error) {
    console.error("Error al editar la canción:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

//  puerto
app.listen(port, () => console.log(`Servidor escuchado en puerto ${port}`));

// En caso de ingresar una url que no existe
// app.get("*", (req, res) => {
//     res.send("Acá no tenemos nada, prueba en otro lado");
// })
