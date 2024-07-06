// para cargar las demas paginas
let page=1;
const btnBefore = document.getElementById('btnBefore');
const btnAfter = document.getElementById('btnAfter');


btnAfter.addEventListener('click', () => {
	if(page < 2){
		page += 1;
        $('#onload').fadeIn(); // Mostrar el loader con un efecto de desvanecimiento
        $('body').addClass('hidden'); // Ocultar el contenido principal
		cargarDatos();
        document.getElementById('btnAfter').hidden = true;
	}
});

btnBefore.addEventListener('click', () => {
	if(page > 1){
		page -= 1;
        $('#onload').fadeIn(); // Mostrar el loader con un efecto de desvanecimiento
        $('body').addClass('hidden'); // Ocultar el contenido principal
		cargarDatos();
        document.getElementById('btnAfter').hidden = false;
	}
});



const cargarDatos= async()=>{
    try{
        const respuesta=await fetch(`https://reqres.in/api/users?delay=3&page=${page}`);
        $('#onload').fadeOut();
        $('body').removeClass('hidden');
       /*  console.log(respuesta); */
        const data=await respuesta.json();
        /* const id=[];
        const names=[];
        const lastnames=[];
        const email=[];
        const image=[]; */
        //console.log(data);
        const allDataUsers=data.data.map(user => {
           return `
            <tr>
                <th scope="row" class="text-center">${user.id}</th>
                <td class="text-center">${user.first_name}</td>
                <td class="text-center">${user.last_name}</td>
                <td class="text-center">${user.email}</td>
                <td class="text-center"><img src="${user.avatar}" alt="Foto de usuario" class="rounded-circle"></td>
            </tr>
            `
        });

        document.getElementById('add-users').innerHTML = allDataUsers;
        

        /* const fecha=new Date();
        const fechahora=fecha.toISOString() // esto funciona para traer fecha y hora

        const almacenamiento={
            data:data,
            fechahora:fechahora
        }

        localStorage.setItem('respuestaGET',JSON.stringify(almacenamiento));

        console.log(almacenamiento); */

    }catch(error){
        console.log(error);
    }

    
}

/* const getData=async()=>{
    try{
        const obtainData=await localStorage.getItem('respuestaGET');
        if(obtainData){
            const objectData=await JSON.parse(obtainData);
            const timeconsult=new Date(objectData.fechahora).getTime();
            const timeactual=Date.now();
            if(timeactual-timeconsult<60000){
                console.log('Esta dentro del tiempo', timeconsult)
                return timeconsult;
            }else{
                cargarDatos();
            }
        }
    }catch(error){
        console.log("esta mal");
    }
} */
cargarDatos();
/* getData(); */
