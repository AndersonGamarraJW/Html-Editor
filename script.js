


const prevContainer = document.getElementById('prev-container');
const textArea = document.getElementById('input-textarea');


class HtmlElementGenerator{
    constructor(htmlElement){
        this.htmlElement = document.createElement(htmlElement);
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

function selectHtmlElement(){
    
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