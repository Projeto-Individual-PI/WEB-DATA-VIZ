var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, usuario, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(usuario, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", usuario, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (usuario, email, senha) VALUES ('${usuario}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inventario(id_usuario) {
    // console.log(`ACESSEI O INVENTARIO DO USUARIO ${id_usuario}`);
    var instrucaoSql = `
    Select fkusuario, creditos, group_concat(idbau), count(fkbau) as qtd_baus,fkbau, nome from inventario
    left join baus_inventario on fkinventario = fkusuario where fkusuario = ${id_usuario}
    group by fkusuario, creditos, fkbau, nome;
    `;
    // console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}
function criar_inventario(id_usuario) {
    // console.log(`VOU CRIAR O INVENTARIO DO USUARIO ${id_usuario}`);
    var instrucaoSql = `
        insert into inventario values (${id_usuario}, 100)
    `;
    // console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}
function pesquisar_bau_usuario(idusuario, fkbau){
    // console.log(`Irei consultar o bau ${fkbau} do usuario ${idusuario}!`)
    var instrucaoSql = `select idbau from baus_inventario where fkinventario = ${idusuario} and fkbau = ${fkbau} order by idbau desc limit 1`
    // console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}
function reduzir_credito(fk_usuario, creditos_atuais) {
    // console.log(`Irei reduzir os creditos do usuario de id: ${fk_usuario} para ${creditos_atuais}`);
    var instrucaoSql = `
        update inventario set creditos = ${creditos_atuais} where fkusuario = ${fk_usuario}
    `;
    // console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}
function aumentar_credito(fk_usuario, creditos_atuais) {
    // console.log(`Irei reduzir os creditos do usuario de id: ${fk_usuario} para ${creditos_atuais}`);
    var instrucaoSql = `
        update inventario set creditos = ${creditos_atuais} where fkusuario = ${fk_usuario}
    `;
    // console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}
function reduzir_bau(fk_usuario, baus_atuais, fkbau) {
    // console.log(`Irei remover o bau de id ${baus_atuais} e de fkbau ${fkbau} do usuario de id: ${fk_usuario}`);
    var instrucaoSql = `
    delete from baus_inventario where fkinventario = ${fk_usuario} and fkbau = ${fkbau} and idbau = ${baus_atuais};
    `;
    // console.log('Executando a instrução SQL: \n' + instrucaoSql);
    return database.executar(instrucaoSql);
}
function enviar_item(idinventario, iditem, fkitem) {
    var instrucaoSql = `
    Insert into itens_inventario (iditem,fkinventario,fkitem) values (${iditem}, ${idinventario}, ${fkitem});
    `
    return database.executar(instrucaoSql);

}
function enviar_bau(idusuario, fkbau, idbau, nome){
    // console.log(`irei enviar o bau de nome ${nome}, de id ${idbau} e de fk ${fkbau} para o inventario do usuario de id ${idusuario}`)
    var instrucaoSql = `
    insert into baus_inventario values (${idbau}, ${fkbau}, ${idusuario}, '${nome}')
    `
    return database.executar(instrucaoSql);
}
function consultar_bau(idbau) {
    var instrucaoSql = `
    Select * from loja_baus where idbau = ${idbau}`
    return database.executar(instrucaoSql);

}
function retirar_premio(raridade){
    var instrucaoSql = `
    select iditem, nome, raridade, preco, url from estoque_itens join url_img_itens on iditem = fkitem where raridade = '${raridade}'
    `;
    console.log(instrucaoSql)
    return database.executar(instrucaoSql);
}
function consultar_item(idusuario){
    var instrucaoSql = `
    select iditem from itens_inventario where fkinventario = ${idusuario} order by iditem desc limit 1
    `;
    // console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}

function consulta_inventario(id){
    var instrucaoSql = `
    select  count(nome) as qtd_item, nome, raridade, preco, url from itens_inventario  
join estoque_itens on estoque_itens.iditem = itens_inventario.fkitem 
left join url_img_itens on estoque_itens.iditem = url_img_itens.fkitem where fkinventario = ${id}
group by  nome, raridade, preco,url;
;
    `;
    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}

function consulta_item(idusuario, item){
    var instrucaoSql = `
    
    select itens_inventario.iditem, nome, raridade, preco from itens_inventario join estoque_itens on itens_inventario.fkitem = estoque_itens.iditem where fkinventario = ${idusuario} and 
    nome = '${item}' order by itens_inventario.iditem limit 1;
    `
    console.log(instrucaoSql)
    return database.executar(instrucaoSql)   
}

function reduzir_item(idusuario, item){
    var instrucaoslq = `
    delete from itens_inventario where fkinventario = ${idusuario} and iditem = ${item}
    
    `
    // console.log(instrucaoslq)

    return database.executar(instrucaoslq)
}
module.exports = {
    autenticar,
    cadastrar,
    inventario,
    reduzir_credito,
    aumentar_credito,
    enviar_item,
    criar_inventario,
    consultar_bau,
    consultar_item,
    reduzir_bau,
    pesquisar_bau_usuario,
    enviar_bau,
    retirar_premio,
    consulta_inventario,
    consulta_item,
    reduzir_item
};
