document.addEventListener("DOMContentLoaded", ()=>{


function classificar_conica(){   // Recebe valores A,B,C,D,E,F

    let A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, h = 0, k = 0, graus = 0;  //Inicializa os coeficientes

    let translada = false
    let rotaciona = false

    function temLetra(texto) {
        const regex = /[a-zA-Z]/;
        return regex.test(texto);
    }

    function interpretarExpressao(str) {
        if(temLetra(str)){
            window.alert("Não são aceitos letras, digite outro valor") // Verificando o input do usuário
            throw new Error("Letra no input")
        }
        if(str.trim() == "" ){
            return 0 // Input vazio é zero
        }
        try {
        // Substitui vírgula por ponto e remove espaços
            const limpa = str.replace(',', '.').replace(/\s+/g, '');
            return math.evaluate(limpa);
        } catch (e) {
            console.error("Erro ao interpretar:", str);
            return NaN;
        }
}

    A = interpretarExpressao(document.getElementById('input1').value);
    B = interpretarExpressao(document.getElementById('input2').value);
    C = interpretarExpressao(document.getElementById('input3').value);
    D = interpretarExpressao(document.getElementById('input4').value);
    E = interpretarExpressao(document.getElementById('input5').value);
    F = interpretarExpressao(document.getElementById('input6').value);

    // Encontrando o det da matriz da cônica
    console.log(A,B,C,D,E,F)

    matrix_co = [[A,B/2,D/2],[B/2,C,E/2],[D/2,E/2,F]]
    const det_co = numeric.det(matrix_co)

    // Checa se existe h e k, tais que pode-se transladar a origem do sistema de coordenadas e gerar uma cônica simétrica em relação a origem, elimitando os termos lineares.

    const delta = B**2 -4*A*C

    if(delta != 0){
        // Se for diferente de zero existe h e k
        translada = true
        // Resolvendo o sistema linear para encontrar h e k

        const matrix_1 = [[A,B/2],[B/2,C]] // Linhas da primeira matriz
        const matrix_2 = [-D/2,-E/2] // Segunda matriz
    console.log(matrix_1, matrix_2)
        try{
            const solution_h_k = numeric.solve(matrix_1,matrix_2);
            console.log(`Solução: ${solution_h_k}`)
            h = solution_h_k[0]
            k = solution_h_k[1]
        }catch (error){
            console.error("Erro ao resolver", error)
        }

    // Os novos coeficientes na novo sistema de coordendas ficam:

    const d = 2*A*h + B*k + D
    const e = 2*C*k + B*h + E
    const f = A * h**2 + B * h * k + C * k**2 + D * h + E * k + F;

    // Atualizando os valores da conica no novo sistema
    

    console.log(`valores de ${d} e ${e}, após transladar`)

    D = d
    E = e
    F = f

    }



    // Eliminando o termo misto
    if(B != 0){

        rotaciona = true

        if((A-C) == 0){
            var teta_rad = B > 0 ? (Math.PI)/4 : (-1*Math.PI)/4
        }else{

            var tg_2teta = B/(A-C)
            
            var teta_rad = (Math.atan(tg_2teta))/2
        }

            const cos_teta = math.cos(teta_rad)
            const sen_teta = math.sin(teta_rad)
            const cos_2teta = math.cos(teta_rad*2)
            const sen_2teta = math.sin(teta_rad*2)
            

            console.log(` tg de 2teta: ${tg_2teta}  Seno de teta: ${sen_teta}, arco seno ${teta_rad}, teta ${teta_rad}`, )

            graus = teta_rad * (180 / Math.PI);

            console.log(sen_teta,cos_teta, graus, det_co)

            var a = A*((cos_teta)**2) + B*sen_teta*cos_teta + C*((sen_teta)**2)
            var b = B*cos_2teta + (-A+C)*sen_2teta
            var c = A*((sen_teta)**2) - B*sen_teta*cos_teta + C*((cos_teta)**2)
            if(translada){
                var d  = 0
                var e = 0  // Se transladou, necessariamente os termos que acompanham x e y são nulos
            }else{ // // Senão transladou, é necessário calcular os coeficientes para a rotação
                var d = D*cos_teta + E*sen_teta
                var e = -1*D*sen_teta + E*cos_teta
            }
            
    }else{
        var a = A
        var b = B
        var c = C
        var d = D
        var e = E
    }

    // Atualizando valores e inicializando a variável de classificacao
    let f = F
    let classificacao  = ''

    // Classificação utilizando o valor do delta e do deteminante da matriz 3x3
    if(delta < 0){
        if(det_co < 0 ){
            classificacao  = "Elipse"
        }else if(det_co == 0){
            classificacao  = "Ponto"
        }else{
            classificacao  = "Conjunto vazio"
        }
    }else if(delta > 0){
            if(det_co != 0 ){
                classificacao  = "Hipérbole"
            }else{
                classificacao  = "Duas retas concorrentes"
            }
    }else{
        if(det_co != 0){
            classificacao  = "Parábola"
        }else{
            // Esse caso em que tando o delta quanto o determinante da matriz 3x3 resulta em zero, é necessário ter uma checagem mais detalhada, pois nesse caso a cônica é degenerada e a equação pode representar duas retas paralelas, uma reta ou o conjunto vazio
            if (a == 0 && c == 0) {
                // Equação linear: Dx + Ey + F = 0 → uma reta
                if (d != 0 || e != 0){
                    classificacao  = "Uma reta";
                }else{ classificacao  = "Conjunto vazio (sem solução real)"
                
                }
            }if (A !== 0) {
            // Completa o quadrado em x: A(x + D/(2A))² + Cy² + Ey + (F - D²/(4A)) = 0
            var novoF = f - (d ** 2) / (4 * a);
           
            if (C === 0) {
                // Equação: A(x + D/(2A))² + Ey + novoF = 0
                if (E !== 0) {
                    // Pode ser escrita como y = k(x) → uma reta
                    classificacao  = "Uma reta";
                } else {
                    // A(x + D/(2A))² + novoF = 0
                    if (novoF === 0) classificacao ="Uma reta (duas retas coincidentes)";
                    else if ((a > 0 && novoF < 0) || (a < 0 && novoF > 0)) {
                        classificacao ="Duas retas paralelas distintas";
                    } else {
                        classificacao ="Conjunto vazio";
                    }
                }
            } else {
                // Se C ≠ 0, completamos o quadrado em y também
                var novoNovoF = novoF - (e ** 2) / (4 * c);
                
                if (novoNovoF === 0) {
                    // Equação: A(x + D/(2A))² + C(y + E/(2C))² = 0 → ponto único ou vazio
                    if ((a > 0 && c > 0) || (a < 0 && c < 0)) {
                        classificacao ="Um ponto (solução única)";
                    } else {
                        classificacao ="Conjunto vazio";
                    }
                } else {
                    // Pode representar duas retas paralelas ou vazio
                    if ((a > 0 && c > 0 && novoNovoF < 0) || (a < 0 && c < 0 && novoNovoF > 0)) {
                        classificacao ="Duas retas paralelas distintas";
                    } else {
                        classificacao ="Conjunto vazio";
                    }
                }
            }
        } else if (c !== 0) {
            // Similar ao caso A ≠ 0, mas completando o quadrado em y
            var novoF = f - (e ** 2) / (4 * c);
            
            if (novoF === 0) {
                classificacao ="Uma reta (duas retas coincidentes)";
            } else if ((c > 0 && novoF < 0) || (c < 0 && novoF > 0)) {
                classificacao ="Duas retas paralelas distintas";
            } else {
                classificacao ="Conjunto vazio";
            }
        }
    }
    }
        
        // Tratando os valores eliminando casas decimais desnecessárias e retirando flutuações computacionais
        let valores = [a, b, c, d, e, f, h, k, graus]
        
        console.log(valores)

        function arrendondando(num){
            if(Math.abs(num) <= 1e-9){
                return 0
            }else if(Number.isInteger(num) == true){
                return num
            }else{
                console.log(num)
                const numeroArredondado = num.toFixed(2);
                const numeroComoNumero = parseFloat(numeroArredondado);
                return numeroComoNumero; // Arredonda para duas casas decimais
            }
            
        }
        
    

        for(let i = 0; i < 9 ; i++){
            valores[i] = arrendondando(valores[i])
        }

        // Inicializando a equação da nova cônica, da informação perante a rotação e o nova origem do sistema de coordenadas
        let equacao_nova_conica = ''
        let rotacao = ''
        

        for(let i = 0; i < 6; i++){
            if(valores[i] != 0){
                if(i == 0){
                   valores[i] > 0 ? equacao_nova_conica += `${Math.abs(valores[i])}x²` : equacao_nova_conica += `-${Math.abs(valores[i])}x²` 
                }else if(i == 1){
                    valores[i] > 0 ? equacao_nova_conica += ` + ${Math.abs(valores[i])}xy` : equacao_nova_conica += ` - ${Math.abs(valores[i])}xy`
                }else if(i == 2){
                    valores[i] > 0 ? equacao_nova_conica += ` + ${Math.abs(valores[i])}y²` : equacao_nova_conica += ` - ${Math.abs(valores[i])}y²`
                }else if(i == 3){
                    valores[i] > 0 ? equacao_nova_conica += ` + ${Math.abs(valores[i])}x` : equacao_nova_conica += ` - ${Math.abs(valores[i])}x`
                }else if(i == 4){
                    valores[i] > 0 ? equacao_nova_conica += ` + ${Math.abs(valores[i])}y` : equacao_nova_conica += ` -${Math.abs(valores[i])}y`
                }else if(i == 5){
                    valores[i] > 0 ? equacao_nova_conica += ` + ${Math.abs(valores[i])}` : equacao_nova_conica += ` - ${Math.abs(valores[i])}`
                }
            }
        }

        equacao_nova_conica += " = 0"
        // Definindo a nova origem
        let origem = translada ? `A nova origem é no ponto (${valores[6]},${valores[7]})` : "Não teve mudança da origem"

        if(rotaciona == true){
            if(graus >= 0){
                rotacao = `E a rotação dos eixos foi de ${Math.abs(valores[8])} graus no sentido anti-horário`
            }else{
                rotacao = `E a rotação dos eixos foi de ${Math.abs(valores[8])} graus no sentido horário`
            }
        }else{rotacao = "E não houve rotação"}

        

        console.log(equacao_nova_conica)
        console.log(`A nova cônica no novo sistema de coordenadas será: ${a}x² ${b}xy ${c}y² ${d}x ${e}y ${f} = 0 e ela é classificada como: ${classificacao}`)  
        console.log(`Delta = ${delta}, det3x3 = ${det_co}, graus = ${graus}`)

        // Expressando o resultado na tela
        document.querySelector(".co_p_operation_result").innerHTML = `${equacao_nova_conica}`
        document.querySelector("#result_rotation_origin").innerHTML = `${origem}. ${rotacao}`
        document.querySelector(".p_result_clasification").innerHTML = `${classificacao}`

        document.querySelector(".co_p_operation_result").style.display = 'block';
        document.querySelector("#result_rotation_origin").style.display = 'block';
        document.querySelector(".result_area_equation").style.display = 'block';
        document.querySelector(".result_area_equation").style.display = 'block';
        document.querySelector("#result_clasification").style.display = 'block';
        document.querySelector(".p_result_clasification").style.display = 'block';

    }
    document.querySelector("#co_equacao_btn").addEventListener("click", ()=>{classificar_conica()})
})
