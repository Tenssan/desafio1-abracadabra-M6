// servidor express en puerto 3000
const express = require("express");
const app = express();
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

//carpeta assets publica
app.use(express.static("assets"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//arreglo de nombres y ruta para devolverlo como json
const nombres = ["Juan", "Pedro", "Pablo", "María", "Ana", "Lucía", "Carlos", "José", "Luis", "Miguel"];
app.get("/abracadabra/usuarios", (req, res) => {
    res.json(nombres);
});

//middleware con la ruta /abracadabra/juego/:usuario para validar que el usuario recibido como parámetro “usuario” existe en el arreglo En caso de ser exitoso, permitir el paso a la ruta GET correspondiente, de lo contrario devolver la imagen “who.jpeg
const middleware = (req, res, next) => {
    const usuario = req.params.usuario;
    if (nombres.includes(usuario)) {
        next();
    } else {
        res.sendFile('who.jpeg', { root: 'assets' });
    }
};

app.get("/abracadabra/juego/:usuario", middleware, (req, res) => {
    res.send("Bienvenido al juego " + req.params.usuario);
});

//Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria. En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la imagen de Voldemort.

app.get("/abracadabra/conejo/:n", (req, res) => {
    const n = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    console.log(n);
    const numero = req.params.n;
    numero == n ? res.sendFile('conejito.jpg', { root: 'assets' }) : res.sendFile('voldemort.jpg', { root: 'assets' });
});

//Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al consultar una ruta que no esté definida en el servidor

app.get("*", (req, res) => {
    res.send("Esta página no existe...");
});