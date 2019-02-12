$(document).ready(onReady);

function onReady() {
    console.log('ready!');
    $('#addBook').on('click', addBook);
    getBooks();
}

function addBook(){
    console.log('yay!')
    let title = $('#titleInput').val();
    let author = $('#authorInput').val();
    let published = $('#publishedInput').val();
    console.log(title, author, published);
    
        $.ajax({
            method: 'POST',
            url: '/books',
            data: {
                title: title,
                author: author,
                published: published
            }
        }).then(function () {
            getBooks();
        }); clear();
}



function clear(){
    $('#titleInput').val('');
    $('#authorInput').val('');
    $('#publishedInput').val('');

}


function getBooks(){
    $.ajax({
        method: 'GET',
        url: '/books'
    }).then(function (response) {
        console.log(response);
        $('#outputUl').empty();
        response.forEach((books) => {
            $('#outputUl').append(`
                ${books.title} <br>
                ${books.author} <br>
                ${books.published} <br><br>
             
        `)
        });
        clear();
    })
}