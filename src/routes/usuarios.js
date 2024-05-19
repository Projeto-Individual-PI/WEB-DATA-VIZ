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

router.post("/carregar_bau", function (req, res) {
    usuarioController.carregar_bau(req, res);
});

router.post("/reduzir_credito", function (req, res) {
    usuarioController.reduzir_credito(req, res);
});

router.post("/reduzir_bau", function (req, res) {
    usuarioController.reduzir_bau(req, res);
});

router.post("/enviar_item", function (req, res) {
    usuarioController.enviar_item(req, res);
});



router.post("/enviar_bau", function (req, res) {
    usuarioController.enviar_bau(req, res);
});

router.post("/consultar_bau", function (req, res) {
    usuarioController.consultar_bau(req, res);
});

router.post("/retirar_premio", function (req, res) {
    usuarioController.retirar_premio(req, res);
});

module.exports = router;