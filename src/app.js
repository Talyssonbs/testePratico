import express from "express"
import cors from "cors"

const app = express()

import sequelize from "./database/sequelize.js"
sequelize.sync({}).then(() => console.log("Banco de dados pronto"))

app.use(express.json())
app.use(cors())
import produto from "./controllers/favoritosController.js"

produto(app)


export default app