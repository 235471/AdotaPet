import express from "express";
import pet from "./petRoutes";
import adotante from "./adotanteRoutes";
import usuario from "./usuarioRoutes";

const router = (app: express.Router) => {
  app.use("/usuarios", usuario);
  app.use("/pets", pet);
  app.use("/adotantes", adotante);
};

export default router;
