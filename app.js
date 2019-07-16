$(() => {
    const handleData = (data) => {
        console.log('fetched',data)

        const $title = $('<h1>').text(data.results[0].definition)
        $('.container').append($title) 
    
      }
    
    
      $('form').on('submit', (event) => {
        event.preventDefault() 
        const input = $('.word').val()
        console.log('input',input);
        const BASE_URL = `https://wordsapiv1.p.rapidapi.com`
    
        $.ajax({
            url: `${BASE_URL}/words/${input}`,
            headers: {
                'X-RapidAPI-Key': '41e7823406mshac74571fd99dc9fp1247b9jsnec420c41a75b'
            }
        })
        .then(handleData);
      })
})