
//Declaracion variables
let users=[]; 
let fecha
let texto;
let Eventos=[]
let meses=["","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
let descripcion=[];
let datoMes1 = document.getElementById("datoMes");
let datoYear1 = document.getElementById("datoYear");
let Months=["dayMonth1","dayMonth2","dayMonth3","dayMonth4","dayMonth5","dayMonth6","dayMonth7","dayMonth8","dayMonth9","dayMonth10","dayMonth11","dayMonth12"]
let dayMonth=document.getElementById("dayMonth")
const Añoactual=(new Date()).getFullYear()
const Mesactual=(new Date()).getMonth()+1
let dif
let diaSemana
datoYear1.setAttribute("value",Añoactual)
datoMes1.setAttribute("value",Mesactual)
datoYear1=datoYear1.value
datoMes1=datoMes1.value
$("#datoMes").on("focus",()=>{
    $(".wordHidden1").css("color","black")
    $("#datoMes").val("")
    
})
$("#datoYear").on("focus",()=>{
    $(".wordHidden2").css("color","black")
    $("#datoYear").val("") 
    
})
//inicializa los calendarios
window.onload=function Inicializador(){
    
    EscribirMesPpal(datoYear1,datoMes1)
    DibujarEventoEnPantalla()
}




//=================functions================================
//Dejar ver el div que contiene el formulario para agregar eventos al calendario
function Agg_u(){
    let formulario = document.getElementById("over")
    $('body').addClass("overflowInactive")
    formulario.classList.add("active")
}
//Ocultar el div que contiene el formulario para agregar eventos al calendario
function btn_Cerrar(){
    let formulario = document.getElementById("over")
    formulario.classList.remove("active")
    $('body').removeClass("overflowInactive")
    
}
//borra el mes principal
function deleteMesPpal(){
    $('#month').text("")
    $('#year').text("")
    
    for(let i=1;i<=12;i++){
        window['let dayMonth'+i] = document.getElementById(Months[i-1])
        window['let dayMonth'+i].innerHTML =""
        
    }
}


function aceptar(){
    deleteMesPpal()
    datoMes1 = document.getElementById("datoMes").value;
    datoYear1 = document.getElementById("datoYear").value;
    console.log("h"+datoMes1)
    console.log("h"+datoYear1)
    EscribirMesPpal(datoYear1,datoMes1);
}


//Saber en que dia de la semana comienza un mes
let start =  (datoYear1,datoMes1)=>{
    let diaInicio = new Date(datoYear1,datoMes1,1);
    
    return (diaInicio.getDay()===0)?6: (diaInicio.getDay()+1)
    
}


//Escribir los numeros de dias del calendario grande o ppal (que esta a la izquierda de la pagina) segun el mes y año que se le indiquen
function EscribirMesPpal(datoYear1,datoMes1){
    dayMonth.innerHTML="";
    let LastDayMesAfter = new Date(datoYear1,datoMes1-1,0).getTime();
    let FirstDayMesActually = new Date(datoYear1,datoMes1,0).getTime();
    
   $('#month').text(meses[datoMes1])
    $('#year').text(datoYear1)
    dif=(FirstDayMesActually-LastDayMesAfter)/(1000*60*60*24 );
    console.log(start(datoYear1,datoMes1-1))
    console.log(dif);
    console.log(datoMes1)
    dayMonth.className="order"
    for (var i=1;i<=dif+(start(datoYear1,datoMes1-1)-1);i++){
        
        
        
        if(i<start(datoYear1,datoMes1-1)){
            window['let dayMonth'+i]=document.createElement("div")
            window['let dayMonth'+i].innerHTML +=""
            
            dayMonth.appendChild( window['let dayMonth'+i])

        }
        else if(i>=start(datoYear1,datoMes1-1)){
                window['let dayMonth'+i]=document.createElement("div")
                window['let dayMonth'+i].innerHTML +=`${i-(start(datoYear1,datoMes1-1)-1)}`
                window['let dayMonth'+i].setAttribute("id",`${i-(start(datoYear1,datoMes1-1)-1)}`)
                window['let dayMonth'+i].setAttribute("value",`${i-(start(datoYear1,datoMes1-1)-1)}`)
                dayMonth.appendChild( window['let dayMonth'+i])

                
                pintarEvento(i)
                
    }
        else{break}
        
            
        
    }
    
    
    escribirMesSecondary(datoYear1)
}
function pintarEvento(i){
    if (localStorage.getItem("count")){
        
        let EventGenerales=JSON.parse(localStorage.getItem("EventGenerales").split(","))
        
        $('#month').html(meses[datoMes1])
        $('#year').html(datoYear1)
        let k=0
        let PrimeraFecha
        for(elements of EventGenerales){
            
            let FechasEvents =[]
            let mes=elements.fecha.split("-")
            let day=elements.fecha.split("-")
            let año=elements.fecha.split("-")
            function FunctionFechaEvents(mes,day,año){
                this.mes=mes;
                this.day=day;
                this.año=año
            }
            let ClassFecha=new FunctionFechaEvents(`${parseInt(mes[1])}`,`${parseInt(day[2])}`,`${parseInt(año[0])}`)
            FechasEvents.push(ClassFecha)
            console.log(EventGenerales)
            console.log
            PrimeraFecha=FechasEvents[0]
            
            let index={mes:PrimeraFecha.mes,day:PrimeraFecha.day,año:PrimeraFecha.año}
            window['let dayMonth'+i].classList.remove("colorDay")
            if ((datoMes1==index.mes)&&(`${i-(start(datoYear1,datoMes1-1)-1)}`==index.day)&&(datoYear1==index.año)){
                console.log("eyy")
            
                window['let dayMonth'+i].className="colorDay"
            }
        }
        let NewEventGenerales=JSON.stringify(EventGenerales)
        localStorage.setItem("EventGenerales",NewEventGenerales)      
        }else{}
    
}
//Escribir en los calendarios pequeños los dias del mes segun el año que se le haya indicado
function escribirMesSecondary(datoYear1){
    
    for(let k=1;k<=12;k++){
        let DiaSemana= start(datoYear1,k-1);
        let LastDayMesAfter = new Date(datoYear1,k-1,0).getTime();
        let FirstDayMesActually = new Date(datoYear1,k,0).getTime();
        dif=(FirstDayMesActually-LastDayMesAfter)/(1000*60*60*24 );

        console.log("chao")
        window['let dayMonth'+k] = document.getElementById(Months[k-1])
        window['let dayMonth'+k].className="order"
    for (let i=1;i<=dif+(DiaSemana-1);i++){
        
        if(i<DiaSemana){
            window['dayMonth'+k].innerHTML +=`<div"> </div>`
        }
        else if(i>=DiaSemana){
            window['dayMonth'+k].innerHTML +=`<div"> ${i-(DiaSemana-1)}</div>`
        }
        else{break}
    }
}
}

//Eventos
year.addEventListener("change",EscribirMesPpal)
//=========================Creacion de nuevos eventos del calendario===========================
function crearEvento(event){
    
    event.preventDefault()
    enviar();
    console.log("hola")
    
    DibujarEventoEnPantalla()
    
}
function DibujarEventoEnPantalla(){
    let eventos = document.getElementById("Eventos")
    let evento = document.createElement("ul") 
    eventos.innerHTML="";
    let EventGenerales=JSON.parse(localStorage.getItem("EventGenerales").split(","))
   
    console.log( EventGenerales)
    let i=0
    for (let elements of EventGenerales){
        evento.classList="list-group list-group-vertical"
        
        evento.innerHTML+=`<div class="list-group list-group-horizontal" id=${i++}> <li class="list-group-item col-3">${elements.fecha}  </li>
        <li class="list-group-item col-3">${elements.name_Evento}</li>
        <li class="list-group-item col-3">${elements.descripcion}</li>
        <img src="./Iconos/papelera.png"  onclick=EliminarEvento(${i++})/>
        </div>`
        eventos.appendChild(evento)
        
        console.log(elements.fecha)
        console.log(elements.name_Evento)
    }
    let NewEventGenerales=JSON.stringify(EventGenerales)
    localStorage.setItem("EventGenerales",NewEventGenerales)
}
/* function EliminarEvento(i){
    let eventos = document.getElementById("Eventos")
    eventos.innerHTML="";
    let EventGenerales=JSON.parse(localStorage.getItem("EventGenerales").split(","))
    EventGenerales.splice(i,1)
    let NewEventGenerales=JSON.stringify(EventGenerales)
    localStorage.setItem(("EventGenerales",NewEventGenerales))
    EscribirMesPpal(datoYear1,datoMes1)
    DibujarEventoEnPantalla()
} */
//funcion para agregar al constructor un nuevo evento

function enviar(){
    
    
    var name_Evento=document.getElementById("nombreEvento").value;
    var fecha=document.getElementById("fecha").value;
    var descripcion=document.getElementById("descripcion").value;
    //el if que sigue verifica si se ha creado o seteado una varibale en el local storage---La primera vez que ejecute el programa no se habra seteado ninguna variable por tanto se ira al else
    if (localStorage.getItem("count")){
        //Se ejecuta cuando ya se ha creado el primer evento--por ello mando a llamar del localstorage al array Eventos que esta gurdado en una key EventGenerales

        let Event= JSON.parse(localStorage.getItem("EventGenerales").split(","))
        //Mando a llamar al contador que fue iniciado con el numero 1 y a medida que se llame a la funcion enviar se le va a ir sumando un 1 a esta variable Operacioncontat
        let Operacioncontar =parseInt(localStorage.getItem("count"));
        Operacioncontar = Operacioncontar +1
        //Guardo la operacion contar en el local storage con la key count de manera que conserve el consecutivo, como ya fue creado en el primer evento, la bariable va a ir actualizando su valor
        localStorage.setItem("count",Operacioncontar)
        let cuenta = localStorage.getItem("count")
        //Definicion de nuevos eventos que respetan el consecutivo
        window['Event'+cuenta]=new eventoInfo('Event'+cuenta,name_Evento,fecha,descripcion)
        
        Event.push(window['Event'+cuenta])
        let NewEventJSON =JSON.stringify(Event)
        
        localStorage.setItem("EventGenerales",NewEventJSON)
    }else{
        //Esto ocurre cuando es la primera vez que se ha aplicado el boton enviar es decir no hay ninguna variable seteada en el localstorage
        //Inicio un contador que me permita crear varios eventos y que esten definidos por un consecutivo de variables creadas, en este caso la primer evento sera el 1 por que el contador en el local storage se incia en 1
        localStorage.setItem("count","1")
        //Agrego el primer evento que el usuario creo a la variable Event1
        let Event1 = new eventoInfo("Event1",name_Evento,fecha,descripcion)
        let Event1JSON = JSON.stringify(Event1)
        //Guardo en localstorage el primer evento en JSON
        localStorage.setItem("Event1",Event1JSON)
        //Mando a llamar el primer evento en el localstorage para luego ese evento agregarlo al array vacio llamado Eventos
        JSON.parse(localStorage.getItem("Event1"))
        Eventos.push(Event1)
        //Guardo en el localStorage esta nueva modificacion al array Eventos
        let EventosJSON = JSON.stringify(Eventos)
        localStorage.setItem("EventGenerales",EventosJSON)
        
        
    }
    deleteMesPpal()
    EscribirMesPpal(datoYear1,datoMes1)
     
    

}
//Definicion de class evento
class eventoInfo {
    
    constructor(id,name_Evento,fecha,descripcion){
        
        this.id=id; 
        this.name_Evento=name_Evento;
        this.fecha=fecha;
        this.descripcion=descripcion;
    }
    
    info(){
        
        $("hola").html("")
        $("#hola").append(`<ul class><li>Nombre evento es: ${user.name_Evento}</li>
                            <li>La fecha del evento es: ${user.fecha}</li>`)
        
        
    }
}


//=============================Creacion de seleccion de calendarioppal a traves de meses secondarys=====================
$('.calendar').on('click',(event)=>{
    
    let eventSelect=event.target.getAttribute("id");
    console.log('este es mijo '+eventSelect)
    console.log("por aca"+event.target.getAttribute("id"))
    //for que permite borrar cualquier estilo en los calendarios secundarios de manera que solo se va a visualizar en bg-color:red el ultimo calendario secundario seleccionado
    for(let i=0;i<=12;i++){
        $('#calendar'+i).removeAttr("style")
    }
    //permite identificar cualquier calendario secundario seleccionado cuyo componente tenga como id dayMonth + i siendo i el numero del calendario secundario seleccionado ej:1:enero...12:diciembre
    for(let i=1;i<=40;i++){
        if(eventSelect=='dayMonth'+i ){
            var mesSelect=eventSelect
        }
    }
    //permite identificar cualquier calendario secundario seleccionado cuyo componente tenga como id calendar + i siendo i el numero del calendario secundario seleccionado ej:1:enero...12:diciembre
    for(let i=1;i<=12;i++){
        if(eventSelect=='calendar'+i ){
            var mesSelectCalendar=eventSelect
        }
    }
        switch (eventSelect) {
            case 'month':
                eventSelect=event.target.parentNode.parentNode.parentNode.getAttribute("id")
                console.log('1'+eventSelect)
                break;
            case null:
                eventSelect=event.target.parentNode.parentNode.getAttribute("id")
                console.log('2'+eventSelect)
                break;
            case mesSelect:
                eventSelect=event.target.parentNode.getAttribute("id");
                console.log('3'+eventSelect)
                break;
            case mesSelectCalendar:
                eventSelect=event.target.getAttribute("id");
                console.log('4'+eventSelect)
                break;
            default:
                eventSelect=event.target.parentNode.getAttribute("id");
            break;
        }
        
        
    
    
    $('#'+eventSelect).css('background-color','red')
    console.log('eurecka'+eventSelect.substr(8,1))
    let mesSelectPpal= eventSelect.substr(8,2)
    deleteMesPpal();
    datoMes1=mesSelectPpal
    EscribirMesPpal(datoYear1,datoMes1)
    
})

//identificador de eventos
function indentifierEvent(){

}
//ajax
const URL="https://jsonplaceholder.typicode.com/posts"
function hol(){
    var name_Evento=document.getElementById("nombreEvento").value;
    var fecha=document.getElementById("fecha").value;
    var descripcion=document.getElementById("descripcion").value;
    const info={nombre:name_Evento,fecha:fecha,descripcion:descripcion}
    $.post(URL,info,(respuesta,status)=>{
        if(status==="success"){
            console.log(respuesta)
            alert(respuesta.nombre)
            alert(respuesta.descripcion)
        }else{alert("no funciono")}
    })
}

//debemos crear unas variables que agrupen por categorias de importancia los diferentes eventos una por cada categoria y al buscar en el calendario dia a dia esta se pinte segun la categoria/ la busqueda la tengo directamente en la funcion de escribir mes ppal 