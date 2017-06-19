document.addEventListener("DOMContentLoaded", function(){
  try{
    fin.desktop.main(function(){
      initWithOpenFin();
    })
  }catch(err){
    initNoOpenFin();
    console.log(err)
  }
});


initWithOpenFin = function(){
  alert("loaded with OpenFin");
}

initNoOpenFin = function(){
  alert("loaded without OpenFin");
}
