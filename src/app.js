import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/ecommerce"; // o tu cadena de Atlas

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));

import express from "express";
const app = express();

app.get("/", (req, res) => res.send("Servidor funcionando OK"));
app.listen(8081, () => console.log("Servidor en puerto 8081"));
