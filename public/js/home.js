function detalhamento(jogo) {
        
    if(jogo.id == 'lol') {
        
            lol_painel.style.display = 'flex'
            lol.style.display = 'none'
            bo2.style.display = 'none'
            ark.style.display = 'none'
            imagem_jogo_lol.classList.add('img_lol')
            
            setTimeout(() => {
                              lol_painel.style.opacity = "1";
                             }, 250);

                            
        
        
    }else if (jogo.id == 'bo2') {
        bo2_painel.style.display = 'flex'
        lol.style.display = 'none'
        bo2.style.display = 'none'
        ark.style.display = 'none'
        imagem_jogo_bo2.classList.add('img_bo2')

        setTimeout(function(){
                                bo2_painel.style.opacity = "1";
                              }, 250);
                              
        
    }else {
        ark_painel.style.display = 'flex'
        lol.style.display = 'none'
        bo2.style.display = 'none'
        ark.style.display = 'none'
        imagem_jogo_ark.classList.add('img_ark')

        setTimeout(function(){
                                ark_painel.style.opacity = "1";
                                    
                             }, 250);

        
    }
}
function fechar(nome) {
    if (nome.id == 'bo2_fechar') {
        bo2_painel.style.opacity = '0'
        setTimeout(function() {
                                    bo2_painel.style.display = 'none'
                                    lol.style.display = 'flex'
                                    bo2.style.display = 'flex'
                                    ark.style.display = 'flex'
                                    imagem_jogo.classList.toggle('img_bo2')

                                }, 250);
        box2.style.backgroundImage = 'linear-gradient(rgb(0,0,0,0.80), rgb(0,0,0), rgb(0,0,0,0.95))'
    } else if (nome.id == 'lol_fechar') {
        lol_painel.style.opacity = "0"; // Configura a opacidade para 0 para iniciar a transição
        setTimeout(function() {
                                    lol_painel.style.display = 'none'
                                    lol.style.display = 'flex'
                                    bo2.style.display = 'flex'
                                    ark.style.display = 'flex'
                                    imagem_jogo.classList.toggle('img_lol')

                                }, 250); // Espera 500 milissegundos (0.5 segundos) para garantir que a transição seja concluída
        box2.style.backgroundImage = 'linear-gradient(rgb(0,0,0,0.80), rgb(0,0,0), rgb(0,0,0,0.95))'
                        
        
    } else {
        ark_painel.style.opacity = '0'
        setTimeout(function() {
                                    ark_painel.style.display = 'none'
                                    lol.style.display = 'flex'
                                    bo2.style.display = 'flex'
                                    ark.style.display = 'flex'
                                    imagem_jogo.classList.toggle('img_ark')

                                }, 250);
        box2.style.backgroundImage = 'linear-gradient(rgb(0,0,0,0.80), rgb(0,0,0), rgb(0,0,0,0.95))'

    }


  

}