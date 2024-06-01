var database = require("../database/config");

function buscarUltimasMedidas(limite_linhas) {

    var instrucaoSql = `select usuario as 'Nome', count(fkinventario)as 'Qtd_itens'
    from itens_inventario
    join estoque_itens on fkitem = estoque_itens.iditem
    join usuario on usuario.id = itens_inventario.fkinventario 
    where Raridade = 'lendario' group by fkinventario, usuario order by Qtd_itens desc limit ${limite_linhas};`;

    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasUsuario(id) {

    var instrucaoSql = `select fkinventario, raridade as 'Raridade', count(raridade) as 'Qtd_itens' from itens_inventario
    join estoque_itens on estoque_itens.iditem = fkitem  where fkinventario = ${id}
    group by raridade, fkinventario order by field(Raridade, 'comum', 'incomum', 'raro', 'épico', 'lendário');`;

    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    var instrucaoSql = `SELECT 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        FROM medida WHERE fk_aquario = ${idAquario} 
                    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarUltimasMedidasUsuario,
    buscarMedidasEmTempoReal
}
