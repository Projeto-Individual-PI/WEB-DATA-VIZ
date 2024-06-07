async function consulta_inventario(id){

    try {
        const resposta = await fetch("usuarios/consulta_inventario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idinventario:   id
            })
        })

        if (!resposta.ok){
            throw new Error('Houve um erro!');

        }
        const data = await resposta.json();
        // console.log('resposta: ' + resposta);
        return data;

    }catch(erro){
        console.log('erro na consulta inventario: ' + erro);
        throw erro;
    }


}

async function reduzir_item(item, usuario){

    // console.log(item)
    // console.log(usuario)

    try{

        const response = await fetch("usuarios/reduzir_item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idusuarioserver: usuario,
                itemserver: item
            })
        })


        console.log(response)

    }catch(error){
        throw new Error(error);
    }

}