import {UI} from './classes'
import {readCountry} from './countries'
//Variables globales:
const form = document.getElementById('form');
//Instanciando clases:
const ui = new UI();
export function handleSubmit(e){
    e.preventDefault();
    ui.delete();
    //Variables:
    const destination = document.getElementById('destination').value; 
    const country1 = document.getElementById('country').value;
    let country = "";
    if (country1 === ""){
        country = 'US';
    }else{
        country = readCountry(country1);
    }
    const dateStart = document.getElementById('dateStart').value;
    const dateFinish = document.getElementById('dateFinish').value;
    
    let fechaInicio = new Date(dateStart);
    let fechaFin = new Date(dateFinish);

    let diferencia = (Math.abs(fechaFin.getTime() - fechaInicio.getTime()))/(1000*60*60*24);
   
    const today = new Date();
    //Variables para validación de fecha
    let month = (today.getMonth()+1).toString();
    if(month.length === 1){
        month = "0" + month;
    }
    let day = today.getDate().toString();
    if(day.length === 1){
        day = "0" + day;
    }
    const fechaActual = `${today.getFullYear()}-${month}-${day}`;
    //Validación
    if(destination === "" || dateStart === "" || dateFinish === ""){
        ui.showMessage('Please, complete the form');
        return false;
    }else if(dateStart < fechaActual){
        ui.showMessage('The date to start the trip is invalid, please, try again');
        return false;
    }else if(dateStart > dateFinish){
        ui.showMessage('The date is wrong, please, try again');
    }else{        
        postData('/myTrips', {'destination':destination, 'country':country, 'dateStart':dateStart, 'dateFinish':dateFinish, 'diferencia':diferencia});
    }
}

form.addEventListener('submit', handleSubmit, false);

const postData = async(url='', data={})=>{
    const response = await fetch(url,{
        method:'POST', //*GET, POST, PUT, DELETE, etc.
        credentials:'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        //Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        ui.showResults(newData);
        return newData;
   }catch(error){
       console.log('Error: ', error);
   }
 }     