import {UI} from './classes'
import {Datos} from './classes'
//Variables globales:

const form = document.getElementById('form');
//Instanciando clases:
const ui = new UI();


export function handleSubmit(e){
    e.preventDefault();
    ui.delete();
    const destination = document.getElementById('destination').value;
    const fecha = document.getElementById('fechaViaje').value;
    if(destination === "" || fecha === ""){
        ui.showMessage('Please, complete the form');
        return false;
    }
    const datos = new Datos(destination, fecha);
    ui.showResults(datos);
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
        imprimir.resultados(newData);
        return newData;
   }catch(error){
       console.log('Error: ', error);
   }
 }     