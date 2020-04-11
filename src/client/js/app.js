import {UI} from './classes'
//Variables globales:
const form = document.getElementById('form');
//Instanciando clases:
const ui = new UI();
export function handleSubmit(e){
    e.preventDefault();
    ui.delete();
    //Variables:
    const destination = document.getElementById('destination').value;
    const dateStart = document.getElementById('dateStart').value;
    const dateFinish = document.getElementById('dateFinish').value;
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
    console.log(fechaActual);
    console.log(dateStart);
    
    if(destination === "" || dateStart === "" || dateFinish === ""){
        ui.showMessage('Please, complete the form');
        return false;
    }else if(dateStart < fechaActual){
        ui.showMessage('The date to start the trip is invalid, please, try again');
        return false;
    }else if(dateStart > dateFinish){
        ui.showMessage('The date is wrong, please, try again');
    }else{
        ui.showResults(destination, dateStart, dateFinish);
        postData('/myTrips', {'destination':destination, 'dateStart':dateStart, 'dateFinish':dateFinish});
    }
}

form.addEventListener('submit', handleSubmit, false);

export const postData = async(url='', data={})=>{
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
        return newData;
   }catch(error){
       console.log('Error: ', error);
   }
 }     