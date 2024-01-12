function select_grid(grid){
    try{
        document.querySelector('.input_area').innerHTML = '';
    }catch (e){console.log(e)}
    
    //console.log(grid)
    //document.querySelector('.p_operation_result').style.display = 'none';
    const grid_type = grid
    //var grids = document.querySelectorAll('.grid')
    //grids.forEach(grid=>{
    //    grid.style.display = 'none'
    //})
    //console.log(grids, grid_type)
    //document.querySelector(`#grid-${grid_type}`).style.display = 'block';
    const form = document.createElement("form");
    form.setAttribute('onsubmit', 'return false')
    document.querySelector('.input_area').append(form)
    const div = document.createElement('div')
    div.className = 'grid'
    div.id = `class-${grid_type}`
    form.append(div)

    for(var i = 0; i < parseInt(grid); i++){
        for(var j = 0; j < parseInt(grid); j++ ){
            let input = document.createElement('input')
            input.setAttribute('type', 'number')
            input.setAttribute("name", `item-${grid}x${grid}-${i+1}_${j+1}`)
            input.setAttribute('onkeypress', 'change_width()')
            input.className = `c${j+1}-${grid}x${grid}`
            input.id = `item-${grid}x${grid}-${i+1}_${j+1}`
            div.append(input)
            input.required = true
     
        }
        const br = document.createElement('br')
        div.append(br)
        
    }
    const input = document.createElement('button')
    input.setAttribute('type', 'submit')
    input.setAttribute('onclick', 'get_values()')
    input.id = 'submit_det'
    input.className = 'btn btn-primary'
    input.innerHTML = 'Calculate'
    div.append(input)
}


try{
    const { matrix, create, wienDisplacementDependencies } = require("mathjs")
    const { values } = require("regenerator-runtime")
}catch (e){
    console.log(e)
}


 function balancearEquacaoQuimica(equacao) {
    // Dividir a equação em reagentes e produtos
    const partes = equacao.split('=');
    const reagentes = partes[0].trim().split('+');
    const produtos = partes[1].trim().split('+');

    // Criar uma lista de todos os elementos presentes
    const elementos = new Set();
    reagentes.concat(produtos).forEach((item) => {
        item.trim().split(/(?=[A-Z])/).forEach((elemento) => {
            elementos.add(elemento);
        });
    });

    // Criar matrizes para reagentes e produtos
    const matrizReagentes = [];
    const matrizProdutos = [];

    elementos.forEach((elemento) => {
        const linhaReagente = [];
        const linhaProduto = [];

        reagentes.forEach((reagente) => {
            const coeficiente = parseInt(reagente.trim().match(/\d*$/)[0]) || 1;
            const count = (reagente.match(new RegExp(`${elemento}(?!\\w)`, 'g')) || []).length;
            linhaReagente.push(coeficiente * count);
        });

        produtos.forEach((produto) => {
            const coeficiente = parseInt(produto.trim().match(/\d*$/)[0]) || 1;
            const count = (produto.match(new RegExp(`${elemento}(?!\\w)`, 'g')) || []).length;
            linhaProduto.push(coeficiente * count);
        });

        matrizReagentes.push(linhaReagente);
        matrizProdutos.push(linhaProduto);
    });

    // Converter as matrizes para arrays
    const arrayReagentes = matrizReagentes.map((linha) => linha.slice());
    const arrayProdutos = matrizProdutos.map((linha) => linha.slice());

    // Resolver o sistema de equações usando o método das matrizes
    const resultado = math.lusolve(arrayReagentes, arrayProdutos);

    // Formatando o resultado como uma equação balanceada
    let equacaoBalanceada = '';
    reagentes.forEach((reagente, index) => {
        const coeficiente = resultado[index][0];
        equacaoBalanceada += index === 0 ? `${coeficiente}${reagente.trim()}` : ` + ${coeficiente}${reagente.trim()}`;
    });

    equacaoBalanceada += ' = ';

    produtos.forEach((produto, index) => {
        const coeficiente = resultado[index + reagentes.length][0];
        equacaoBalanceada += index === 0 ? `${coeficiente}${produto.trim()}` : ` + ${coeficiente}${produto.trim()}`;
    });
    console.log(equacaoBalanceada)
    return equacaoBalanceada;
    
}



    
//
//function multiply_matrices(a, b){
   // var product_matrix = []
   // const math = require('mathjs')
    //set the num of rows of the both matrices
  //  a_num_r = a.length
  //  b_num_r = b.length

    //set the num of columns of the both matrices
   // a_num_c = a[0].length
   // b_num_c = b[0].length
    //The matriz result will be C(a_num_r x b_num_c)
    //const matrix = math.matrix([[1, 2], [3, 4]]);
     //   const transpose = math.transpose(matrix);
      //  console.log(transpose);
//}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function  resolve_system(a,b){
    console.log(math.multiply(math.inv(a), b))
    return math.multiply(math.inv(a), b)
    
}

function change_width(){
    console.log('ois')
    let current_class = window.event.target.className
    var inputs = document.querySelectorAll(`.${current_class}`)
    //check witch value is higher
    var lengths = []
    inputs.forEach(input=>{
        lengths.push(parseInt(input.value.length))
    })
    console.log(lengths)
    console.log(Math.max(...lengths))
    if(Math.max(...lengths) >  window.event.target.value.length){
        return 0
    }else{
    var new_width = (window.event.target.value.length * 8)  + 40;
    console.log(window.event.target.value.length, new_width);
   
    console.log(current_class);
    
    console.log(inputs)
    console.log(new_width, current_class, inputs)
    inputs.forEach(input =>{
        input.style.width = `${new_width}px`
    }) 
    
    try{
        if(window.event.target.length )
        if(window.event.target.length > 8){
            
            window.event.target.parentElement.style.width = `${(window.event.target.value.length * 8) + 250}px`
        }
    }catch (e){console.log(e)}
}
}



async function edit(id){
    console.log("GOTO")
    const new_id = parseInt(id)
    console.log(new_id)
    const response = await fetch(`http://127.0.0.1:8000/apps/edit/${new_id}`)
    console.log(response.url)
    window.location.href = `${response.url}`;
}

async function remove(id){
    console.log("REMOVER")
    console.log(id)
    console.log(typeof(id))
    console.log(toString(id))
    console.log(document.querySelector(`h1`))
    console.log(document.querySelector(`#id_${id}`))
    document.querySelector(`#id_${id}`).remove()
    await fetch(`http://127.0.0.1:8000/apps/remove/${parseInt(id)}`)
}

async function edit_matrix(id){
    const response = await fetch(`http://127.0.0.1:8000/apps/edit/matrix/${parseInt(id)}`)
    const data = await response.json()
    if(data.determinant){
        $("body").load("http://127.0.0.1:8000/apps/determinant", function(){
            console.log("DETERMINANT")
            console.log("JQuery")
            select_grid(data.number_rows_a)
            document.querySelector('#grid_select').value = data.number_rows_a
            console.log(data.matrix_a)
            console.log(typeof(data.matrix_a))
            let string  = data.matrix_a
            let matrix = JSON.parse(string)
            console.log(matrix)
            for(var i = 0; i < matrix.length; i++){
                for(var j = 0; j < matrix[0].length; j++){
                   document.querySelector(`#item-${matrix.length}x${matrix[0].length}-${i + 1}_${j + 1}`).value = matrix[i][j]
                }
            }
            // Reset the class of the body to avoid problemns of the change_theme
            document.querySelector('body').className = ''
            if(localStorage.getItem('theme') == 'dark'){
                console.log("troca")
                change_theme('light')
            }
        });
       
    }else{
        console.log(parseInt(data.number_rows_a))
        $("body").load("http://127.0.0.1:8000/apps/product", function(){
           console.log("NOT DET")
           document.querySelector('#row_a').value = parseInt(data.number_rows_a)
           document.querySelector('#co_a').value = parseInt(data.number_colunms_a)
           document.querySelector('#co_b').value = parseInt(data.number_colunms_b)
           document.querySelector('#row_b').value = parseInt(data.number_rows_b)
           generate_matrix('get_data')
           //Put that of the matrix-a
           let matrix_a = data.matrix_a
           matrix_a = JSON.parse(matrix_a)
           let matrix_b = data.matrix_b
           matrix_b = JSON.parse(matrix_b)

           let matrices = [[matrix_a, 'a'], [matrix_b, 'b']]
           matrices.forEach(matrix=>{
            for(var i = 0; i< matrix[0].length; i++){
                for(var j = 0; j < matrix[0][0].length; j++){
                    console.log(matrix[0][i][j])
                    console.log(matrix[0].length)
                    document.querySelector(`#item-${matrix[0].length}x${ matrix[0][0].length}-${i + 1}_${j + 1}-${matrix[1]}`).value = matrix[0][i][j]
                }
            }
           })

           // Reset the class of the body to avoid problemns of the change_theme
           document.querySelector('body').className = ''
           if(localStorage.getItem('theme') == 'dark'){
               console.log("troca")
               change_theme('light')
           }

           function change_width(){
            console.log('ois')
            let current_class = window.event.target.className
            var inputs = document.querySelectorAll(`.${current_class}`)
            //check witch value is higher
            var lengths = []
            inputs.forEach(input=>{
                lengths.push(parseInt(input.value.length))
            })
            console.log(lengths)
            console.log(Math.max(...lengths))
            if(Math.max(...lengths) >  window.event.target.value.length){
                return 0
            }else{
            var new_width = (window.event.target.value.length * 8)  + 40;
            console.log(window.event.target.value.length, new_width);
           
            console.log(current_class);
            
            console.log(inputs)
            console.log(new_width, current_class, inputs)
            inputs.forEach(input =>{
                input.style.width = `${new_width}px`
            }) 
        }
        }
        change_width()
        });
    }
}



async function remove_matrix(id){
    console.log("REMOVER")
    console.log(id)
    console.log(typeof(id))
    console.log(toString(id))
    console.log(document.querySelector(`h1`))
    console.log(document.querySelector(`#id_${id}`))
    document.querySelector(`#id_${id}`).remove()
    await fetch(`http://127.0.0.1:8000/apps/remove/matrix/${parseInt(id)}`)
}

async function edit_function(id){
    const response = await fetch(`http://127.0.0.1:8000/apps/edit/function/${id}`)
    console.log(response.url)
    window.location.href = `${response.url}`;
}


async function remove_function(id){
    document.querySelector(`#id_${id}`).remove()
    await fetch(`http://127.0.0.1:8000/apps/remove/function/${parseInt(id)}`)
}