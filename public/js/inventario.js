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