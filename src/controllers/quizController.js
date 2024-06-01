var quizModel = require("../models/quizModel");


async function carregar_quiz(req, res){
    var id = req.body.IdQuiz;
    if (id != undefined){
        // console.log('o id existe!')
    }else {
        console.log('o id nao existe :(')
    }

    quizModel.carregar_quiz(id).then(
    function (data) {
        res.status(200).json(data);
        // console.log(teste);
    }        
    )  
}

async function enviar_pontuacao(req, res){
    var pontuacao = req.body.PontuacaoQuiz;
    var idusuario = req.body.IdUsuario;
    var idquiz = req.body.IdQuiz;
    if(pontuacao == undefined){
        console.log('a pontuação esta indefinida')
    }else if(idusuario == undefined){
        console.log('o idusuario esta indefinido')
    }else if(idquiz == undefined){
        console.log('o idquiz esta indefinido')
    }else{

      const id = await quizModel.consulta_pontuacao(idusuario, idquiz).then((data) => {
        var dados = data.length != 0 ? data[0].id + 1 : 1
        return dados
    })

        quizModel.enviar_pontuacao(pontuacao, id, idusuario, idquiz).then((data) => {
            res.status(200).json(data);
        })
    }


}

module.exports = {
    carregar_quiz,
    enviar_pontuacao
}