var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 5;


    // console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(limite_linhas).then((resultado) => {
        if (resultado.length > 0) {

            res.status(200).json(resultado);
        } else {
            const vazio = [{
                Nome: 'Sem Usuários.',
                Qtd_itens: 0
            }]
            res.status(200).json(vazio)
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidasUsuario(req, res) {
    const id = req.params.id;

    medidaModel.buscarUltimasMedidasUsuario(id).then((resultado) => {
        if (resultado.length > 0) {
            
            res.status(200).json(resultado);
        } else {
             const vazio = [{
                raridade: 'comum',
                Qtd_itens: 0
            },
            {
                raridade: 'incomum',
                Qtd_itens: 0
            },
            {
                raridade: 'raro',
                Qtd_itens: 0
            },
            {
                raridade: 'épico',
                Qtd_itens: 0
            },
            {
                raridade: 'lendário',
                Qtd_itens: 0
            }
        ]
            res.status(200).json(vazio)
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idAquario = req.params.idAquario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarUltimasMedidasUsuario,
    buscarMedidasEmTempoReal

}