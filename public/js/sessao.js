// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var cpf = sessionStorage.CPF_USUARIO;

    var b_usuario = document.getElementById("b_usuario");
    var cpf_usuario = documento.getElementById("cpf_usuario")

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
        cpf_usuario.innerHTML = cpf;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

function Autenticar_Usuario(usuario, email, id){

        if (usuario == undefined || email == undefined || id == undefined)
            {
                window.location = './login.html';
                
            }
            else {
                console.log('ESTOU AUTENTICADO');
                Carregar_Inventario(id);
                atualiza_creditos(sessionStorage.inventario_creditos)
            }

}
    // carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
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
              
                resposta.json().then(async inventario => {

                    if(inventario.length < 1){
                        try{

                            const req = await fetch("/usuarios/criar_inventario",{
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    idusuarioserver: id_usuario
                                })
                            })

                            setTimeout(() => {
                                document.location.reload();

                            }, 1000)
                            
                        }catch(error){
                            throw new Error(error)
                        }

                    }else{


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
                    // exibir_creditos(sessionStorage.inventario_creditos);
                }

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

    function atualiza_creditos(creditos){
        header_creditos.innerHTML = `Créditos: ${creditos}`
    }