document.addEventListener("DOMContentLoaded", ()=>{
    // If is the first visit set the day
    let date = new Date() 
    if(localStorage.getItem("day") == null){
        localStorage.setItem("day", date.getDate())
    }
    // If is another day or the localstore is NaN, the count will be 0 
    if(date.getDate() != localStorage.getItem("day") || localStorage.getItem("count") == 'NaN'){
        localStorage.setItem('count', 0)
    }
    
    var bolinhas = document.querySelectorAll(".bolinhas")
    for(var i = 0; i < parseInt(localStorage.getItem("count")); i++){
        bolinhas[i].classList.toggle("preenchida")
    }

    //Logic of the select input
    function select_mode(mode_value){
        console.log(mode_value)
        if(mode_value == 'pomodoro'){
            var min_timer = document.querySelector("#pomodoro").value
        }
        if(mode_value == 'short_pause'){
            var min_timer = document.querySelector("#short_stop").value
        }       
        if(mode_value == 'long_pause'){
            var min_timer = document.querySelector("#long_stop").value
        }
        document.querySelector("#min").textContent = min_timer
        document.querySelector("#sec").textContent = '00'
    }

    document.querySelector("#pomodoro_mode").addEventListener("change", event=>{
        console.log(event.target)
        select_mode(event.target.value)
    })

    var min_pomodoro = document.querySelector("#pomodoro").value
    var min_short = document.querySelector("#short_stop").value
    var min_long = document.querySelector("#long_stop").value
    
    document.querySelector("#min").innerHTML = min_pomodoro

    console.log(min_pomodoro,min_short,min_long)

    function calculate(duration){
    if(running){
        var min = Math.round(duration/60)
        var sec = duration % 60
        if(sec == 0){
            document.querySelector("#min").innerHTML = `${parseInt(document.querySelector("#min").textContent) - 1}`
            document.querySelector("#sec").innerHTML = '59'
            duration--
        }else{
            if(sec <= 10){
                document.querySelector("#sec").innerHTML = `0${parseInt(document.querySelector("#sec").textContent) - 1}`
            }else{
            document.querySelector("#sec").innerHTML = `${parseInt(document.querySelector("#sec").textContent) - 1}`
            }
            duration--
        }
        return duration
    }else{return false}
}

    // Add the eventlisteners to the btns
    window.running = false
    window.paused = false
    window.reseted = false
    document.querySelector("#start_btn").addEventListener("click", ()=>{
        if(running){
            window.alert("Para alterar o tempo de execução do seu timer, você deve primeiro reseta-lo.")
            return 0
        }
        document.querySelector("#pomodoro_mode").disabled = true
        var value_mode = document.querySelector("#pomodoro_mode").value
        console.log(value_mode)
        if(paused){
            var min_timer = parseInt(document.querySelector("#min").textContent)
            var sec_timer = parseInt(document.querySelector("#sec").textContent)
        }else{
            if(value_mode == 'pomodoro'){
                var min_timer = parseInt(document.querySelector("#pomodoro").value)
                document.querySelector("#min").innerHTML = min_timer
                
            }else if(value_mode == 'short_pause'){
                var min_timer = parseInt(document.querySelector("#short_stop").value)
                document.querySelector("#min").innerHTML = min_timer
               
            }else{
                var min_timer = parseInt(document.querySelector("#long_stop").value)
                document.querySelector("#min").innerHTML = min_timer
                
            }
        }
        var sec_timer = 0
        running = true
        paused = false
        reseted = false
        let duration = (min_timer * 60) + sec_timer 
        if(running){
            console.log(running)
            var countdown = setInterval(()=>{
                duration = calculate(duration)
                if(paused){
                    console.log("PAUSADO")
                    clearInterval(countdown)
                    document.querySelector("#pomodoro_mode").disabled = true
                    return 0
                }
                if(reseted){
                    console.log("REsetado")
                    clearInterval(countdown)
                    document.querySelector("#pomodoro_mode").disabled = false
                    return 0
                }

                if (duration == 0){
                    running = false
                    document.querySelector("#audio").play()
                    console.log("ACABO")
                    document.querySelector("#pomodoro_mode").disabled = false
                    if(document.querySelector("#pomodoro_mode").value == "pomodoro"){
                        localStorage.setItem("count", parseInt(localStorage.getItem("count")) + 1)
                        bolinhas[(parseInt(localStorage.getItem("count"))) - 1].classList.toggle("preenchida")
                        if(parseInt(localStorage.getItem("count")) == 6){
                            localStorage.setItem("count", 0)
                            window.alert("Parabéns você bateu a meta de 6 pomodoros!")
                            for(var i = 0; i < bolinhas.length; i++){
                                bolinhas[i].classList.toggle("preenchida")
                            }
                        }
                        if(document.querySelector("#auto_start_pause").checked){
                            console.log("AUTOMATICO")
                            if(parseInt(localStorage.getItem("count")) == 3){
                                // Long pause auto
                                document.querySelector("#pomodoro_mode").value = 'long_pause'
                                document.querySelector("#start_btn").click()
                            }else{
                                // Short pause auto
                                document.querySelector("#pomodoro_mode").value = 'short_pause'
                                document.querySelector("#start_btn").click()
                            }
                        }else{
                            if(parseInt(localStorage.getItem("count")) == 3){
                                // Long pause not auto
                                document.querySelector("#pomodoro_mode").value = 'long_pause'
                                select_mode("long_pause")
                            }
                            else{
                                // Short pause not auto
                                document.querySelector("#pomodoro_mode").value = 'short_pause'
                                select_mode("short_pause")
                            }
                        } 
                    }else{
                        document.querySelector("#pomodoro_mode").value = 'pomodoro'
                        select_mode('pomodoro')
                    }
                    clearInterval(countdown)
                    return 0
                }
            }, 1000)
        }
    })
    document.querySelector("#pause_btn").addEventListener("click", ()=>{
        if(running){
            paused = true
            running = false
            console.log("Paused")
            
           
        }
    })
    document.querySelector("#reset_btn").addEventListener("click", ()=>{
        running = false
        paused = false
        reseted = true
        document.querySelector("#pomodoro_mode").disabled = false
        let value_mode = document.querySelector("#pomodoro_mode").value
        if(value_mode == 'pomodoro'){
            const min_pomodoro = document.querySelector("#pomodoro").value
            document.querySelector("#min").innerHTML = min_pomodoro
            document.querySelector("#sec").innerHTML = '00'
                
        }else if(value_mode == 'short_pause'){
            const min_short = document.querySelector("#short_stop").value
            document.querySelector("#min").innerHTML = min_short
            document.querySelector("#sec").innerHTML = '00'
        }else{
            const min_long = document.querySelector("#long_stop").value
            document.querySelector("#min").innerHTML = min_long
            document.querySelector("#sec").innerHTML = '00'
        }
    })
// Just change the mode of the timer when the timer is stopped
    document.querySelector("#pomodoro_mode").addEventListener("change", (event)=>{
        if(running){
            console.log(event.target.value)
            window.alert("Você só pode o modo do contador quando você resetar o contador")
        }
    })
})