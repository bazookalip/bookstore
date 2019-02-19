$(document).ready(onReady);

function onReady() {
    console.log('ready!');
    $('#addBook').on('click', addBook);
    $('#addMagazine').on('click', addMagazine);
    getBooks();
    getMagazines();
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

function addMagazine() {
    console.log('yay!')
    let title = $('#title').val();
    let issue_number = $('#issue').val();
    let pages = $('#pages').val();
    console.log(title, issue_number, pages);

    $.ajax({
        method: 'POST',
        url: '/magazines',
        data: {
            title: title,
            issue_number: issue_number,
            pages: pages
        }
    }).then(function () {
        getMagazines();
        clearMagazine();
    }); 
}


function clear(){
    $('#titleInput').val('');
    $('#authorInput').val('');
    $('#publishedInput').val('');
}

function clearMagazine() {
    $('#title').val('');
    $('#issue').val('');
    $('#pages').val('');
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
                <td>
           ${new Date(books.published).getMonth() + 1} /
           ${new Date(books.published).getDate()} /
           ${new Date(books.published).getFullYear()}
           </td><br><br>
             
        `)
        });
        clear();
    })
}

function getMagazines() {
    $.ajax({
        method: 'GET',
        url: '/magazines'
    }).then(function (response) {
        console.log(response);
        $('#outputMagazine').empty();
        response.forEach((magazines) => {
            $('#outputMagazine').append(`
                ${magazines.title} <br>
                ${magazines.issue_number} <br>
                ${magazines.pages} <br><br>
             
        `)
        });
        clearMagazine();
    })
}

