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
    app.get("/produto/:id", async (req, res) => {
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
    app.get("/produto/favoritos/:favoritos", async (req, res) => {})
    app.post("/produto", async (req, res) => {
        try {
            await Produto.create(req.body)
            res.json({
                "Mensagem": `O produto ${req.body.descricao} foi inserido !`,
                "error": false
            })
        } catch (e) {
            res.json({
                "Mensagem": `ERROR: ${e.message}`,
                "error": true
            })
        }
    })
    app.put("/produto/:id", async (req, res) => {
        const requisitarId = req.params.id
        const newParams = req.body
        const atributos = ["produto_id", "decricao", "preco_atual", "preco", "favoritos"]
        try {
            for (attr in newParams) {
                if (atributos.indexOf(attr) < 0)
                    throw new Error(`O atributo não é valido, use um desses: produto_id, descricao, preco, favoritos`)
            }
            let produto = await Produto.findOne({
                where: {
                    id: requisitarId
                }
            })
            produto.update({
                "produto_id": newParams.produto_id ? newParams.produto_id : produto.produto_id,
                "decricao": newParams.decricao ? newParams.decricao : produto.decricao,
                "preco_atual": newParams.preco_atual ? newParams.preco_atual : produto.preco_atual,
                "preco": newParams.preco ? newParams.preco : produto.preco,
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
    app.delete("/produto/:id", async (req, res) => {
        const requisitarId = req.params.id
        try {
            await Produto.destroy({
                where: {
                    id: requisitarId
                }
            })
            res.json({
                "mensagem": `O produto de id ${requisitarId} foi deletado !`,
                "error": false
            })
        } catch (e) {
            res.json({
                "mensagem": `ERROR: ${e.message}`,
                "error": true
            })
        }
    })
}