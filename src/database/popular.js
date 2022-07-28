import Produto from "../models/produto.js"

const produtos = [{
    "produto_id": 1,
    "decricao": "Monitor LED 27'' Gamer Curvo Samsung  1920 x 1080 FHD 240 Hz HDMI, DP, Gsync Série CRG50",
    "preco_atual": "2.599,00",
    "preco": "2.813,99",
    "favoritos": false
}]
produtos.forEach(async (cada) => {
    const port = await Produto.create(cada)
})