
// Your Code Here
async function main() {

//address that allows us to GET when using FETCH request
    let response = await fetch('http://127.0.0.1:3001/listBooks')

// let a variable to be saved and represent the parse response using response.json()
    let books = await response.json()
    
//When the book array is received use forEach to add book cards to the DOM
    books.forEach(renderBook)
}


function renderBook(book) {
    //retrieve a list of books from the server
    let root = document.querySelector('#root')

    //display a list of book titles to the admin
    let li = document.createElement('li')
    li.textContent = book.title

    // Place a text input next to each book title
        //each text input will be given a value to represent the quantity associated with the book
    let quantityInput = document.createElement('input')
    quantityInput.value = book.quantity

    //Place a submit button next to each text input
    let saveButton = document.createElement('button')
    saveButton.textContent = 'Update Quantity',
    saveButton.style.color = 'pink',
    saveButton.style.backgroundColor = 'black',

    //When the submit button is clicked, retrieve the quantity from the associate text input and save the updated quantity to the server
    saveButton.addEventListener('click', function() {
        fetch('http://127.0.0.1:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: quantityInput.value
            })
        })
    })

    li.append(quantityInput, saveButton)

    root.append(li)
}

main();