
async function obterdadosgrafico_barra(){

    try{

    const response = await fetch(`/medidas/ultimas/`, { cache: 'no-store' })

    const data = await response.json()
  
    return data

    }catch(erro){
        throw new Error(erro)
    }

}

async function obterdadosgrafico_donut(id){

    try{
      
    const response = await fetch(`/medidas/ultimas_usuario/${id}`, { cache: 'no-store' })

    const data = await response.json()

    return data
    
    }catch(erro){
        throw new Error(erro)
    }

}

async function atualizar_grafico(myChart, myChart_2){
    const data_grafico_donut = await obterdadosgrafico_donut(sessionStorage.ID_USUARIO)
    const data_grafico_barra = await obterdadosgrafico_barra()


    data_grafico_donut.forEach(item => {
        if(item.Raridade == 'comum'){
         array_data_donut[0].qtd = item.Qtd_itens
        }else if(item.Raridade == 'incomum'){
            array_data_donut[1].qtd = item.Qtd_itens

        }else if(item.Raridade == 'raro'){
            array_data_donut[2].qtd = item.Qtd_itens

        }else if(item.Raridade == 'épico'){
            array_data_donut[3].qtd = item.Qtd_itens

        }else if(item.Raridade == 'lendário'){
            array_data_donut[4].qtd = item.Qtd_itens

        }
    });
data_v = []
for (var i = 0; i < 5; i++){
    data_v.push(array_data_donut[i].qtd)
}


// console.log(myChart.config.data.datasets[0].data)
myChart.config.data.datasets[0].data = data_v;
myChart.update();




// console.log(myChart_2.config.data.datasets)
// console.log(myChart_2.config.data.labels)

array_labels_barra = [];
array_data_barra = [];    

data_grafico_barra.forEach(item => {
    array_labels_barra.push(item.Nome)
    array_data_barra.push(item.Qtd_itens)
});
myChart_2.config.data.datasets[0].data = array_data_barra;
myChart_2.config.data.labels = array_labels_barra;
myChart_2.update();

}

async function plotar_grafico_inventario() {
    

   const data_grafico_barra = await obterdadosgrafico_barra();
   
   const data_grafico_donut = await obterdadosgrafico_donut(sessionStorage.ID_USUARIO)

    const dash1 = document.getElementById('dashboard_1')
    const dash2 = document.getElementById('dashboard_2')



    
    const plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart, args, options) => {
          const {ctx} = chart;
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = options.color || '#99ffff';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };

    array_data_donut = [
        {
            raridade: 'comum',
            qtd: 0
        },
        {
            raridade: 'incomum',
            qtd: 0
        },
        {
            raridade: 'raro',
            qtd: 0
        },
        {
            raridade: 'épico',
            qtd: 0
        },
        {
            raridade: 'lendário',
            qtd: 0
        },



    ];    

    data_grafico_donut.forEach(item => {
        if(item.Raridade == 'comum'){
         array_data_donut[0].qtd = item.Qtd_itens
        }else if(item.Raridade == 'incomum'){
            array_data_donut[1].qtd = item.Qtd_itens

        }else if(item.Raridade == 'raro'){
            array_data_donut[2].qtd = item.Qtd_itens

        }else if(item.Raridade == 'épico'){
            array_data_donut[3].qtd = item.Qtd_itens

        }else if(item.Raridade == 'lendário'){
            array_data_donut[4].qtd = item.Qtd_itens

        }
    });
data_v = []
for (var i = 0; i < 5; i++){
    data_v.push(array_data_donut[i].qtd)
}
   const myChart = new Chart(dash1, config = {
        type: 'doughnut',
        data: {
            labels: [
              'Comum',
              'Incomum',
              'Raro',
              'Épico',
              'Lendário'
            ],
            datasets: [{
              label: 
                'Quantidade de itens: ',
              data: data_v,
              backgroundColor: [
                'grey',
                'blue',
                'orange',
                'red',
                'black'
              ],
              hoverOffset: 4
            }]
          },
        options: {
          plugins: {
            customCanvasBackgroundColor: {
              color: 'transparent'
            },
            legend: {
              labels:{
                color: 'white', 
                font: {
                  size: 20
                }
              }
            }
          }
        },
        plugins: [plugin],
      });


      function atualiza_cor_lendario(cor_lendario) {
        myChart.data.datasets[0].backgroundColor[4] = cor_lendario;
        myChart.update();

        // myChart_2.data.datasets[0].backgroundColor = cor_lendario;
        // myChart_2.update();
      }

      function atualiza_cor_epico(cor_epico) {
      myChart.data.datasets[0].backgroundColor[3] = cor_epico;
      myChart.update();
    }
      var i_lendario = 0
      var i_epico = 0

      setInterval(() =>{

        var cores_lendario =  ['red', 'orange', 'yellow', 'green', 'blue', 'violet']
        const cor_lendario = cores_lendario[i_lendario]
        
        
        if(i_lendario < cores_lendario.length - 1){
            i_lendario++
        }else {
            i_lendario = 0
        }
        atualiza_cor_lendario(cor_lendario);
      },500)

      setInterval(() => {
        var cores_epico =  ['lightblue','purple']
        const cor_epico = cores_epico[i_epico]

        if(i_epico < cores_epico.length - 1){
            i_epico++
        }else {
            i_epico = 0
        }

        atualiza_cor_epico(cor_epico);
      }, 1250);
      

    
    array_labels_barra = [];
    array_data_barra = [];    

    data_grafico_barra.forEach(item => {
        array_labels_barra.push(item.Nome)
        array_data_barra.push(item.Qtd_itens)
    });


   const myChart_2 =  new Chart(dash2, {
        type: 'bar',
        data: {
          labels: array_labels_barra,
          datasets: [{
            label: 'Quantidade de itens lendários.',
            data: array_data_barra,
            borderWidth: 3,
            backgroundColor: '#01c38d',
            borderColor: '#132D46'
        }]
        },
        options: {   
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                  color: 'white'
              },
              ticks: {
                color: 'white'
              }
            },
            x: {
              beginAtZero: true,
              grid: {
                color: 'white'
              },
              ticks: {
                color: 'white'
              }
            }
          
        },
          indexAxis: 'y',
          plugins: {
            customCanvasBackgroundColor: {
              color: 'transparent'
            },
            legend: {
              labels:{
                color: 'white', 
                font: {
                  size: 20
                }
              }
            }
          }
        },
        plugins: [plugin],
      });



    

      setInterval(() => {
        atualizar_grafico(myChart, myChart_2);
      }, 3000);
}


