try{
    const { matrix, create, wienDisplacementDependencies } = require("mathjs")
    const { values } = require("regenerator-runtime")
}catch (e){
    console.log(e)
}

function change_width(event_target){
    console.log("TEST")
    let new_width = (event_target.value.length * 8)  + 40;
    new_width = (event_target.textContent.length * 8) + 40;
    event_target.style.width = `${new_width}px`        
}



         

