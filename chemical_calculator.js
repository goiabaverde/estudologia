const { floor } = require("mathjs")

console.log("TESTEE")

    class Node{
        constructor(data){
            this.data = data
            this.next = null
        }
    }
    
    class Conjunto{
        // Conjunto is a simple linked list that will store the atons of the reagent and product, existing a set for each one
        constructor(){
            this.head = null
            this.size = 0
        }
        
        // Check if a element exist on the Conjunto
        includes(element){
            let pointer = this.head
            if(pointer == null){return 'the set is empty'}
            while(pointer.next != null){
                if(pointer.data == element || pointer.data == element.data){return true}
                pointer = pointer.next
               
            }
            if(pointer.data == element || pointer.data == element.data){return true}
            return false
        }
    
        // Add to the end of the set a element
        append(element){
            if(this.head == null){
                this.head = new Node(element)
            }else{
                if(this.includes(element)){
                    return 'Não adiciona'}
                let pointer = this.head
                while(pointer.next != null){
                    pointer = pointer.next
                }
                pointer.next = new Node(element)
            }
            this.size += 1
        }
    
        // Math operetion of intersection
        intersection(other){
            let result = new Conjunto()
            if(this.head == null || other.head == null){
                return result
            }
            let pointer = this.head
            while(pointer.next != null){
                if(other.includes(pointer.data)){
                    result.append(pointer.data)
                }
                pointer = pointer.next
            }
            if(other.includes(pointer.data)){
                result.append(pointer.data)
            }
            return result
        }
        
        // Math operation of symetricDiferrenc beetween tow sets
        symmetricDifference(other){
            var result = new Conjunto()
            if(this.head == null || other.head == null){
                return result
            }
            let inter = this.intersection(other)
            let sets = [this, other]
            for(var i = 0; i < sets.length; i++){
                let pointer = sets[i].head
                while(pointer.next != null){
                    if(inter.includes(pointer.data) == false){
                        result.append(pointer.data)
                    }
                    pointer = pointer.next
                    console.log(result.exibir())
                }
                if(inter.includes(pointer.data) == false){
                    result.append(pointer.data)
                }
            }
            console.log(result)
            return result
        }
    
        // Show the data storated on the set
        exibir(){
            if(this.size == 0){return '{}'}
            let result = '{'
            let pointer = this.head
            while(pointer.next != null){
                result += `${pointer.data}, `
                pointer = pointer.next
            }
            result += pointer.data
            result += '}'
            return result;
          };
    
        // Show in form of a array
        exibir_lista(){
            if(this.size == 0){return []}
            let result = []
            let pointer = this.head
            while(pointer.next != null){
                result.push(`${pointer.data}`)
                pointer = pointer.next
            }
            result.push(`${pointer.data}`) 
            return result;
          };
    
        isEmpty(){
            if(this.size == 0){return true}
            else{return false}
        }
    }
    
    // 
    class Coeficientes{
        constructor(num_elem_rea, num_elem_pro){
            this.qtd = num_elem_pro + num_elem_rea
            let lista = []
            for(var i = 0; i < this.qtd; i++){
               lista.push(0)
            }
            this.coef = lista
        }
    
        change(index, data){
            if(this.coef[index] == undefined){
                return 1
            }else{
                this.coef[index] = data
            }
    
        }
    
        get_index(index){
            if(this.coef[index] == undefined){
                return ''
            }else{
                return this.coef[index]
            }
        }
    
        exibir(){
            return this.coef
    
        }
    
        letras_nao_nulas(){
            let result = []
            for(var i = 0; i < this.coef.length; i++){
                if(this.coef[i] != 0){
                    result.push(65 + i)
                }
            }
            return result
        }
    
        resolver_eq(eq, coefficients){
                if(coefficients.letras_nao_nulas().length == coefficients.qtd){
                    return false
                }
                if(eq == undefined){
                    document.querySelector("div.msg").innerHTML = "<p class = 'alert alert-danger'>Há algum erro na equação química, verifique e tente novamente.</p>"
                    throw new Error("There is something wrong with the equation, please check")
                }
                eq = eq.trim()
                // Check how many incognitas has in the equation
                var incognita = []
                for(var i = 0; i < eq.length; i++ ){
                    if(isCapitalLetter(eq[i])){
                        if(this.get_index(eq[i].charCodeAt(0) - 65) == 0){
                            incognita.push(eq[i].charCodeAt(0) - 65)
                        }
                        if(incognita.length > 1){
                            // If in the equation has more than 1 incognita, the equation will not be resolved
                            return 1}
                    }
                }
                if(incognita.length == 0){return false}
                // Declare the variables that will be used in the math process
                var A 
                var B  
                var C 
                var D
                var E
                var F
                incognita = incognita[0]
                // Add the values to the variables based on the variables that are not null
                let letras_n_nulas = this.letras_nao_nulas()
                if (letras_n_nulas.length == this.qtd){true}
                letras_n_nulas.forEach(letra=>{
                if(letra == 65){  A = this.get_index(letra - 65)}
                if(letra == 66){  B = this.get_index(letra - 65)}
                if(letra == 67){  C = this.get_index(letra - 65)}
                if(letra == 68){  D = this.get_index(letra - 65)}
                if(letra == 69){  E = this.get_index(letra - 65)}
                if(letra == 70){  F = this.get_index(letra - 65)}
                })
        
    
                let parts = eq.split('-')
                // Check where is the incognita
                for(var m=0; m < 2; m++){
                    if(parts[m].includes(String.fromCharCode(65 + incognita))){
                        var local_incognita =  m
                        var local_sem_incognita = m == 1? 0 : 1
                        break
                    }
                }
                // Check if the incognita is alone 
    
                if(parts[local_incognita].split('+').length > 1){
                    // Check if has another term with the incognita
                    var incognita_member = parts[local_incognita].split('+')
                    for(var n = 0; n < incognita_member.length; n++){
                        if(incognita_member[n].includes(String.fromCharCode(65 + incognita)) == false){
                            
                            var term = incognita_member[n]
                            const index = incognita_member.indexOf(term)
                            const index_to_remove = parts[local_incognita].split('+').indexOf(term)
    
                            let test = incognita_member.splice(index_to_remove,1)
    
                            parts[local_incognita] = incognita_member
    
                            
                            term = term.trim()
                            if(term.includes(")")== false){term += ')'}
                            if(term.includes("(") == false){
                                let temp = "("
                                temp += term
                                term = temp
                            }
                            
                            parts[local_sem_incognita] += `-${term}`
                        }
                   
                    }
        
                }
                // Check term that multiplys the incognita
                var divisor = ''
                if (typeof(parts[local_incognita]) == 'object'){
                    parts[local_incognita] = parts[local_incognita][0]
                }
                for(var m = 0; m < parts[local_incognita].length; m++){
                    if(isNum_1_9(parts[local_incognita][m])){
                        divisor += `${parts[local_incognita][m]}`
                    }
        
                } 
                    try{
                        var valor = eval(parts[local_sem_incognita])
                        this.change(incognita, valor/parseInt(divisor))
                        
                    }catch (e){
                        console.log(e)
                    }   
            }
        
            
            
        get_the_lowests_integers(){
            const max = Math.max.apply(null, this.coef);
            console.log(max)
            function mdc(a,b){
                if(a < b){
                    const temp = a
                    a = b
                    b = temp
                }
                if(a % b == 0){
                    return b
                }else{
                    return mdc(b, a % b)
                }
            }


            function isFloat(n){
                if(parseInt(n) != parseFloat(n)){
                    return true
                }
                return false
            }

            function get_corrector(n){
                let loop = true
                let counter = 0
                while(loop){
                    if(isFloat(n * 10**counter) != true){
                        loop = false
                        var temp = n * 10 ** counter
                        var temp_denominador = 10 ** counter
                    }else{counter++}

                }
                const MDC = mdc(temp, temp_denominador)
                return  temp_denominador/MDC 
                
            }
            const corrector = get_corrector(max)
            console.log(corrector)
            this.coef = this.coef.map((x) => x * corrector)
        }
    }
    
    function isCapitalLetter(letter){
        letter = String(letter)
        if(65 <= parseInt(letter.charCodeAt(0)) && parseInt(letter.charCodeAt(0)) <= 90){
            return true}else{
                return false
            }
    }
    
    function isLowercaseLetter(letter){
        letter = String(letter)
        if(letter.charCodeAt(0) == 117){return false}
        else{if(97 <= parseInt(letter.charCodeAt(0)) && parseInt(letter.charCodeAt(0))  <= 122){
            return true}else
            {return false}
        }
    }
    
    function isNum_2_9(char){
        char = String(char)
        if(50 <= parseInt(char.charCodeAt(0)) && parseInt(char.charCodeAt(0)) <= 57){return true}
        else{return false}
    }
    
    function isNum_1_9(char){
        char = String(char)
        if(49 <= parseInt(char.charCodeAt(0)) && parseInt(char.charCodeAt(0)) <= 57){return true}
        else{return false}
    }
    
    function check_if_is_equal(str){
        let numberOfLetterInEachMember = []
        var letters = []
        let terms = str.split("-")
       
        // To check if is equal the number of inconitas pair
        terms.forEach(term=>{
            let counter = 0
            let expressions = term.split('+')
            expressions.forEach(ex=>{
                for(var i = 0; i < ex.length; i++){
                    if(isCapitalLetter(ex[i])){
                        counter++
                        break
                    }
                }
            })
            numberOfLetterInEachMember.push(counter)
        })
    
    
        if(numberOfLetterInEachMember[0] != numberOfLetterInEachMember[1]){return false}
        let result = []
        terms.forEach(term=>{
            for(var i = 0; i < term.length ; i++){
                if(isCapitalLetter(term[i])){
                    let item = {}
                    let number = ''
                    let k = i + 2
                    while(isNum_1_9(term[k])){
                        number += term[k]
                        k++
                    }
                    number = parseInt(number)
                    item[term[i]] = number
                    if(letters.length == 0){
                        letters.push(item)
                    }else{
                        var added = false
                        for(var j = 0 ; j < letters.length; j++){
                            if(Object.keys(letters[j])[0] == term[i]){
                                letters[j].Object.keys(letters[j])[0] += number
                                added = true
                                break
                            }
                        }
                        if(added == false){letters.push(item)}
                    }
                }
            }
        })
        let value = letters[0][Object.keys(letters[0])[0]]
        for(var i = 0; i < letters.length; i++){
            if(letters[i][Object.keys(letters[i])[0]] != value){
                return false
            }
    
            result.push(Object.keys(letters[i])[0].charCodeAt(0)-65) 
        }
        return result
    }
    
    function add_to_atons_of_element(atons_list, atons_to_add){
        // Get the list of the atons and check with there's already a aton like the one that is being added to the list
        // If there's already aton in the list like the new aton, then the result will added
        // If not a new element to the list will be pushed
        if(atons_to_add.length == undefined){
            let temp = atons_to_add
            atons_to_add = [temp]
        }
        if(atons_list.length == 0){
            for(var k = 0; k < atons_to_add.length; k++){
                atons_list.push(atons_to_add[k])
            }   
        }else{
            for(var i = 0; i < atons_to_add.length; i++){
                var breaked = false
                for(var j = 0; j < atons_list.length; j++){
    
                    if(Object.keys(atons_list[j])[0] == Object.keys(atons_to_add[i])[0]){
                        atons_list[j][Object.keys(atons_to_add[i])[0]] += atons_to_add[i][Object.keys(atons_to_add[i])[0]]
                        var breaked = true
                        break    
                    }
                }
                if(breaked == false){atons_list.push(atons_to_add[i])}
            }
        }
    }
    
    // Check if the result is right if don't will try to find the values assuming some numbers to the coefficient
    function check_if_is_balenced(equations, coefficients){
        for(var i = 0; i < equations.length; i++){
            let members = equations[i].split("-")
            let result = []
            members.forEach(member=>{
                try{
                for(var k = 0; k < member.length; k++){
                    if(isCapitalLetter(member[k])){
                        let test = coefficients.get_index(member[k].charCodeAt(0) - 65)
                        member = member.replaceAll(member[k], `${test}`)
                    }
                    
                }
                result.push(eval(member))
                }catch{
                    document.querySelector("div.msg").innerHTML = "<p class = 'alert alert-danger'>Há algum erro na equação química, verifique e tente novamente.</p>"
                    throw new Error("There is something wrong with the equation, please check")
                }
            })
            
            if(result[0] != result[1]){
                for(var l = 0; l < coefficients.qtd; l++){
                    coefficients.change(l, 0)
                }
                if(coefficients.qtd != equations.length){
                    let a = getRandomInt(0, coefficients.qtd)
                    let b = getRandomInt(0, coefficients.qtd)
                    while(a == b){
                        
                        a = getRandomInt(0, equations.length)
                        b = getRandomInt(0, equations.length)
                    }
                    coefficients.change(a, 1)
                    coefficients.change(b, 1)
                    for(var k = 0; a < equations.length ; k++){
                        if(coefficients.resolver_eq(equations[k], coefficients) == false){
                            // the equations has been done
                            break
                        }else{
                            continue
                            
                            }
                    }
                    check_if_is_balenced(equations, coefficients)
                }
            }
        }
    }
    
    function getRandomInt(min, max){
        // Use Math.floor to round down to the nearest whole number
        // Use Math.random() to generate a random decimal between 0 (inclusive) and 1 (exclusive)
        // Multiply by the range (max - min + 1) to cover the entire range
        // Add the minimum value to shift the range to [min, max]
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    
    
    var abreviacoes_elementos = [
        "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "K", "Ar", "Ca",
        "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Ni", "Co", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr",
        "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "I", "Te", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd",
        "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg",
        "Tl", "Pb", "Bi", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg",
        "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"
    ]
    
    var reagente = ""
    var produto = ""
    console.log("UAI")
    function balanceChemicalEquation(){
        document.querySelector("div.msg").textContent = ''
        document.querySelector("p.p_operation_result").textContent = ''
        document.querySelector(".p_operation_result").style.display = 'none'
        document.querySelector(".result_area_equation").style.display = 'none'
        let equacao = document.querySelector(".chemistry_equation_input").value.trim()
        console.log(equacao)
        if(equacao.indexOf("=") == -1){
            document.querySelector("div.msg").innerHTML = "<p class = 'alert alert-danger'>É necessário ter um sinal de igual na equação.</p>"
            throw new Error("The equation must have a equal sign")
        }
    
        equacao = equacao.split('=')
        console.log(equacao)
        // check if the equation has all the plus signal necessaries
        reagente = equacao[0].trim()
        
        produto = equacao[1].trim()
        console.log(reagente)
        console.log(produto)
    
        let reagentes = reagente.split('+')
        let produtos = produto.split('+')
        var atomos_reagentes = new Conjunto()
        var atomos_produtos = new Conjunto()
        var elementos_reagentes = []
        var elementos_produtos = []
        var elementos_quantificados = [elementos_reagentes, elementos_produtos]
        var elementos = [reagentes, produtos]
        var atomos = [atomos_reagentes, atomos_produtos]
    
    
        for(var j = 0; j < 2; j++){
            elementos[j].forEach(element=>{
            var atomos_do_elemento = []
            element = element.trim()
            for(var i = 0; i < element.length; i++){
                    if(element[i] == '('){
                        var begin  = i + 1
                        for(var k = begin; k <= element.length  ; k++){
                            if(element[k] == ')'){
                                var end = k
                                break
                            }
                        }
    
                    if(end == undefined){
                        document.querySelector("div.msg").innerHTML = "<p class = 'alert alert-danger'>É necessário fechar os parênteses que foram abertos.</p>"
                        throw new Error("You need to close the parentheses")
                    }
                    
                    // Get the number that multiplys the elements inside the parentheses
    
                    if(isNum_2_9(element[end+1])){
                        let k = end+1
                        let number = ''
                        while(isNum_2_9(element[k])){
                            number += element[k]
                            k++
                        }                        
                        if(number.length != 0){
                            var number_parentheses = parseInt(number)
                        }else{var number_parentheses = 1}
                    }
    
                    // Get the elements inside of the parentheses
                    var elements_inside_parentheses = []
                    for(var p = begin; p < end ; p++){
                        if(abreviacoes_elementos.includes(element[p] + element[p+1])){
                            let item = {}
                            if(isCapitalLetter(element[p]) && isLowercaseLetter(element[p+1])){
                                if(isNum_2_9(element[p+2])){
                                    let k = p + 2
                                    let number = ''
                                    while(isNum_2_9(element[k])){
                                        number += element[k]
                                        k++
                                    }
                                    item[element[p] + element[p+1]] = parseInt(number)
                                    atomos[j].append(element[p] + element[p+1])
                                    // Back one position of the variable k
                                    p = k - 1
                                }else{
                                    item[element[p] + element[p+1]] = 1
                                    atomos[j].append(element[p] + element[p+1])
                                    // Make a sum to the p to jump the lowercase Letter and sabe a interation
                                    p++
                                }
                                
                                elements_inside_parentheses.push(item)
                                
                            }
                     }else if(abreviacoes_elementos.includes(element[p])){
                            let item = {}
                            if(isCapitalLetter(element[p])){
                                if(isNum_2_9(element[p+1])){
                                    let k = p + 1
                                    let number = ''
                                    while(isNum_2_9(element[k])){
                                        number += element[k]
                                        k++
                                    }
                                    item[element[p]] = parseInt(number)
                                    atomos[j].append(element[p])
                                    // Back one position of the variable k
                                    p = k - 1
                                }else{
                                    item[element[p]] = 1
                                    atomos[j].append(element[p])
                                }
                                elements_inside_parentheses.push(item)
                            }
                        }else{
                            document.querySelector("div.msg").innerHTML = `<p class = 'alert alert-danger'>${element[p]} não é um elemento químico válido, por favor corrija.</p>`
                            throw new Error(`${element[p]} don't exist, please correct`)
                        }
                    }
                    if(end == undefined){
                        document.querySelector("div.msg").innerHTML = "<p class = 'alert alert-danger'>É necessário fechar os parênteses que foram abertos.</p>"
                        throw new Error("There is a parentheses without close")
                    }else{
                        elements_inside_parentheses.forEach(elem=>{
                            elem[Object.keys(elem)[0]] = elem[Object.keys(elem)[0]] * number_parentheses 
                            
                        })
                        add_to_atons_of_element(atomos_do_elemento, elements_inside_parentheses)
                        
                    }
                    i = end + 1
                }else if(isCapitalLetter(element[i]) && isLowercaseLetter(element[i+1])){
                    if(abreviacoes_elementos.includes(element[i] + element[i+1])){
                        let item = {}
                
                            if(isNum_2_9(element[i+2])){
                                let k = i+2
                                let number = ''
                                while(isNum_2_9(element[k])){
                                    number += element[k]
                                    k++
                                }
                                item[element[i] + element[i+1]] = parseInt(number)
                                atomos[j].append(element[i] + element[i+1])
                                i =  k - 1
                                
                            }else{
                                item[element[i] + element[i+1]] = 1
                                atomos[j].append(element[i] + element[i+1])
                                i += 1
                            }
                            add_to_atons_of_element(atomos_do_elemento, item)
    
                            
                       }else{
                            console.log(`${element[i] + element[i+1]} don't exist, please correct`)
                            break}
                        
                }else if(isCapitalLetter(element[i])){
                    if(abreviacoes_elementos.includes(element[i])){
                        let item = {}
                        try{
                            if(isNum_2_9(element[i+1])){
                                let k = i+1
                                let number = ''
                                while(isNum_2_9(element[k])){
                                    number += element[k]
                                    k++
                                }
                                                         
                                item[element[i]] = parseInt(number)
                                atomos[j].append(element[i])
                                i = k -1  
                                
                            }else{item[element[i]] = 1
                                atomos[j].append(element[i])
                            }
    
                            add_to_atons_of_element(atomos_do_elemento, item)
                            console.log(atomos[j].exibir())
                        }catch(e){console.log(e)}
                    }else{
                        document.querySelector("div.msg").innerHTML = `<p class = 'alert alert-danger'>${element[i]} não é um elemento químico válido, por favor corrija.</p>`
                        throw new Error(`${element[i]} don't exist, please correct`)
                    }
                }
            }
            try{
                elementos_quantificados[j].push(atomos_do_elemento)
            }catch (e){console.log(e)}
            })
        }
    
        // Variable dif storages the symmetricDifference beetween two sets, with the symetricDifference is empty, the both sets are equals 
        const dif = atomos_produtos.symmetricDifference(atomos_reagentes)
    
        // Define the equations based on the atoms quantified 
        if(dif.isEmpty()){
            var equacoes = []
            var counter = 0
            var resultado = ''
            const atomos_presentes = atomos_produtos.exibir_lista()
            for(var k = 0; k < atomos_presentes.length; k++){
                elementos_quantificados.forEach(elemento=>{
                    for(var i = 0; i < elemento.length; i++){
                        for(var j = 0; j < elemento[i].length; j++){
                            if(elemento[i][j][atomos_presentes[k]] != undefined){
                                if(resultado.length == 0 || resultado[resultado.length - 1] == '('){
                                    resultado += `${String.fromCharCode(65 + counter)}*${(elemento[i][j][atomos_presentes[k]])}`
                                }else{
                                    resultado += ` + ${String.fromCharCode(65 + counter)}*${(elemento[i][j][atomos_presentes[k]])}`
                                }
                            }
                        }
                        counter++
                    }
                    counter = 2
                    resultado += '-('
                })
                counter = 0
                let temp = resultado
                resultado = ''
                for(var a = 0; a < temp.length - 2 ; a++){
                    resultado += temp[a]
                }
                resultado += ')'
                equacoes.push(resultado)
                resultado = ''
            } 
        }else{
            // There is elements that are only in one member of the equation
            document.querySelector("div.msg").innerHTML = "<p class = 'alert alert-danger'>Há algum erro na equação química, verifique e tente novamente.</p>"
            throw new Error("The equation is wrong, please check it")
        }
    
        // After set the equations to resolve, the coeficintes will be declared, they will store the values to each coeficient
        var coeficientes = new Coeficientes(reagentes.length, produtos.length)
        console.log("ANTES")
        console.log(coeficientes.exibir())
        let checked = false
        equacoes.forEach(eq=>{
            let letters = check_if_is_equal(eq)
            if(letters != false){
                console.log("LETTERS")
                console.log(letters)
                letters.forEach(letter=>{
                    coeficientes.change(letter, 1)
                })
                checked = true
            }
        })
        console.log("DEPOITS")
        console.log(coeficientes.exibir())
        let equacoes_algebricas = []
    
        var stop = false
        if(checked == false){coeficientes.change(2, 1)}
        for(var l = 0; l < 2 ; l++){
            if(stop){break}
            for(var a = 0; a < equacoes.length ; a++){
                let counter = 0
                for(var g = 0; g < coeficientes.qtd; g++){
                    if (parseFloat(coeficientes.coef[g]) == 0){counter += 1}
                    
                }
                console.log(counter)
                if (counter == 0){ 
                    stop = true
                    break
                }
                if(coeficientes.resolver_eq(equacoes[a], coeficientes) == true){continue}
            }
        }
        console.log(coeficientes)
        coeficientes.get_the_lowests_integers()
        console.log(coeficientes)
        let balenceded_eq = ''
        let index_of_coef = 0
        check_if_is_balenced(equacoes, coeficientes)
        let coef;
        for(var i = 0; i < elementos.length; i++){
            for(var j = 0; j < elementos[i].length; j++){
                coef = coeficientes.exibir()[index_of_coef] == 1? 1 : coeficientes.exibir()[index_of_coef]
                
                if(j != elementos[i].length - 1){
                    balenceded_eq += `${coef}${elementos[i][j].trim()} + `
                }else{
                    if(i == 0){
                        balenceded_eq += `${coef}${elementos[i][j].trim()} = `
                    }else{
                        balenceded_eq += `${coef}${elementos[i][j].trim()}`
                    }
                }
                index_of_coef++
            }
        }
    equacoes.forEach(e=>{
        console.log(e)
    })
    console.log(balenceded_eq)
    document.querySelector(".p_operation_result").innerHTML = `${balenceded_eq}`
    document.querySelector(".p_operation_result").style.display = 'block';
    document.querySelector(".result_area_equation").style.display = 'block';
    }
    balanceChemicalEquation()
    
    
    
        
