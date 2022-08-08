let notes = []
let titles = []
let dates = []
let pages = []
let textArea = []
let userInputTitle
let dateSaved
let textSaved
let countPages = 1 //num of pages 
let countNotes = 0  //num of notes 
let curr = 0    //current page 

const createNotes = ()=>{
    let Note = {   //Notes object
        saveAs: userInputTitle,
        date: dateSaved,
        //page: pageSaved,
        text: textSaved
    }
    countNotes++
    
    notes.push(Note)
    titles.push(userInputTitle)
    dates.push(dateSaved)
    //pages.push(pageSaved)
    textArea.push(textSaved)
    console.log(notes)

    //add key-value pair (k,v) to local storage
    localStorage.setItem('Notes', JSON.stringify(notes))
    localStorage.setItem('Titles', JSON.stringify(titles))
    localStorage.setItem('Dates', JSON.stringify(dates))
    //localStorage.setItem('Pages', JSON.stringify(pages))
    localStorage.setItem('Number_of_Notes', JSON.stringify(countNotes))
    localStorage.setItem('Number_of_Pages', JSON.stringify(countPages))
    localStorage.setItem('Text-Area', JSON.stringify(textArea))
}
const addPage = ()=>{
    
}
const addNewNote = ()=>{

}
const saveAs = ()=>{
    let getTitles = JSON.parse(localStorage.getItem('Titles'))
    let getTextArea = JSON.parse(localStorage.getItem('Text-Area'))
    let confirm
    if(getTextArea[curr] == null){
        confirm = window.confirm('Notes can not be empty')
    }
    else if(getTitles[curr] != null){  //There is a title already created 
        titles.splice(curr - 1,1) //delete current title
        console.log("TITLE")
        userInputTitle = prompt('Save Notes As')
        if(userInputTitle == null){ //save notes with new title
            return 
        }
        else{
            let removeRadioBtn = document.getElementsByTagName('input')
            while (removeRadioBtn.length) { //delete radio btn in html
                removeRadioBtn[curr].parentNode.removeChild(removeRadioBtn[curr])
            }
            dateSaved = getDate()
            getTitles[curr] = userInputTitle
            titles.push(getTitles[curr])
            localStorage.setItem('Titles', JSON.stringify(titles))
            window.location.reload()
            displayNotes()
        }
    }
    else{   //There is not a title created
        userInputTitle = prompt('Save Notes As')
        if(userInputTitle == null){
            return 
        }
        else{
            dateSaved = getDate()
            createNotes()
            displayNotes()
        }

    }
   
}
const savePage = ()=>{
   let getTitles = JSON.parse(localStorage.getItem('Titles'))
        if(getTitles != null ){
            localStorage.setItem('Text-Area', JSON.stringify(textSaved))
        }
        else{
            let confirm = window.confirm('You must create a title for new notes before saving!')
            if(confirm == true){
               saveAs()
            }
            else{
                return
            }
           
        }

}
const deleteNotes = ()=>{
    let elem = document.getElementsByName('notes')
    for(i = 0; i < elem.length; i++){
        if(elem[i].checked){
            notes.splice(curr - 1,1) 
            titles.splice(curr - 1,1) 
            dates.splice(curr - 1,1) 
            textArea.splice(curr - 1,1) 
            console.log(notes)
            //document.getElementById('displayNotes').innerHTML = 'ELEM ' + elem[i].value
        }
    }
    localStorage.setItem('Notes', JSON.stringify(notes))
    localStorage.setItem('Titles', JSON.stringify(titles))
    localStorage.setItem('Dates', JSON.stringify(dates))
    //localStorage.setItem('Pages', JSON.stringify(pages))
    localStorage.setItem('Number_of_Notes', JSON.stringify(countNotes))
    localStorage.setItem('Number_of_Pages', JSON.stringify(countPages))
    localStorage.setItem('Text-Area', JSON.stringify(textArea))

    let removeRadioBtn = document.getElementsByTagName('input')
    while (removeRadioBtn.length) { //delete radio btn in html
        removeRadioBtn[curr].parentNode.removeChild(removeRadioBtn[curr])
    }
    window.location.reload()
}
const getDate = ()=>{
    const now = new Date()
    let offset = now.getTimezoneOffset()
    let dst = 60    //day-light savings
    let systemTime
    let universalTime
    let timeZone 

    if ((now.getMonth() < 3) && (now.getDate() < 10)){  //turn off day-light savings from Nov 3 to March 10
        dst = 0
    }
    if((now.getMonth() > 9) && (now.getDate() > 2)){
        dst = 0
    }

    switch(offset){ //establish a time zone
        case(300 - dst): offset = 'East Coast'; break
        case(360 - dst): offset = 'Centeral'; break
        case(420 - dst): offset = 'Mountain'; break
        case(480 - dst): offset = 'Pacific'; break
    }

    systemTime = now.toString()
    universalTime = now.toUTCString()   //Universal Time Clock
    timeZone = offset
    
    /*.log('System Time: ' + systemTime )  
    console.log('UTC(GMT) Time: ' + universalTime)  
    console.log('\n Welcome to ' + timeZone + ' Visitors')*/
    return universalTime
}
const displayTotalNumber = ()=>{
    let getCountPages = JSON.parse(localStorage.getItem('Number_of_Pages'))
    let currPage = curr + 1
    if(getCountPages == null){
        document.getElementById('pageNum').innerHTML = "Page: 1/1"
    }
    else{
        document.getElementById('pageNum').innerHTML = "Page:" + currPage + "/" + getCountPages
    }
}
const displayNotes = ()=>{
    let radioBtn
    let label
    let newLine
    let div 
    let notesDescription
    let getTitles = JSON.parse(localStorage.getItem('Titles'))
    let getDates = JSON.parse(localStorage.getItem('Dates'))

    if(getTitles != null){
        radioBtn = document.createElement('input')   //create new tag in html
        radioBtn.type = 'radio'
        radioBtn.name = 'notes'
        radioBtn.id = 'title_date'
    
        label = document.createElement('label')
        label.htmlFor = 'title_date'
    
        notesDescription = document.createTextNode(getTitles[curr] + ", " +  getDates[curr])    //append description to creared <label>
        label.appendChild(notesDescription)
        newLine = document.createElement('br')
    
        div = document.getElementById('displayNotes')    //append created elements to <div> in html
        div.appendChild(radioBtn)
        div.appendChild(label)
        div.appendChild(newLine)
    }  
}
const displayTextArea = ()=>{
    let getTextArea = JSON.parse(localStorage.getItem('Text-Area'))
    let description = document.getElementById('description')
    description.innerHTML = getTextArea

}
const next = ()=>{
    
}
const prev = ()=>{

}
//localStorage.clear()
window.addEventListener('load', ()=>{
    let getNotes  = JSON.parse(localStorage.getItem('Notes'))
    let getTitles = JSON.parse(localStorage.getItem('Titles'))
    let getDates = JSON.parse(localStorage.getItem('Dates'))
    let getCountNotes = JSON.parse(localStorage.getItem('Number_of_Notes'))
    let getCountPages = JSON.parse(localStorage.getItem('Number_of_Pages'))
    let getTextArea = JSON.parse(localStorage.getItem('Text-Area'))
    
    if(document.readyState == 'complete' && getNotes != 0){    //when page refreshes, get local storage items and length and continue to add new items to local storage   
        countNotes = getCountNotes
        countPages = getCountPages
     
        displayNotes()
        displayTextArea()
        for(i = 0; i < countNotes; i++){
            console.log('Set back into local storage')
            console.log(getNotes[i])
           
            notes.push(getNotes[i])
            titles.push(getTitles[i])
            dates.push(getDates[i])
            //pages.push(pageSaved)
            //textArea.push(getTextArea[i])
        }
        localStorage.setItem('Notes', JSON.stringify(notes))
        localStorage.setItem('Titles', JSON.stringify(titles))
        localStorage.setItem('Dates', JSON.stringify(dates))
        //localStorage.setItem('Pages', JSON.stringify(pages))
        localStorage.setItem('Number_of_Notes', JSON.stringify(countNotes))
        localStorage.setItem('Number_of_Pages', JSON.stringify(countPages))
        localStorage.setItem('Text-Area', JSON.stringify(getTextArea))
    }

    displayTotalNumber()
    let description = document.getElementById('description')
    description.addEventListener('keyup', event=>{  //saves the text inside text area as user types   
      textSaved = event.target.value
      localStorage.setItem('Text-Area', JSON.stringify(textSaved))
    })
})

