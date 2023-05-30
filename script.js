


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

class CommandHistory{
    constructor(){
        this.commandHistory = [];
    }
    addCommand(command){
        this.commandHistory.push(command);
    }
    popCommand(){
        return this.commandHistory.pop();
    }
}
class ToolBar{
    constructor(){
        this.commandHistory = new CommandHistory();
    }
    executeCommand(command){
        command.execute();
        this.commandHistory.addCommand(command);   
    }
    undo(){
        
    }
}
class TitleCommand {
    constructor(textContent){
        this.h1ElementGenerator = new HtmlElementGenerator('h1');
        this.textContent = textContent;
        this.h1ElementGenerator.addText(this.textContent);
    }
    execute(){
        prevContainer.appendChild(this.h1ElementGenerator.getResult());
    }
    undo(){

    }
}
class SubtitleCommand{
    constructor(textContent){
        this.textSubtitle = textContent;
        this.currentHtmlElementTag = currentHtmlElement.getTag(); 
    }
    execute(){
        let numberH = Number(this.currentHtmlElementTag[1]);
        numberH += 1;
        const newHeaderTag = this.currentHtmlElementTag[0] + numberH.toString();
        const subtitleElement = new HtmlElementGenerator(newHeaderTag);
        if(this.textSubtitle != ''){
            subtitleElement.addText(this.textSubtitle);
            prevContainer.appendChild(subtitleElement.getResult());
            textArea.value = '';
        }
        
    }
    undo(){

    }
}

toolBar = new ToolBar();

const titleButton = document.getElementById('title-button');
titleButton.addEventListener('click',()=>{
    toolBar.executeCommand(new TitleCommand(textArea.value));
});
const subtitleButton = document.getElementById('subtitle-button');
subtitleButton.addEventListener('click',()=>{
    toolBar.executeCommand(new SubtitleCommand(textArea.value));
});