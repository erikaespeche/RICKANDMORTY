//ELEMENTOS DEL HTML
let $contenedorPadrePlantillas = document.getElementById('contenedor-padre-plantillas');
let $mujeresBoton = document.getElementById('mujeres-boton');
let $hombresBoton = document.getElementById('hombres-boton');
let $todosBoton = document.getElementById('todos-boton');
let $siguientePaginaBoton = document.getElementById('siguiente-pagina-boton');
let $ultimaPaginaBoton = document.getElementById('ultima-pagina-boton');
let $primerPaginaBoton = document.getElementById('primer-pagina-boton');
let $anteriorPaginaBoton = document.getElementById('anterior-pagina-boton');
let $nroPagina = document.getElementById('nro-pagina');

//VARIABLES
let todosPersonajes = [];
let pagina = 1;


//MOSTRAR PERSONAJES
function mostrarPersonajes(array){
    $contenedorPadrePlantillas.innerHTML = '';//esto es para que la platilla se resettee y segun el evento(el boton que cliqueo ele ususario) muestre (todo, mujeres u hombre)
    for(let i=0; i<array.length; i++){
        $contenedorPadrePlantillas.innerHTML += `<div id="contenedor-plantilla">
        <div id="contenedor-plantilla-datospersonajes">
            <div class="contenedor-imagen">
                <img class="imagen-personajes" src=${array[i].image} alt="">
            </div>
            <h2 class="datos-personajes">Nombre: ${array[i].name}</h2>
            <p class="datos-personajes">Genero: ${array[i].gender}</p>
            <p class="datos-personajes">Especie: ${array[i].species}</p>
            <p class="datos-personajes">Estado: ${array[i].status}</p>
            <p class="datos-personajes">Origen: ${array[i].origin.name}</p>
            <p class="datos-personajes">Locacion: ${array[i].location.name}</p>
            
        </div> 
         
        <p id="contenedor-plantilla-vermas">VER MÁS...</p>

     </div>`
    }

}


//FETCH
function usarFetch(numeroPagina){
   fetch(`https://rickandmortyapi.com/api/character/?page=${numeroPagina}`)//Cambie la direccion de la API a la que tenia la info del nro de la pagina, le borre el numero de pagina de la url, y lo reemplaze por la variable "numeroPagina"
   .then((data)=>{
       return data.json();
    })
    .then((data)=>{
      // console.log(data);
      todosPersonajes = data.results;
      //console.log(personajes);
      mostrarPersonajes(todosPersonajes);
    })

};
usarFetch(pagina)


//FILTROS
function mostrarMujeres(){
    let resultado = todosPersonajes.filter((personaje)=>{
        return personaje.gender === 'Female';
    })
    mostrarPersonajes(resultado);

}

function mostrarHombres(){
    let resultado = todosPersonajes.filter((personaje)=>{
        return personaje.gender === 'Male';
    })
    mostrarPersonajes(resultado);

}

function mostrarTodos(){
    let resultado = todosPersonajes;
    mostrarPersonajes(resultado);

}


// NRO DE PAGINA

$nroPagina.innerHTML = `<p>Pagina ${pagina}</p>`


//PAGINADO
$primerPaginaBoton.disabled = true;
$anteriorPaginaBoton.disabled = true;
$anteriorPaginaBoton.style.display = "none";
$primerPaginaBoton.style.display = "none";




//PAGINA SIGUIENTE
function siguientePagina(){
    pagina++;
    $nroPagina.innerHTML = `<p>Pagina ${pagina}</p>`
    $primerPaginaBoton.disabled = false;
    $anteriorPaginaBoton.disabled = false;
    $anteriorPaginaBoton.style.display = "block";
    $primerPaginaBoton.style.display = "block";
    if(pagina === 42){
        $nroPagina.innerHTML = `<p>Pagina ${pagina}</p>`
        $siguientePaginaBoton.disabled = true;//DISABLED se usa para desabilitar botones, otra manera es con las clases
        $ultimaPaginaBoton.disabled= true;
        $primerPaginaBoton.disabled = false;
        $anteriorPaginaBoton.disabled = false;  
        $siguientePaginaBoton.style.display = "none"; 
        $ultimaPaginaBoton.style.display = 'none';
        $anteriorPaginaBoton.style.display = "block";
        $primerPaginaBoton.style.display = "block";
    }
    else if( pagina != 42){
        $nroPagina.innerHTML = `<p>Pagina ${pagina}</p>`
        $siguientePaginaBoton.disabled = false;
        $ultimaPaginaBoton.disabled= false;
        $primerPaginaBoton.disabled = false;
        $anteriorPaginaBoton.disabled = false;
        $siguientePaginaBoton.style.display = "block"; 
        $ultimaPaginaBoton.style.display = 'block';
        $anteriorPaginaBoton.style.display = "block";
        $primerPaginaBoton.style.display = "block";
    }

    usarFetch(pagina);//pasarle a FETCH la pagina siguiente
};


//ULTIMA PAGINA
function ultimaPagina(){
    pagina = 42;
    $nroPagina.innerHTML = `<p>Pagina ${pagina}</p>`
    $siguientePaginaBoton.disabled = true;
    $ultimaPaginaBoton.disabled = true;
    $siguientePaginaBoton.style.display = "none"; 
    $ultimaPaginaBoton.style.display = 'none';
    if(pagina === 42){
        $nroPagina.innerHTML = `<p>Pagina ${pagina}</p>`
        $siguientePaginaBoton.disabled = true;
        $ultimaPaginaBoton.disabled= true;
        $primerPaginaBoton.disabled = false;
        $anteriorPaginaBoton.disabled = false;  
        $siguientePaginaBoton.style.display = "none"; 
        $ultimaPaginaBoton.style.display = 'none';
        $anteriorPaginaBoton.style.display = "block";
        $primerPaginaBoton.style.display = "block"; 
    };
    usarFetch(pagina);
};


//PAGINA ANTERIOR
function anteriorPagina(){
    pagina--;
    $nroPagina.innerHTML = `<p>Pagina ${pagina}</p>`
    $siguientePaginaBoton.disabled = false;
    $ultimaPaginaBoton.disabled= false;
    if(pagina === 1){
        $nroPagina.innerHTML = `<p>Pagina ${pagina}</p>`
        $siguientePaginaBoton.disabled = false;//DISABLED se usa para desabilitar botones, otra manera es con las clases
        $ultimaPaginaBoton.disabled= false;
        $primerPaginaBoton.disabled = true;
        $anteriorPaginaBoton.disabled = true;
        $siguientePaginaBoton.style.display = "block"; 
        $ultimaPaginaBoton.style.display = 'block';   
        $anteriorPaginaBoton.style.display = "none";
        $primerPaginaBoton.style.display = "none";
    }
    else if( pagina != 1){
        $nroPagina.innerHTML = `<p>Pagina ${pagina}</p>`
        $siguientePaginaBoton.disabled = false;
        $ultimaPaginaBoton.disabled= false;
        $primerPaginaBoton.disabled = false;
        $anteriorPaginaBoton.disabled = false;
        $anteriorPaginaBoton.style.display = "block";
        $primerPaginaBoton.style.display = "block";
        $siguientePaginaBoton.style.display = "block"; 
        $ultimaPaginaBoton.style.display = 'block';  
    }
    usarFetch(pagina);
};


//PRIMER PAGINA
function primerPagina(){
    pagina = 1;
    $nroPagina.innerHTML = `<p>Pagina ${pagina}</p>`
    $primerPaginaBoton.disabled = true;
    $anteriorPaginaBoton.disabled = true;
    $anteriorPaginaBoton.style.display = "none";
    $primerPaginaBoton.style.display = "none";
    if(pagina === 1){
        $nroPagina.innerHTML = `<p>Pagina ${pagina}</p>`
        $siguientePaginaBoton.disabled = false;
        $ultimaPaginaBoton.disabled= false;
        $primerPaginaBoton.disabled = true;
        $anteriorPaginaBoton.disabled = true; 
        $siguientePaginaBoton.style.display = "block"; 
        $ultimaPaginaBoton.style.display = 'block';   
        $anteriorPaginaBoton.style.display = "none";
        $primerPaginaBoton.style.display = "none"; 
    };
    usarFetch(pagina);
};




//EVENTOS
$mujeresBoton.addEventListener('click', mostrarMujeres);
$hombresBoton.addEventListener('click', mostrarHombres);
$todosBoton.addEventListener('click', mostrarTodos);
$siguientePaginaBoton.addEventListener('click', siguientePagina);
$ultimaPaginaBoton.addEventListener('click', ultimaPagina);
$primerPaginaBoton.addEventListener('click', primerPagina);
$anteriorPaginaBoton.addEventListener('click', anteriorPagina);

