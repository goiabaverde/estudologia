document.addEventListener("DOMContentLoaded", ()=>{
    class Numbers{
        constructor(){
            this.numbers = []
        }

        add(item){
            this.numbers.push(item)
        }

        update(item){
            for(var j = 0; j < this.numbers.length; j++){
                if(this.numbers[j].num == item){
                    this.numbers[j].counter += 1
                }
            }
        }

        mode(){
            let again = false
            let max = this.numbers[0].counter
            for(var j = 1; j < this.numbers.length; j++){
                if(this.numbers[j].counter > max){
                    max = this.numbers[j].counter
                    again = false
                }
                else if(max == this.numbers[j].counter){again = true}
            }
            if(again){
                return "Não há moda"
            }
            let mode
            for(var j = 0; j < this.numbers.length; j++){
                if(this.numbers[j].counter== max){
                    mode = this.numbers[j].num
                }
            }
            return mode
        }
    }
    
    class Set{
        constructor(){
            this.set = []
        }
        add(item){
            if(this.set.includes(item) == false){
                this.set.push(item)
            }
        }

        has(item){

            if(this.set.includes(item)){
                return true
            }
            return false

        }
    }

    class Number{
        constructor(num){
            this.num = num
            this.counter = 0
        }
    }

    function isFloat(a){
        if( (a % 1) == 0 ){
            return false
        }

        return true
    }

    function formatResult(num){
        if( isFloat(num) ){
            let loop = true
            let n = 1
            while(loop){

                if( isFloat(num * (10 ** n)) == false){
                    loop = false
                }

                if(n >= 3){
                    return num.toFixed(2)
                }
                n++
            }   
        }

        return num
    }

    function calcular_est(){
        let string = document.querySelector("#est_input").value.trim()

        if( document.querySelector('.msg').textContent != '' ){
            document.querySelector('.msg').innerText = ''
        }

        for( var i = 0; i < string.length; i++ ){
            let test = string[i].charCodeAt(0)
            if( 65 <= string[i].charCodeAt(0) && string[i].charCodeAt(0)  <= 122 ){
                document.querySelector("div.msg").innerHTML = `<p class = 'alert alert-danger'> ${string[i]} é um caractere indevido, por favor retire ele, só são permitidos números para o calculo.</p>`
                throw new Error("Please, don't write letters in the input, just numbers")
            }
        
        }
        let numbers = string.match(/\d+\.?\d*/g);
                
        numbers = numbers.map(num => num.includes('.') ? parseFloat(num) : parseInt(num));
        
        function average(numbers){
            let sum = 0
            numbers.forEach(num => {
                sum += num
            })

            return formatResult(sum / numbers.length)
        }

        function median_dev(numbers){
            const ave = average(numbers)
            let sum = 0
            numbers.forEach(num=>{
                let dif = num - ave
                sum += dif >= 0? dif : -dif
            })
            return formatResult(sum / numbers.length)
        }

        function variance(numbers){
            const ave = average(numbers)
            let sum = 0
            numbers.forEach(num=>{
                sum += (num - ave) ** 2
            })

            return formatResult(sum / numbers.length)

        }

        function standart_dev(numbers){
            return formatResult(variance(numbers) ** 0.5)
        }

        function Mode(numbers){
            let numbers_class = new Numbers()
            let set_numbers = new Set()
            for(var i = 0; i < numbers.length; i++){
                if(set_numbers.has(numbers[i]) == false){
                    numbers_class.add(new Number(numbers[i]))
                }else{
                    numbers_class.update(numbers[i])
                }
                set_numbers.add(numbers[i])
            }

            return numbers_class.mode()
            
            
        }

        function median(numbers){
            var n = numbers.length
            numbers.sort(function(a,b){
                return a - b
            })
            console.log(numbers)
            if((n % 2) == 0){
               
                
                return formatResult((numbers[n/2 - 1] + numbers[n/2])/2)
            }else{
                return (numbers[((n + 1) / 2) - 1])
            }

        }

        document.querySelector("#est_table").style.display = 'block'
        document.querySelector("#average").textContent = `${average(numbers)}`
        document.querySelector("#median").textContent = `${median(numbers)}`
        document.querySelector("#mode").textContent = `${Mode(numbers)}`
        document.querySelector("#median_dev").textContent = `${median_dev(numbers)}`
        document.querySelector("#variance").textContent = `${variance(numbers)}`
        document.querySelector("#standart_des").textContent = `${standart_dev(numbers)}`
    }

    
    document.querySelector("#est_btn").addEventListener("click", ()=>{
     calcular_est()})
})

