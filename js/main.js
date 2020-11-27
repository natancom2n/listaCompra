document.getElementById('formulario').addEventListener('submit', cadastrarVeiculo);

function cadastrarVeiculo(e){
    var labelItem = document.getElementById('labelItem').value;
    var labelPrice =  document.getElementById('labelPrice').value;
    //console.log(modeloCar, placaCar);

    //pegar hora:
    var time = new Date();

    if(!labelItem ){
        alert("Preencha o nome do item");
        return false;
    }

    //criar novo obj
    //carro = {
    //    modelo: modeloCar,
    //    price: placaCar,
        //hora: time.getHours(),
        //minutos: time.getMinutes()
    //}
        produto = {
            item: labelItem,
            price: labelPrice,
            dia: time.getDay(),
            mes: time.getMonth() 

        }
    
    //console.log(carro)

    //armazenar dados no próprio navegador ( como banco de dados)
    //localStorage.setItem('teste' , 'Olá Mundo!');
    
    //pegar os dados armazenados
    //localStorage.getItem('teste');

    //remover um item
    //localStorage.removeItem('teste');

    if(localStorage.getItem('carrinho')== null){
        var produtos = [];
        produtos.push(produto);
        //fazer com que o conteúdo do objeto retorne uma string
        localStorage.setItem('carrinho', JSON.stringify(produtos));
    }else{
        //abaixo está novamente retornando de sting par obj
        var produtos = JSON.parse( localStorage.getItem('carrinho'));
        produtos.push(produto);
        //aqui passando como string novamente
        localStorage.setItem('carrinho', JSON.stringify(produtos));
    }
    document.getElementById('formulario').reset();

    mostraPatio();

    e.preventDefault();
}

function apagarProduto(item){
    var produtos = JSON.parse(localStorage.getItem('carrinho'));
    for (var i=0; i<produtos.length; i++){
        if(produtos[i].item == item){
            produtos.splice(i, 1);
        }
        localStorage.setItem('carrinho' , JSON.stringify(produtos));
    }
    mostraPatio();
}

function mostraPatio(){
    var produtos = JSON.parse(localStorage.getItem('carrinho'));
    var produtosResultado = document.getElementById('resultados');

    produtosResultado.innerHTML = '';
    
    for (var i = 0; i < produtos.length; i++){
        //pegando os dados 
        var item = produtos[i].item;
        var price = produtos[i].price;
        var dia = produtos[i].dia;
        var mes = produtos[i].mes;

        //colocandos os dados no html(preenchendo)
        produtosResultado.innerHTML += '<tr><td>' + item + 
                            '</td><td>' + price +
                            '</td><td>' + dia + '/' + mes +
                            '</td><td><button class="btn btn-danger" onclick= "apagarProduto(\'' + item + '\')">Excluir</button></td>' + 
                            '</tr>'
                                
    }
}