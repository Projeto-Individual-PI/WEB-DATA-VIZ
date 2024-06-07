var database = require("../database/config")
function carregar_quiz(id){
    var comando = `
    Select quiz.id as 'idQuiz', genero as 'generoQuiz', idPergunta, Pergunta, Resposta_correta, Resposta_falsa from quiz 
    join perguntas on quiz.id = perguntas.fkQuiz where genero = '${id}';
    `

    return database.executar(comando);
}

function consulta_pontuacao(idusuario, idquiz){
    var comando = `
    select id from pontuacao_usuario where fkusuario = ${idusuario} and fkquiz = ${idquiz} order by id desc limit 1
    `

    return database.executar(comando)
}
function enviar_pontuacao(pontuacao, id, idusuario, idquiz){
    var comando = `
    insert into pontuacao_usuario values 
    (${id}, ${idusuario}, ${idquiz}, ${pontuacao}, default)
    `

    return database.executar(comando)
}
module.exports = {
    carregar_quiz,
    enviar_pontuacao,
    consulta_pontuacao
};