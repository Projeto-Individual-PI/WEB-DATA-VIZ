function exibir_creditos(creditos) {
    mensagem_creditos.innerHTML = `Creditos: ${creditos}`
}



async  function Carregar_Inventario(id_usuario){
    await fetch("/usuarios/inventario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                IdUsuario: id_usuario
            })
        }).then(function (resposta) {
            // console.log("ESTOU NO THEN DO entrar()!")
            

            if (resposta.ok) {
                // console.log('minha resposta sem json é :' + resposta);
                // console.log('minha resposta com json é:' + json);
                // console.log(inventario);
                resposta.json().then(inventario => {
                    // console.log(inventario)
                    sessionStorage.inventario_id = inventario[0].fkusuario;
                    sessionStorage.inventario_creditos = inventario[0].creditos;
                    var baus = [];

                    for (var i = 0; i < inventario.length; i++){
                        var qtd_baus = {
                            qtd: inventario[i].qtd_baus,
                            fk: inventario[i].fkbau,
                            nome: inventario[i].nome
                        }

                        
                        baus.push(qtd_baus);
                    }
                    baus_vazios = [
                        {
                            qtd: 0,
                            fk: 1,
                            nome: 'Baú Comum'
                        },
                        {
                            qtd: 0,
                            fk: 2,
                            nome: 'Baú Raro'
                        },
                        {
                            qtd: 0,
                            fk: 3,
                            nome: 'Baú Lendário'
                        }

                    ]
                    // console.log(baus);
                    inventario[0].fkbau == null ? sessionStorage.setItem('Usuario_baus', JSON.stringify(baus_vazios)) : sessionStorage.setItem('Usuario_baus', JSON.stringify(baus));
                    exibir_creditos(sessionStorage.inventario_creditos);

                });

            } else {
                console.log("Houve um erro ao tentar carregar o inventario!");
                // resposta.text().then(texto => {
                //     console.error(texto);
                //     finalizarAguardar(texto);
                // });
            }

        }).catch(function (erro) {
            console.log('erro');
        })

        
 
    }
    
    


    async function reduzir_credito(inventario_id, creditos_atuais, bau_preco){
        var creditos_novos = creditos_atuais - bau_preco;

        if (creditos_novos < 0){
            alert('CRÉDITOS INSUFICIENTES PARA REALIZAR A COMPRA')
        }else {

    await fetch("/usuarios/reduzir_credito", {
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
                    exibir_creditos(sessionStorage.inventario_creditos);
                    

                    
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
}

async function reduzir_bau(usuario, fkbau, qtd_baus){
    

await fetch("/usuarios/reduzir_bau", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            IdInventario: usuario,
            Baus_atuais:    qtd_baus,
            Fk_bau:         fkbau

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
            console.log("Houve um erro ao tentar reduzir o bau!");
            // resposta.text().then(texto => {
            //     console.error(texto);
            //     finalizarAguardar(texto);
            // });
        }

    }).catch(function (erro) {
        console.log('erro');
    })

}

async function retirar_premio(raridade){

    try {

       const resposta = await fetch("/usuarios/retirar_premio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                raridadeserver: raridade
            })
        })

        if (!resposta.ok) {
            
            throw new Error('Houve um erro!');              
        }
        const data = await resposta.json();
        var x = data.length - 1
        var i = Number((Math.random() * x).toFixed(0))
        var premio_retirado = data[i];
        return premio_retirado;


    } catch (erro) {
        console.log('erro: ' + erro);
        throw erro;
    }

        
        

    
}
async function Inserir_Inventario(idinventario, premio){
     await fetch("/usuarios/enviar_item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                IdInventarioServer: idinventario,
                PremioServer: premio

            })
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then(data => {
                    return data;
                });

            } else {
                console.log("Houve um erro!");
                
            }

        }).catch((erro) => {
            console.log('erro: ' + erro);
            return erro;
        })

}



async function enviar_bau(idinventario, fkbau){
    await fetch("/usuarios/enviar_bau", {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
            fkinventario: idinventario,
            idbau:          fkbau

           })
       }).then((resposta) => {
           if (resposta.ok) {
            // console.log(resposta)


           } else {
               console.log("Houve um erro!");
               
           }

       }).catch((erro) => {
           console.log('erro: ' + erro);
           return erro;
       })

}



async function consultar_bau(idbau){

    const resposta = await fetch("/usuarios/consultar_bau", {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({
             IdBauServer: idbau
 
         })
     })
     
     if(!resposta.ok){
         throw new Error("Houve um erro!");
     }
         const data = await resposta.json();
        //  console.log('resposta com json: ' + JSON.stringify(data));
         return data;
 
 }

 function fechar_painel_bau_loja(){ 
    painel_bau_loja.classList.toggle("visible_painel_bau_loja")
    setTimeout(() => {
        painel_bau_loja.style.display = 'none';
        painel2.style.display = 'flex';
        setTimeout(() => {
            painel2.classList.toggle("visible_painel")

        },200);

    },750);


}

   function fechar_painel2(){
    painel2.classList.toggle("visible_painel2")
    bau4.classList.toggle("visible_bau")
    setTimeout(() => {
        painel2.style.display = 'none';
        bau4.style.display = 'none';
        bau1.style.display = 'flex';
        bau2.style.display = 'flex';
        bau3.style.display = 'flex';
        Painel_Baus();
        painel.style.display = 'flex';
        setTimeout(() => {
        painel.classList.toggle("visible_painel")
        bau1.classList.toggle("visible_bau")
        bau2.classList.toggle("visible_bau")
        bau3.classList.toggle("visible_bau")
        


   
        },200);
   
    },750);
   
   
   }
// async function consultar_bau(idbau){

//     await fetch("/usuarios/consultar_bau", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             IdBauServer: idbau

//         })
//     }).then((resposta) => {
//         if (resposta.ok) {
//             console.log('resposta sem json: ' + resposta)
//             resposta.json().then(data => {
//                 console.log('resposta com json: ' + data)
//                 console.log(JSON.stringify(data));
//                 return JSON.stringify(data);
//             });

//         } else {
//             console.log("Houve um erro!");
            
//         }

//     }).catch((erro) => {
//         console.log('erro: ' + erro);
//         return erro;
//     })

// }