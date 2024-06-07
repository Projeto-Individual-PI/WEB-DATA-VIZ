var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});


router.get("/ultimas_usuario/:id", function (req, res) {
    medidaController.buscarUltimasMedidasUsuario(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/pontuacao-tempo-real/", function (req, res) {
medidaController.buscarUltimasPontuacoes(req, res);
})

router.get("/pontuacao-tempo-real-usuario/:usuario", function (req, res) {
    medidaController.buscarUltimasPontuacoesPorUsuario(req, res);
    })
    

module.exports = router;