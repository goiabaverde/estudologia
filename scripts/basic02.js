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
            input.setAttribute('onkeypress', 'change_width(this)')
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



         

