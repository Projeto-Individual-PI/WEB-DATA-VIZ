
async function aumentar_credito(inventario_id, creditos_atuais, pontuacao){
    var creditos_novos = Number(creditos_atuais) + Number(pontuacao);

await fetch("/usuarios/aumentar_credito", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            IdInventario: inventario_id,
            Creditos_atuais: creditos_novos

        })
    }).then(function (resposta) {
        // console.log("Irei reduzir os creditos!")
        if (resposta.ok) {
            // console.log('minha resposta sem json é :' + resposta);
            // console.log('minha resposta com json é:' + json);
            // console.log(inventario);
            resposta.json().then(credito => {
                // console.log(credito);
                Carregar_Inventario(sessionStorage.ID_USUARIO);  
              
            });

        } else {
            console.log("Houve um erro ao tentar atualizar os creditos!");
            // resposta.text().then(texto => {
            //     console.error(texto);
            //     finalizarAguardar(texto);
            // });
        }

    }).catch(function (erro) {
        console.log('erro');
    })


}