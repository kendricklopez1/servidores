import express from "express";
import PeliRoutes from "./src/Routes/PeliRoutes.js";
import empRoutes from "./src/Routes/empleadoRoutes.js";
import clienteRoutes from "./src/Routes/ClienteRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
      origin: "https://mern-2-a-kendricks-projects-e8736933.vercel.app/", 
      credentials: true, 
    })
  );


app.use("/api/PeliRoutes",PeliRoutes);
app.use("/api/empleadoRoutes",empRoutes);
app.use("/api/ClienteRoutes",clienteRoutes);

export default app;

































































































































































