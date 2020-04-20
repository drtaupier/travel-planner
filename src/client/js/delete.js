import {UI} from './classes';
const ui = new UI();

const resultData = document.getElementById('resultados');

resultData.addEventListener('click', function(element){
    ui.deleteResult(element.target);
});