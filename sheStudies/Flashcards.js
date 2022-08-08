let count = 0
let curr = 0
let clickFlashcard = false
let flashcardArr= []
let frontValues = []
let backValues = []
let userInputFront
let userInputBack

const displayTotalNumber = ()=>{  //next flashcard
    let getCount = JSON.parse(localStorage.getItem('length'))
    let currNum = curr + 1
    if(getCount == null){
        return "Total Number of Cards: 0/0"
    }
    else{
        return "Total Number of Cards:" + currNum + "/" + getCount
    }
}
const displayFront = ()=>{
    let getCount = JSON.parse(localStorage.getItem('length'))
    let getFrontValues = JSON.parse(localStorage.getItem('front-values'))

    if (getCount == null){    //local storage is empty
        return 'Please create a new flashcard'
    }
    else{
        document.getElementById('frontOrBack').innerHTML = 'Front'
        return getFrontValues[curr]  
    }
}
const displayBack = ()=>{   
    let getCount = JSON.parse(localStorage.getItem('length'))
    let getBackValues = JSON.parse(localStorage.getItem('back-values'))

    if (getCount == null){    //local storage is empty
        return 'Please create a new flashcard'
    }
    else{
        document.getElementById('frontOrBack').innerHTML = 'Back'
        return getBackValues[curr]  
    } 
}
const addFlashcard = ()=>{
    let flashcard = {   //falshcard object
        front: userInputFront,
        back: userInputBack,
    }
    flashcardArr.push(flashcard)  //push flashcard obj into the array
    frontValues.push(userInputFront)
    backValues.push(userInputBack)
    count++ //number of flashcards in array updated
    curr++ //current flashcard

    //add key-value pair (k,v) to local storage
    localStorage.setItem('FlashcardList', JSON.stringify(flashcardArr)) 
    localStorage.setItem('front-values', JSON.stringify(frontValues))
    localStorage.setItem('back-values', JSON.stringify(backValues))
    localStorage.setItem('length', JSON.stringify(count))

    console.log(displayFront() + ' ' + displayBack())   //testing purposes
    document.forms[0].reset();  //clear form for next entry

    document.getElementById('display').innerHTML = displayFront()
    document.getElementById('totalNum').innerHTML = displayTotalNumber()
}
const deleteFlashcard = ()=>{
    if (count > 1) {
        flashcardArr.splice(curr - 1,1) // remove current card
        frontValues.splice(curr - 1,1) // remove current card
        backValues.splice(curr - 1,1) // remove current card
    } else {
        flashcardArr = []
        frontValues = []
        backValues = []
    }
    
    count-- // number of flashcards in array updated
    
    // update to local storage
    localStorage.setItem('FlashcardList', JSON.stringify(flashcardArr)) 
    localStorage.setItem('front-values', JSON.stringify(frontValues))
    localStorage.setItem('back-values', JSON.stringify(backValues))
    localStorage.setItem('length', JSON.stringify(count))

    if (count == 0) {
        document.getElementById('display').innerHTML = 'Please create a new flashcard'
        curr == 0
    } else {
        document.getElementById('display').innerHTML = displayFront()
    }
    document.getElementById('totalNum').innerHTML = displayTotalNumber()
}

window.addEventListener('load', ()=>{   //when page is loaded
    let getLocalStorage = JSON.parse(localStorage.getItem('FlashcardList'))
    let getFrontValues = JSON.parse(localStorage.getItem('front-values'))
    let getBackValues = JSON.parse(localStorage.getItem('back-values'))
    let getCount = JSON.parse(localStorage.getItem('length'))

    if(document.readyState == 'complete'){    //when page refreshes, get local storage items and length and continue to add new items to local storage 
        count = getCount

        document.getElementById('display').innerHTML = displayFront()    
        document.getElementById('totalNum').innerHTML = displayTotalNumber()
        for(i = 0; i < getCount; i++){
            console.log('Set back into local storage')
            console.log(getLocalStorage[i])
            flashcardArr.push(getLocalStorage[i])
            frontValues.push(getFrontValues[i])
            backValues.push(getBackValues[i])
        }
        localStorage.setItem('FlashcardList', JSON.stringify(flashcardArr)) 
        localStorage.setItem('front-values', JSON.stringify(frontValues))
        localStorage.setItem('back-values', JSON.stringify(backValues))
        localStorage.setItem('length', JSON.stringify(count))
    }
    
    document.getElementById('createBtn').addEventListener('click',()=> {    //add a new flashcard
        let getCount = JSON.parse(localStorage.getItem('length'))
        userInputFront = prompt('Enter front: ')
        if(userInputFront == null){
           return
        }
        userInputBack = prompt('Enter back: ')
        if(userInputFront != null && userInputBack != null){
            curr = getCount - 1 //current flashcard is at the end
            addFlashcard()
        }
        else{
            return
        }
    })
    document.getElementById('flashcard').addEventListener('click',()=> { 
       if(clickFlashcard == false){
        document.getElementById('display').innerHTML = displayBack()
        clickFlashcard = true
       }
       else{
        document.getElementById('display').innerHTML = displayFront()
        clickFlashcard = false
       }
       
    })
    document.getElementById('next').addEventListener('click',()=> { //next flashcard
        let getCount = JSON.parse(localStorage.getItem('length'))
        curr = curr + 1
        if(curr == getCount){
            curr = curr - 1
        }
        else{
            document.getElementById('totalNum').innerHTML = displayTotalNumber()
            document.getElementById('display').innerHTML = displayFront()
        }
      
    })
    document.getElementById('previous').addEventListener('click',()=> {  //previous flashcard
        curr = curr - 1
        if(curr < 0){
            curr = curr + 1
        }
        else{
            document.getElementById('totalNum').innerHTML = displayTotalNumber()
            document.getElementById('display').innerHTML = displayFront()
        }
    })
    document.getElementById('deleteAllBtn').addEventListener('click', ()=>{ //clear and then force to refesh
        let getCount = JSON.parse(localStorage.getItem('length'))
        if(getCount == null){
            return
        }
        else{
            let confirm = window.confirm('Are you sure you want to delete all flashcards?')
            if(confirm == true){
                localStorage.clear()
                window.location.reload()
            }
            else{
                return
            }
        }
    })
    document.getElementById('deleteBtn').addEventListener('click', ()=> {
        if (curr > 1 || count == 1) { //go to previous flashcard only if curr is more than 1 OR count is 1 
            curr--;
        }
        if(count == 0) {
            return
        }
        deleteFlashcard()
    })
    /*
            * math.random returns a floating-point, pseudo-random number in the range [0, 1) that is, from 0 (inclusive) 
            * up to but not including 1 (exclusive), which you can then scale to your desired range.
            * Multiplying this by n gives a floating point number between 0 (inclusive) and n (exclusive).
            * math.floor is then used to convert this floating point number to an integer between 0 and n - 1 (inclusive).
            * 
            * randIndex chooses random index of the array
            * tempArr saves value at randIndex 
            * arr[i] and arr[randIndex] are switched
    */   
    document.getElementById('shuffBtn').addEventListener('click',()=> { 
        let getCount = JSON.parse(localStorage.getItem('length'))
        if(count != 0){
            let tempArr1
            let tempArr2
            let tempArr3

            for(i = 0; i < getCount; i++){ 
                let randIndex = i + (Math.floor(Math.random() * getCount - i))
                console.log(randIndex)
                tempArr1 = flashcardArr[randIndex]
                tempArr2 = frontValues[randIndex]
                tempArr3 = backValues[randIndex]

                flashcardArr[randIndex] = flashcardArr[i]
                flashcardArr[i] = tempArr1

                frontValues[randIndex] = frontValues[i]
                frontValues[i] = tempArr2

                backValues[randIndex] = backValues[i]
                backValues[i] = tempArr3
            } 
            window.location.reload()    //force to reload page 
            localStorage.setItem('FlashcardList', JSON.stringify(flashcardArr)) 
            localStorage.setItem('front-values', JSON.stringify(frontValues))
            localStorage.setItem('back-values', JSON.stringify(backValues))
            localStorage.setItem('length', JSON.stringify(getCount)) 

        }
        else {
            console.log('Flashcard array is empty')
        }

    })
})





