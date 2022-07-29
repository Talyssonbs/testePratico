/* import {
    update
} from "../models/produto.js" */

import Produto from "../models/produto.js"


export default (app) => {
    app.get('/', (req, res) => {
        res.send(`
        <h2>Escolha a rota !</h2>`)
    })
    app.get("/produto", async (req, res) => {
        try {
            const produto = await Produto.findAll()
            if (produto.length === 0) {
                throw new Error("Banco de dados vazio !")
            }
            res.json({
                "devolve": produto,
                "checar": produto.length
            })
        } catch (e) {
            res.json({
                "Mensagem": `ERROR: ${e.message}`,
                "error": true
            })
        }
    })
    app.get("/produto/id/:id", async (req, res) => {
        const requisitarId = req.params.id
        try {
            const produto = await Produto.findOne({
                where: {
                    id: requisitarId
                }
            })
            if (!produto) {
                throw new Error("Não possui produtos com esse id")
            }
            res.json({
                "devolve": produto,
                "checar": produto.length

            })
        } catch (e) {
            res.json({
                "Mensagem": `ERROR: ${e.message}`,
                "error": true
            })
        }
    })
    app.post("/produto", async (req, res) => {
        try {
            await Produto.create(req.body)
            res.status(201).json({
                "Mensagem": `O produto ${req.body.descricao} foi inserido !`,
                "error": false
            })
        } catch (e) {
            res.status(400).json({
                "Mensagem": `ERROR: ${e.message}`,
                "error": true
            })
        }
    })
    app.put("/produto/id/:id", async (req, res) => {
        const requisitarId = req.params.id
        const newParams = req.body
        const atributos = ["produto_id", "descricao", "preco_atual", "preco", "parcelas", "favoritos"]
        try {
            for (attr in newParams) {
                if (atributos.indexOf(attr) < 0)
                    throw new Error(`O atributo não é valido, use um desses: produto_id, descricao, preco, parcelas, favoritos`)
            }
            let produto = await Produto.findOne({
                where: {
                    id: requisitarId
                }
            })
            produto.update({
                "produto_id": newParams.produto_id ? newParams.produto_id : produto.produto_id,
                "descricao": newParams.descricao ? newParams.descricao : produto.descricao,
                "preco_atual": newParams.preco_atual ? newParams.preco_atual : produto.preco_atual,
                "preco": newParams.preco ? newParams.preco : produto.preco,
                "parcelas": newParams.parcelas ? newParams.parcelas : produto.parcelas,
                "favoritos": newParams.favoritos === true || newParams.favoritos === false ? newParams.favoritos : produto.favoritos,
            })
            await produto.save()
            res.json({
                "message": `O produto de id ${requisitarId} foi atualizado !`,
                "devolver": produto,
                "error": false
            })
        } catch (e) {
            res.json({
                "mensagem": `ERROR: ${e.message}`,
                "error": true
            })
        }
    })
    app.delete("/produto/id/:id", async (req, res) => {
        const requisitarId = req.params.id
        try {
            const produto = await Produto.findOne({
                where: {
                    id: requisitarId
                }
            })
            if (produto) {
                await Produto.destroy({
                    where: {
                        id: requisitarId
                    }
                })
                res.status(200).json({
                    "mensagem": `O produto de id ${requisitarId} foi deletado !`,
                    "error": false
                })
            } else {
                res.status(404).json({
                    "mensagem": `ERROR: O produto de id ${requisitarId} não existe`,
                    "error": true
                })
            }
        } catch (e) {
            res.status(400).json({
                "mensagem": `ERROR: ${e.message}`,
                "error": true
            })
        }
    })
}