import {
    Sequelize
} from "sequelize";

export default new Sequelize("produtos", "adm", "pass", {
    dialect: "sqlite",
    host: "./src/database/database.sqlite",
    define: {
        underscored: true,
        underscoredAll: true,
    }
})