document.getElementById('formulario').addEventListener('submit', cadastrarVeiculo);

function cadastrarVeiculo(e){
    var modeloCar = document.getElementById('modeloCar').value;
    var placaCar =  document.getElementById('placaCar').value;
    //console.log(modeloCar, placaCar);

    //pegar hora:
    var time = new Date();

    //criar novo obj
    carro = {
        modelo: modeloCar,
        placa: placaCar,
        hora: time.getHours(),
        minutos: time.getMinutes()
    }
    //console.log(carro)

    //armazenar dados no próprio navegador ( como banco de dados)
    //localStorage.setItem('teste' , 'Olá Mundo!');
    
    //pegar os dados armazenados
    //localStorage.getItem('teste');

    //remover um item
    //localStorage.removeItem('teste');

    if(localStorage.getItem('patio2')== null){
        var carros = [];
        carros.push(carro);
        //fazer com que o conteúdo do objeto retorne uma string
        localStorage.setItem('patio2', JSON.stringify(carros));
    }else{
        //abaixo está novamente retornando de sting par obj
        var carros = JSON.parse( localStorage.getItem('patio2'));
        carros.push(carro);
        //aqui passando como string novamente
        localStorage.setItem('patio2', JSON.stringify(carros));
    }
    document.getElementById('formulario').reset();

    mostraPatio();

    e.preventDefault();
}

function apagarVeiculo(placa){
    var carros = JSON.parse(localStorage.getItem('patio2'));
    for (var i=0; i<carros.length; i++){
        if(carros[i].placa == placa){
            carros.splice(i, 1);
        }
        localStorage.setItem('patio2' , JSON.stringify(carros));
    }
    mostraPatio();
}

function mostraPatio(){
    var carros = JSON.parse(localStorage.getItem('patio2'));
    var carrosResultado = document.getElementById('resultados');

    carrosResultado.innerHTML = '';
    
    for (var i = 0; i < carros.length; i++){
        //pegando os dados 
        var modelo = carros[i].modelo;
        var placa = carros[i].placa;
        var hora = carros[i].hora;
        var minutos = carros[i].minutos;

        //colocandos os dados no html(preenchendo)
        carrosResultado.innerHTML += '<tr><td>' + modelo + 
                            '</td><td>' + placa +
                            '</td><td>' + hora + ':' + minutos +
                            '</td><td><button class="btn btn-danger" onclick= "apagarVeiculo(\'' + placa + '\')">Excluir</button></td>' + 
                            '</tr>'
                                
    }
}