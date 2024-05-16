var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/inventario", function (req, res) {
    usuarioController.inventario(req, res);
});

router.post("/reduzir_credito", function (req, res) {
    usuarioController.reduzir_credito(req, res);
});
module.exports = router;