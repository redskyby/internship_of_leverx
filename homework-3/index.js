const express = require("express");
const routes = require("./routes/index");

const app = express();

app.use(express.json());
app.use("/api", routes);

const start = async () => {
    try {
        app.listen(3000, () => {
            console.log(`Server running at http://localhost:${3000}`);
        });
    } catch (e) {
        console.error(e);
    }
};

start();
