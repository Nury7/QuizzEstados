
 function mostrarDatos(){
             
    table.innerHTML = ``

    estadosList = JSON.parse(localStorage.getItem('estados')) ?? []

    //Muestra los datos en la tabla
    estadosList.forEach(function (value, i){
       
        var table = document.getElementById('table')

        table.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${value.nombre}</td>
                <td>${value.clave}</td>
                <td>${value.capital}</td>
                <td>${value.habitantes}</td>
                <td>${value.imagen}</td>
                <td>${value.incorrecta1}</td>
                <td>${value.incorrecta2}</td>
                <td>${value.incorrecta3}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="buscar(${value.id})">
                        <i class="fa fa-edit"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="eliminar(${value.id})">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>`
    })
}


function guardar(){
    
    var id
    //se evalua la primera expresion y si su resultado es verdadero entonces se evalua y devuelve como resultado la expresion2 
    //pero si la primera expresion es falso se evalua y devuelve la expresion 3
    estadosList = JSON.parse(localStorage.getItem('estados')) ?? []
    //si es cero el length de la cadena entonces  al id=0
    estadosList.length != 0 ? estadosList.findLast((item) => id = item.id) : id = 0

    if(document.getElementById('id').value){

        estadosList.forEach(value => {
            if(document.getElementById('id').value == value.id){
                value.nombre      = document.getElementById('nombre').value, 
                value.clave       = document.getElementById('clave').value, 
                value.capital     = document.getElementById('capital').value, 
                value.habitantes  = document.getElementById('habitantes').value
                value.incorrecta1  = document.getElementById('incorrecta1').value
                value.incorrecta2  = document.getElementById('incorrecta2').value
                value.incorrecta3  = document.getElementById('incorrecta3').value
                value.imagen      = document.getElementById('imagen').value
            }
        });

        //elimina el input escondido
        document.getElementById('id').value = ''

    }else{

        var item = {
            id          : id + 1, 
            nombre      : document.getElementById('nombre').value, 
            clave       : document.getElementById('clave').value, 
            capital     : document.getElementById('capital').value, 
            habitantes  : document.getElementById('habitantes'). value,
            incorrecta1  : document.getElementById('incorrecta1'). value,
            incorrecta2  : document.getElementById('incorrecta2'). value,
            incorrecta3  : document.getElementById('incorrecta3'). value,
            imagen      : document.getElementById('imagen'). value
        }
       //Agrega un item de datos a un array
    estadosList.push(item)

    }

    // guardar array en el storage
    localStorage.setItem('estados', JSON.stringify(estadosList))

    //Acualiza la tabla
    mostrarDatos()

    //elimina
    document.getElementById('form').reset()
}
//Obtiene datos por medio de id
function buscar(id){
    //obtener datos del almacenamiento local y almacenarlos en la matriz de estados
    //debemos usar JSON.parse, porque los datos como cadena, necesitamos convertirlos 
    // en una matriz
    estadosList = JSON.parse(localStorage.getItem('estados')) ?? []

    estadosList.forEach(function (value){
        if(value.id == id){
           document.getElementById('id').value = value.id
           document.getElementById('nombre').value = value.nombre
           document.getElementById('clave').value = value.clave
           document.getElementById('capital').value = value.capital
           document.getElementById('habitantes').value   = value.habitantes
           document.getElementById('incorrecta1'). value = value.incorrecta1,
           document.getElementById('incorrecta2'). value = value.incorrecta2,
           document.getElementById('incorrecta3'). value = value.incorrecta3,
           document.getElementById('imagen').value = value.imagen
        }
    })
}




function eliminar(id){
  
    estadosList = JSON.parse(localStorage.getItem('estados')) ?? []

    estadosList = estadosList.filter(function(value){ 
        return value.id != id; 
    });

    // guarda array en el localstorage
    localStorage.setItem('estados', JSON.stringify(estadosList))


    mostrarDatos()
}