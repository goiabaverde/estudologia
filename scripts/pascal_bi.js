// Pascal function will return a pascal's triangle based on the number of rows that the user passed
document.addEventListener("DOMContentLoaded", ()=>{
    try{
        document.querySelector('#pascal_table').style.display = 'none';
    }catch (e){console.log(e)}
    
})

function pascal(){
    document.querySelector('#pascal_table').style.display = 'block';
    document.querySelector('#pascal_table').innerHTML = ''
    n_row = document.querySelector('#row').value
    if(n_row < 0){{
        document.querySelector('#row').value = ''
        window.alert("O número de linhas deve ser maior que 0")
        return 1;
    }}
    for(var i = 0; i < n_row; i++){
        var row = document.createElement('tr')
        document.querySelector('#pascal_table').append(row)
        let paragraph = document.createElement('th')
        paragraph.className = 'row_marker'
        paragraph.innerHTML = i
        paragraph.setAttribute('title', `Soma dos termos da linha: ${2**i}`)
        row.append(paragraph)
        for(var j = 0; j< i+1; j++){
            const td = document.createElement('td')
            let value = combination(i,j)
            td.textContent = value
            td.setAttribute('title', `C(${i},${j})`)
            row.append(td)
        }
        // Check if is the last row to do the output of the number of the colunms
        if(i == n_row - 1){
                var row = document.createElement('tr')
                document.querySelector('#pascal_table').append(row)
                const p = document.createElement('p')
                row.append(p)
            for(var k = 0; k < i + 1 ; k++){
                const td = document.createElement('th')
                td.textContent = k
                row.append(td)
            }
        }
    }

    
}

// Some math operations that will be used

function fact(x) {
    if(x==0) return 1;
    return x * fact(x-1);
 }

function combination(n,k){
    if(n < k){
        return 1
    }else{
        return Math.round( fact(n)/[fact((n-k)) * fact(k)])
    }
}

// Binomial function is based on the Newton's Theoremn
function binomial(){
// Clean the data before do new operations

    document.querySelector('.resu').innerHTML = ''
    var coef = document.querySelector('#binomial_coef').value
    if(coef < 0){
        window.alert("O coeficiente da exponenciação precisa ser maior ou igual a 0.")
        return 1
    }

    for(var i = 0; i <= coef; i++){
        let number = combination(coef, i)
        let coef_a = coef - i
        let coef_b = i

        // Make some changes to make the result more similiar to a algebra output
        number = number == 1? '' : number
        coef_a = coef_a == 1? '' : coef_a
        coef_b = coef_b == 1? '' : coef_b
    
        if(coef_a === 0 && coef_b != 0){
            var result = `${number}b<sup>${coef_b}</sup>`
        }else if(coef_a != 0 && coef_b === 0){
            var result = `${number}a<sup>${coef_a}</sup>`
        }else{
            var result = `${number}a<sup>${coef_a}</sup>b<sup>${coef_b}</sup>`
        }

        const div = document.createElement('div')
        div.className = 'div_binomial'
        coef_a = coef_a == ''? 1 : coef_a
        coef_b = coef_b == ''? 1 : coef_b 
        div.setAttribute('title', `C(${coef},${i})*a^${coef_a}*b^${coef_b}`)
    
        div.innerHTML = result

        // Preparing where will have a plus signal or not
        if(i != coef){
            var content = document.querySelector('.resu')
            content.append(div)
            div_plus = document.createElement('div')
            div_plus.className = 'div_plus'
            div_plus.innerText= '+'
            content.append(div_plus)
            if(coef> 15){
                div.style.width = ((((result.length / 5) + 1) * 8) + 80) + 'px'
            }
            
        }else{
        if(coef > 15){
            div.style.width = ((((result.length / 5) + 1) * 8) + 80) + 'px'
        }
            var content = document.querySelector('.resu')
            content.append(div)
           
        }
    }
    // Change some properties of the style
    let elements = document.querySelectorAll('.div_binomial')
    elements[0].style.borderTopLeftRadius = '30px'
    elements[0].style.borderBottomLeftRadius = '30px'
    elements[0].style.paddingLeft = '20px'
    elements[elements.length - 1].style.borderTopRightRadius = '30px'
    elements[elements.length - 1].style.borderBottomRightRadius = '30px'
    elements[elements.length - 1].style.paddingRight = '20px'

//If the user is logged data will be added to the db 
    
}