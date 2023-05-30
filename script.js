


const prevContainer = document.getElementById('prev-container');
const textArea = document.getElementById('input-textarea');

//Current element module
const currentElement = (()=>{
    let currentElement = null;
    const getElement = () => currentElement;
    const setElement = (currentElement) => currentElement = currentElement;
    const getTag = () => currentElement.tagName;
    const getContent = () => currentElement.innerHTML;
    const getString = () => currentElement.outerHTML;
    return{
        getElement,
        setElement,
        getTag,
        getContent,
        getString
    }
}
)();

function selectHtmlElement(event){
    let element = event.target;
    console.log(element.innerHTML);
}

class HtmlElementGenerator{
    constructor(htmlElement){
        this.htmlElement = document.createElement(htmlElement);
        this.htmlElement.addEventListener('click',selectHtmlElement);
    }
    addText(content){
        this.htmlElement.textContent = content;
    }
    getResult(){
        return this.htmlElement;
    }
}
class HtmlGeneratorString{
    constructor(){
        this.htmlTotal = '';
    }
    addContent(htmlElement){
        this.htmlTotal += htmlElement.outerHTML;
    }
    get htmlTotal(){
        return this.htmlTotal;
    }
}



function createTitleFromTextArea(){
    let titleGenerator = new HtmlElementGenerator('h1');
    titleGenerator.addText(textArea.value);
    prevContainer.appendChild(titleGenerator.getResult());
}

function createSubtitleFromTextArea(){
       
    let subtitleGenerator = new HtmlElementGenerator();

}
const titleButton = document.getElementById('title-button');
titleButton.addEventListener('click',createTitleFromTextArea);