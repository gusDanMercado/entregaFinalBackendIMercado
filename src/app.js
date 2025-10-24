import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/ecommerce"; // o tu cadena de Atlas

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));
