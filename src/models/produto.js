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
        preco_atual: DataTypes.STRING,
        preco: DataTypes.STRING,
        parcelas: DataTypes.STRING,
        favoritos: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        valor: DataTypes.STRING,
        url_imagem: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "produto",
        freezeTableName: true,

    }

)
export default Produto