var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/carregar_quiz", function (req, res) {
    quizController.carregar_quiz(req, res);
})
router.post("/enviar_pontuacao", function (req, res) {
    quizController.enviar_pontuacao(req, res);
})

module.exports = router;