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
