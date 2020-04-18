export class UI{
    footer(){
        const today = new Date;
        const year = today.getFullYear();
        const footer = document.getElementById('footer');
        const element = document.createElement('div');
        element.classList.add('footerCopy');
        element.innerHTML = `<h3>&copy; Copyright ${year}`;
        footer.appendChild(element);
    }

    delete(){
        const boton = document.getElementById('send');
        boton.addEventListener('click', ()=>{
            const resultado = boton.parentElement.parentElement.nextElementSibling.firstElementChild;
            if(resultado){
                resultado.remove();
            }
        })
    }

    showResults(newData){
        const resultados = document.getElementById('resultados');
        const element = document.createElement('div');
        element.classList.add('showResults');
        element.innerHTML = `<p>You would like going to <b>${newData.destination}</b></p>`;
        element.innerHTML += `<p><b>${newData.country}</b></p>`;
        element.innerHTML += `<p>From: ${newData.dateStart}</p>`;
        element.innerHTML += `<p>To: ${newData.dateFinish}</p>`;
        element.innerHTML += `<p>Your trip will be for ${newData.diferencia} days</p>`;
        element.innerHTML += `<p><img src='${newData.imageWeb}'></p>`;
        element.innerHTML += `<p>Weather Forecast: ${newData.weatherDescription}</p>`;
        element.innerHTML += `<p>Cº ${newData.weatherTemp}</p>`;
        resultados.appendChild(element);
    }

    showMessage(mensaje){
        const resultados = document.getElementById('resultados');
        const element = document.createElement('div');
        element.classList.add('showMessage');
        element.innerHTML = `<p>${mensaje}</p>`;
        resultados.appendChild(element);
    }
}

