var database = require("../database/config")
function carregar_quiz(id){
    var comando = `
    Select quiz.id as 'idQuiz', genero as 'generoQuiz', idPergunta, Pergunta, Resposta_correta, Resposta_falsa from quiz 
    join Perguntas on quiz.id = Perguntas.fkQuiz where genero = '${id}';
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
    insert into Pontuacao_usuario values 
    (${id}, ${idusuario}, ${idquiz}, ${pontuacao})
    `

    return database.executar(comando)
}
module.exports = {
    carregar_quiz,
    enviar_pontuacao,
    consulta_pontuacao
};