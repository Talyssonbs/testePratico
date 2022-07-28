import Produto from "../models/produto.js"

const produtos = [{
    "produto_id": 1,
    "descricao": "Monitor LED 27'' Gamer Curvo Samsung  1920 x 1080 FHD 240 Hz HDMI, DP, Gsync Série CRG50",
    "preco_atual": "R$ 2.599,00",
    "preco": "R$ 2.813,99",
    "parcelas": "em até 10x de R$ 259,90 sem juros",
    "favoritos": false,
}, {
    "produto_id": 1,
    "descricao": "Teclado Gamer Vinik VX Gaming Dragon V2, ABNT2, Preto e Vermelho - GT100",
    "preco_atual": "R$ 29,00",
    "preco": "R$ 40,61",
    "parcelas": "Em até 1x de R$ 29,00 sem juros no cartão",
    "favoritos": false,
}]
produtos.forEach(async (cada) => {
    const port = await Produto.create(cada)
})