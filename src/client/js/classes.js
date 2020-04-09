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
}