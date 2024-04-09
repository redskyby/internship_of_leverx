import { config } from "dotenv";
config();
import express, { Express } from "express";
// @ts-ignore
import  routes from "./routes/index";
import cors from "cors";


const app : Express = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

const PORT: number = parseInt(process.env.PORT!, 10) || 5000;

const start = async () => {
    try {
        await app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
};

start();
