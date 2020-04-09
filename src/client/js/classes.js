export class Datos{
    constructor(destination, fecha){
        this.destination = destination;
        this.fecha = fecha;
    }
}

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

    showResults(datos){
        const resultados = document.getElementById('resultados');
        const element = document.createElement('div');
        element.classList.add('showResults');
        element.innerHTML = `<p>${datos.destination}</p>`;
        element.innerHTML += `<p>${datos.fecha}</p>`;
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
