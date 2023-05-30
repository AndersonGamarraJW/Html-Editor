


const prevContainer = document.getElementById('prev-container');
const textArea = document.getElementById('input-textarea');
const prevCurrentSelectElement = document.getElementById('prev-current-select-paragraph');
const itemSelectedEditTextArea = document.getElementById('edit-textarea');
//Current element module
const currentHtmlElement = (()=>{
    let currentElement = document.createElement('h1');
    let lastStyleClass = '';
    let selectValue = false;
    const getElement = () => currentElement;
    const setElement = (current) => currentElement = current;
    const getTag = () => currentElement.tagName;
    const getContent = () => currentElement.innerHTML;
    const setContent = (value) => currentElement.textContent = value;
    const getString = () => currentElement.outerHTML;
    const addStyleClass = (styleClass) =>{
        lastStyleClass = styleClass;
        currentElement.classList.add(styleClass);
    }
    const removeLastStyleClass = ()=>{
        if(lastStyleClass == '')
            return;
        currentElement.classList.remove(lastStyleClass);
    }
    const select = () => selectValue = true;
    const unSelect = () => selectValue = false;
    const isSelect = () => selectValue;
    return{
        getElement,
        setElement,
        getTag,
        getContent,
        setContent,
        getString,
        addStyleClass,
        removeLastStyleClass,
        select,
        unSelect,
        isSelect
    }
}
)();

function selectHtmlElement(event){
    currentHtmlElement.removeLastStyleClass();
    currentHtmlElement.setElement(event.target);
    currentHtmlElement.select();
    prevCurrentSelectElement.textContent = currentHtmlElement.getTag();
    currentHtmlElement.addStyleClass('element-selected');
    itemSelectedEditTextArea.value = currentHtmlElement.getContent();
}
function prevUpdateTexContentItemSelected(e){
    currentHtmlElement.setContent(e.target.value);
}

function copyHtmlClipboard(){
    const content = prevContainer.innerHTML;
    navigator.clipboard.writeText(content)
        .then(()=>{
            console.log('Se copio con exito');
        })
        .catch((error)=>{
            console.error('Error al copiar al portapeles',error);
        });
}

itemSelectedEditTextArea.addEventListener('input',(e)=>{prevUpdateTexContentItemSelected(e)});

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
    //Vamos a refactorizar cada execute de los comandos para que tenga un
    //donde se creara
    executeCommand(command){
        if (currentHtmlElement.isSelect() == true){
            command.execute(currentHtmlElement.getElement());
        }
        else {
            const aux = document.createElement('div');
            prevContainer.appendChild(aux);
            command.execute(aux);
            aux.remove();
        }
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
    execute(htmlElementSup){
        htmlElementSup.insertAdjacentElement('afterend',this.h1ElementGenerator.getResult());
        textArea.value = '';
    }
    undo(){

    }
}
class SubtitleCommand{
    constructor(textContent){
        this.textSubtitle = textContent;
        this.currentHtmlElementTag = currentHtmlElement.getTag(); 
    }
    execute(htmlElementSup){
        let numberH = Number(this.currentHtmlElementTag[1]);
        numberH += 1;
        const newHeaderTag = this.currentHtmlElementTag[0] + numberH.toString();
        const subtitleElement = new HtmlElementGenerator(newHeaderTag);
        if(this.textSubtitle != ''){
            subtitleElement.addText(this.textSubtitle);
            htmlElementSup.insertAdjacentElement('afterend',subtitleElement.getResult());
            textArea.value = '';
        }
        
        
    }
    undo(){

    }
}
class deleteCommand{
    constructor(htmlElement){
        this.htmlElement = htmlElement;
    }
    execute(htmlElementSup){
        this.htmlElement.remove();
        itemSelectedEditTextArea.value = '';
    }
    undo(){

    }
}
class ParagraphCommand{
    constructor(textContent){
        this.textContent = textContent;
    }
    execute(htmlElementSup){
        const paragraphHtmlElement = new HtmlElementGenerator('p');
        paragraphHtmlElement.addText(this.textContent);
        
        htmlElementSup.insertAdjacentElement('afterend',paragraphHtmlElement.getResult());
        textArea.value = '';
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
const deleteItemSelected = document.getElementById('button-delete-item-selected');
deleteItemSelected.addEventListener('click',() =>{
    toolBar.executeCommand(new deleteCommand(currentHtmlElement.getElement()));
    currentHtmlElement.unSelect();
});
const paragraphButton = document.getElementById('parrafo-button');
paragraphButton.addEventListener('click',()=>{
    toolBar.executeCommand(new ParagraphCommand(textArea.value));
});
const copyHtmlClipboardButton = document.getElementById('copy-html-clipboard');
copyHtmlClipboardButton.addEventListener('click',copyHtmlClipboard); 