window.onload = () => {
    // Crear tarjetas al cargar la página
    if (typeof filosofos !== 'undefined') {
        crearTarjetas(filosofos);
    }

    // Crear handlers para los botones de control
    const botonCrearTarjeta = document.querySelector('.create-btn');
    if (botonCrearTarjeta) {
        botonCrearTarjeta.addEventListener('click', crearNuevaTarjeta);
    } else {
        console.error('Botón de creación no encontrado');
    }

    // Event listeners para los botones de ordenación
    const botonOrdenAZ = document.querySelector('.sort-btn:first-child');
    const botonOrdenZA = document.querySelector('.sort-btn:last-child');

    if (botonOrdenAZ) {
        botonOrdenAZ.addEventListener('click', ordenarNombreAZ);
    } else {
        console.error('Botón de ordenación A-Z no encontrado');
    }

    if (botonOrdenZA) {
        botonOrdenZA.addEventListener('click', ordenarNombreZA);
    } else {
        console.error('Botón de ordenación Z-A no encontrado');
    }

    // Event listener para guardar
    const botonGuardar = document.querySelector('.save-btn');
    if (botonGuardar) {
        botonGuardar.addEventListener('click', guardarTarjetas);
    } else {
        console.error('Botón de guardar no encontrado');
    }

    // Event listener para cargar
    const botonCargar = document.querySelector('.load-btn');
    if (botonCargar) {
        botonCargar.addEventListener('click', cargarTarjetas);
    } else {
        console.error('Botón de cargar no encontrado');
    }

    // Intentar cargar las tarjetas desde localStorage
    cargarTarjetas();
};


function crearNuevaTarjeta(event) {
    event.preventDefault();

    let nuevoFilosofo = {
        nombre: document.querySelector('.create-card-form .nombre').value,
        imagen: document.querySelector('.create-card-form .foto').value,
        pais: {
            nombre: document.querySelector('.create-card-form .pais').value,
            bandera: document.querySelector('.create-card-form .bandera').value,
        },
        corriente: document.querySelector('.create-card-form .corriente').value,
        arma: document.querySelector('.create-card-form .arma').value,
        habilidades: [
            { habilidad: 'Sabiduría', nivel: parseInt(document.querySelector('.create-card-form .skills1').value) },
            { habilidad: 'Oratoria', nivel: parseInt(document.querySelector('.create-card-form .skills2').value) },
            { habilidad: 'Lógica', nivel: parseInt(document.querySelector('.create-card-form .skills3').value) },
            { habilidad: 'Innovación', nivel: parseInt(document.querySelector('.create-card-form .skills4').value) }
        ]
    };

    crearTarjetas([nuevoFilosofo]);
}

function crearTarjetas(filosofos) {
    filosofos.forEach((filosofo) => {
        // Crear el contenedor principal de la tarjeta
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('card');

        // Crear la imagen
        let imagen = document.createElement('img');
        imagen.src = filosofo.imagen;
        imagen.alt = `Foto de ${filosofo.nombre}`;
        imagen.classList.add('photo');
        tarjeta.appendChild(imagen);

        // Crear el contenedor de la información de la tarjeta
        let info = document.createElement('div');
        info.classList.add('card-info');
        tarjeta.appendChild(info);

        // Crear el título (nombre del filósofo)
        let titulo = document.createElement('h3');
        titulo.classList.add('nombre');
        titulo.innerHTML = filosofo.nombre;
        info.appendChild(titulo);

        // Crear la fila de información (país, corriente y arma)
        let filaInfo = document.createElement('div');
        filaInfo.classList.add('info-row');
        info.appendChild(filaInfo);

        // País: Bandera y nombre
        let paisDiv = document.createElement('div');
        paisDiv.classList.add('info-item');
        paisDiv.innerHTML = `
            <img src="${filosofo.pais.bandera}" alt="Bandera de ${filosofo.pais.nombre}" class="icon">
            ${filosofo.pais.nombre}`;
        filaInfo.appendChild(paisDiv);

        // Corriente filosófica
        let corrienteDiv = document.createElement('div');
        corrienteDiv.classList.add('info-item');
        corrienteDiv.innerHTML = `<strong>Corriente:</strong> ${filosofo.corriente}`;
        filaInfo.appendChild(corrienteDiv);

        // Arma principal
        let armaDiv = document.createElement('div');
        armaDiv.classList.add('info-item');
        armaDiv.innerHTML = `<strong>Arma:</strong> ${filosofo.arma}`;
        filaInfo.appendChild(armaDiv);

        // Crear la sección de habilidades
        let habilidadesDiv = document.createElement('div');
        habilidadesDiv.classList.add('skills');
        info.appendChild(habilidadesDiv);

        // Iterar por cada habilidad y crear su representación en la tarjeta
        for (let infoHabilidad of filosofo.habilidades) {
            let habilidadDiv = document.createElement('div');
            habilidadDiv.classList.add('skill');

            // 1. Icono de habilidad
            let iconoHabilidad = document.createElement('img');
            iconoHabilidad.src = 'https://via.placeholder.com/16';
            iconoHabilidad.alt = `Icono de ${infoHabilidad.habilidad}`;
            habilidadDiv.appendChild(iconoHabilidad);

            // 2. Etiqueta de habilidad
            let etiquetaHabilidad = document.createElement('span');
            etiquetaHabilidad.classList.add('skill-name');
            etiquetaHabilidad.textContent = infoHabilidad.habilidad;
            habilidadDiv.appendChild(etiquetaHabilidad);

            // 3. Barra de habilidad
            let barraHabilidad = document.createElement('div');
            barraHabilidad.classList.add('skill-bar');

            let nivelHabilidad = document.createElement('div');
            nivelHabilidad.classList.add('level');
            nivelHabilidad.style.width = `${infoHabilidad.nivel * 25}%`;
            barraHabilidad.appendChild(nivelHabilidad);

            habilidadDiv.appendChild(barraHabilidad);

            habilidadesDiv.appendChild(habilidadDiv);
        }

        // Crear y añadir botón de eliminación
        let botonEliminar = document.createElement('div');
        botonEliminar.innerHTML = '&#x2716'; // Carácter de aspa (✖)
        botonEliminar.classList.add('botonEliminar');
        botonEliminar.addEventListener('click', eliminarTarjeta);
        tarjeta.appendChild(botonEliminar);

        // Añadir la tarjeta creada al contenedor
        let contenedor = document.querySelector('.cards-container');
        contenedor.appendChild(tarjeta);
    });
}

function eliminarTarjeta(event) {
    // Eliminar la tarjeta (que es el padre del botón)
    let tarjeta = event.target.parentNode;
    tarjeta.remove();
}

document.addEventListener('DOMContentLoaded', function() {
    const ordenarAZ = document.getElementById('ordenarAZ');
    const ordenarZA = document.getElementById('ordenarZA');

    if (ordenarAZ && ordenarZA) {
        ordenarAZ.addEventListener('click', ordenarNombreAZ);
        ordenarZA.addEventListener('click', ordenarNombreZA);
    }
});

function ordenarNombreAZ() {
    // Obtener todas las tarjetas como un array
    let tarjetas = Array.from(document.querySelectorAll('.card'));

    // Ordenar las tarjetas alfabéticamente por el nombre
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        // Obtener el nombre de cada tarjeta
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;

        // Comparar los nombres alfabéticamente
        return nombre1.localeCompare(nombre2);
    });

    // Eliminar todas las tarjetas del contenedor
    let contenedor = document.querySelector('.cards-container');
    contenedor.innerHTML = '';  // Elimina todos los elementos hijos

    // Añadir las tarjetas ordenadas al contenedor
    tarjetasOrdenadas.forEach(tarjeta => {
        contenedor.appendChild(tarjeta);
    });
}


function ordenarNombreZA() {
    // Obtener todas las tarjetas como un array
    let tarjetas = Array.from(document.querySelectorAll('.card'));

    // Ordenar las tarjetas alfabéticamente por el nombre en orden inverso
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        // Obtener el nombre de cada tarjeta
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;

        // Comparar los nombres alfabéticamente, pero invirtiendo el orden
        return nombre2.localeCompare(nombre1); // Invertimos el orden aquí
    });

    // Eliminar todas las tarjetas del contenedor
    let contenedor = document.querySelector('.cards-container');
    contenedor.innerHTML = '';  // Elimina todos los elementos hijos

    // Añadir las tarjetas ordenadas al contenedor
    tarjetasOrdenadas.forEach(tarjeta => {
        contenedor.appendChild(tarjeta);
    });
}


function parsearTarjetas(tarjetas) {
    let filosofosParseados = [];

    for (let tarjeta of tarjetas) {
        let filosofo = {};

        // Extraer la información de la tarjeta
        let nombreElem = tarjeta.querySelector('.nombre');
        let imagenElem = tarjeta.querySelector('.photo');
        let paisElem = tarjeta.querySelector('.pais');
        let corrienteElem = tarjeta.querySelector('.corriente');
        let armaElem = tarjeta.querySelector('.arma');

        filosofo.nombre = nombreElem ? nombreElem.innerHTML : 'Sin nombre';
        filosofo.imagen = imagenElem ? imagenElem.src : '';
        filosofo.pais = paisElem ? paisElem.innerHTML : 'Desconocido';
        filosofo.corriente = corrienteElem ? corrienteElem.innerHTML : 'No definida';
        filosofo.arma = armaElem ? armaElem.innerHTML : 'Sin arma';

        // Extraer las habilidades
        let habilidades = tarjeta.querySelectorAll('.skill');
        filosofo.habilidades = Array.from(habilidades).map(habilidad => {
            let habilidadNombreElem = habilidad.querySelector('.skill-name');
            let nivelElem = habilidad.querySelector('.level');

            return {
                nombre: habilidadNombreElem ? habilidadNombreElem.innerHTML : 'Habilidad desconocida',
                nivel: nivelElem ? nivelElem.style.width : '0%'
            };
        });

        // Añadir el objeto de filósofo a la lista
        filosofosParseados.push(filosofo);
    }

    return filosofosParseados;
}



function guardarTarjetas(){ 
    let tarjetas = Array.from(document.querySelectorAll('.card')); 
    localStorage.setItem('tarjetas',JSON.stringify(parsearTarjetas(tarjetas))); 
}

function cargarTarjetas() {
    let tarjetasGuardadas = JSON.parse(localStorage.getItem('tarjetas'));
    if (tarjetasGuardadas) {
        crearTarjetas(tarjetasGuardadas);  // Usar la función que ya tienes para crear las tarjetas
        console.log("Tarjetas cargadas desde localStorage");
    } else {
        console.log("No hay tarjetas guardadas en localStorage");
    }
}


// Función auxiliar para crear el HTML de una tarjeta a partir de un objeto
function crearTarjetaHTML(filosofo) {
    let tarjeta = document.createElement('div');
    tarjeta.classList.add('card');
    
    tarjeta.innerHTML = `
        <img src="${filosofo.imagen}" alt="Foto de Filósofo" class="photo">
        <div class="card-info">
            <h3 class="nombre">${filosofo.nombre}</h3>
            <div class="info-row">
                <div class="info-pais">
                    <span class="pais">${filosofo.pais}</span>
                </div>
                <div class="info-corriente">
                    <span>Corriente: </span><span class="corriente">${filosofo.corriente}</span>
                </div>
                <div class="info-arma">
                    <span>Arma: </span><span class="arma">${filosofo.arma}</span>
                </div>
            </div>
            <div class="skills">
                ${filosofo.habilidades.map(habilidad => `
                    <div class="skill">
                        <span class="skill-name">${habilidad.nombre}</span>
                        <div class="skill-bar">
                            <div class="level" style="width: ${habilidad.nivel};"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    return tarjeta;
}




const filosofos = [
    {
        nombre: "Platón",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clemetino_Inv305.jpg/1200px-Plato_Pio-Clemetino_Inv305.jpg",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Idealismo",
        arma: "Dialéctica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 4
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 4
        }
        ]
    },
    {
        nombre: "Aristóteles",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXUwy_fFGOJ2vwOMpwtJPyXc9HVb06HSRsbembn7IPKq6D1YitIra2WFM4Gu2rm6yHRs&usqp=CAU",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Naturalismo",
        arma: "Lógica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 4
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Descartes",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
        pais: {
            nombre: "Francia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"
        },
        corriente: "Racionalismo",
        arma: "Meditación",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Kant",
        imagen: "https://i.pinimg.com/736x/20/89/7f/20897f915acb5124893a278c395382ed.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Trascendentalismo",
        arma: "Crítica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Hume",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFZYg2MiOQSXbkBvFP-T3vW9pnhLW5qDioA&s",
        pais: {
            nombre: "Escocia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/640px-Flag_of_Scotland.svg.png"
        },
        corriente: "Empirismo",
        arma: "Escepticismo",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Arendt",
        imagen: "https://efeminista.com/wp-content/uploads/2021/09/Arendt-Hannah-1-e1576158475623.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Fenomenología",
        arma: "Parresía",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    }
]