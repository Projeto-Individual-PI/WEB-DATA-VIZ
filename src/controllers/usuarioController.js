var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    // console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    // console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.status(200).json(resultadoAutenticar[0]);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

async function inventario(req, res){
    var id = req.body.IdUsuario;
    if (id != undefined){
        // console.log('o id existe!')
    }else {
        console.log('o id nao existe :(')
    }

    usuarioModel.inventario(id).then(
    function (data) {
        res.json(data);
        // console.log(teste);
    }        
    )  
}




function reduzir_credito(req, res){
    var fk_usuario = req.body.IdInventario;
    var creditos_atuais = req.body.Creditos_atuais;
    if (fk_usuario != undefined && creditos_atuais != undefined){
        // console.log('a fk do inventario existe e os creditos também!')
    }else {
        console.log('o id nao existe ou os creditos nao existem :(')
    }
    usuarioModel.reduzir_credito(fk_usuario, creditos_atuais).then(
    function (teste) {
        res.json(teste);
        // console.log(teste);
    }        
    )
}

function reduzir_bau(req, res){
    var fk_usuario = req.body.IdInventario;
    var baus_atuais = req.body.Baus_atuais;
    var fkbau = req.body.Fk_bau;
    if (fk_usuario != undefined && baus_atuais != undefined && fkbau != undefined){
        // console.log('a fk do inventario existe e os creditos também!')
        usuarioModel.reduzir_bau(fk_usuario, baus_atuais, fkbau).then(
            function (teste) {
                res.json(teste);
                // console.log(teste);
            }        
            )
    }else {
        console.log('o id nao existe ou o bau nao existe :(')
    }
    
}

async function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var usuario = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var posso_autenticar = false;

    // Faça as validações dos valores
    if (usuario == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
       await usuarioModel.cadastrar(usuario, email, senha)
        .then(
            function (resultado) {
                posso_autenticar = true;
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );

       if (posso_autenticar){

        usuarioModel.autenticar(email, senha)
        .then(
            function (resultadoAutenticar) {
                // console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                // console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                if (resultadoAutenticar.length == 1) {
                    console.log('Id do meu usuario criado: ' +JSON.stringify(resultadoAutenticar[0].id));
                    var idusuario = resultadoAutenticar[0].id;
                    usuarioModel.criar_inventario(idusuario).then(
                        (data) => {
                            console.log('realizei a criação do meu inventario: ')
                        }
                    ).catch((erro)=>{
                        console.log('erro: ' + erro)
                    });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
       }


        // usuarioModel.criar_inventario(idusuario, creditos).then().catch();
    }
}

async function enviar_item(req, res){
var idinventario = req.body.IdInventarioServer;
var fkitem = req.body.PremioServer;
if (idinventario == undefined) {
console.log('O idinventario esta indefinido na função enviar item!');
}else if (fkitem == undefined){
     console.log('O premio esta indefinido!')
} else{

    const id = await usuarioModel.consultar_item(idinventario).then((data) => {
         return data.length == 0 ? 1 : data[0].iditem + 1 
    })

// console.log('o id do item é: ' + id)

    usuarioModel.enviar_item(idinventario, id, fkitem).then((resultado) => {
        console.log('Inseri o item no inventário!');
        res.json(resultado);
        }
    ).catch(
        function(erro){
            console.log(erro + '\n Houve um erro ao enviar o item');
            res.status(500).json(erro.sqlMessage);
        }
    );
}


}

async function enviar_bau(req, res){
var idusuario = req.body.fkinventario;
var fkbau = req.body.idbau
var nome = ''

if (fkbau == 1){
    nome = 'Baú Comum'
}else if (fkbau == 2){
    nome = 'Baú Raro'

}else if (fkbau == 3){
    nome = 'Baú Lendário'
}
if (idusuario == undefined || fkbau == undefined || nome == ''){
    console.log('ERRO! USUARIO OU BAU INDEFINIDOS')
}else {
    
    var id = await usuarioModel.pesquisar_bau_usuario(idusuario, fkbau).then((data) =>
    {
        // console.log(data[0])
        return data.length == 0 ? 1 : data[0].idbau + 1
    })
}


    usuarioModel.enviar_bau(idusuario, fkbau, id, nome).then((data) => {
        res.status(200).json(data);
    })

}
function consultar_bau(req, res){
    var idbau = req.body.IdBauServer;
    if (idbau == undefined) {
    console.log('O idbau esta indefinido na função consultar bau!');
    } else{
        usuarioModel.consultar_bau(idbau).then((resultado) => {
            console.log('Consultei o bau!');
            // console.log(resultado[0]);
            res.json(resultado[0]);
            }
        ).catch(
            function(erro){
                console.log(erro + '\n Houve um erro ao consultar o bau');
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
    
    }

    function retirar_premio(req, res){
        var raridade = req.body.raridadeserver
        if (raridade == undefined){
            console.log('a raridade esta indefinida')
        }else {

            usuarioModel.retirar_premio(raridade).then((data) =>{
                res.status(200).json(data);
            })
        }
    }

module.exports = {
    autenticar,
    cadastrar,
    inventario,
    reduzir_credito,
    enviar_item,
    consultar_bau,
    reduzir_bau,
    enviar_bau,
    retirar_premio
}