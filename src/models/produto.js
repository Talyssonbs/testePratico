import {
    Model,
    DataTypes
} from "sequelize";
import sequelize from "../database/sequelize.js"

class Produto extends Model {}

Produto.init({
        produto_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        descricao: DataTypes.STRING,
        preco_atual: DataTypes.NUMBER,
        preco: DataTypes.NUMBER,
        favoritos: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "produto",
        freezeTableName: true,

    }

)
export default Produto