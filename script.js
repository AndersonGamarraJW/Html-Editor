


const prevContainer = document.getElementById('prev-container');
const textArea = document.getElementById('input-textarea');

//Current element module
const currentHtmlElement = (()=>{
    let currentElement = null;
    const getElement = () => currentElement;
    const setElement = (current) => currentElement = current;
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
    currentHtmlElement.setElement(event.target);
    console.log(currentHtmlElement.getTag());
}

class HtmlElementGenerator{
    constructor(htmlElement){
        this.htmlElement = document.createElement(htmlElement.toLowerCase());
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
    const currentHtmlTag = currentHtmlElement.getTag();
    let numberH = Number(currentHtmlTag[1]);
    numberH += 1;
    const newHtmlElement = currentHtmlTag[0] + numberH.toString();  

    console.log(newHtmlElement);
}
const titleButton = document.getElementById('title-button');
titleButton.addEventListener('click',createTitleFromTextArea);
const subtitleButton = document.getElementById('subtitle-button');
subtitleButton.addEventListener('click',createSubtitleFromTextArea);