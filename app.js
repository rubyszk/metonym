$(() => {
    ///////////// HANDLE DATA ////////////////
    const handleData = (data) => {        
        const $synDiv = $('<div>')
        const dataResult = data.results

        $.each(dataResult, (index, eachResult) => {
            console.log('each:', eachResult, index)
            if (eachResult.synonyms && index < 10) {
                const $new = $('<a>').text(`${eachResult.synonyms}`)
                thing($new)
                $synDiv.append($new)
                
            } else {
                $('.container').append('')
            }
        })
        
        const input = $('<h1>').text($('.word').val())
        const $definition = $('<h2>').text(`${data.results[0].definition}`)
        const $partOfSpeech = $('<h4>').text(data.results[0].partOfSpeech)
        const $pronunciation = $('<h5>').text(`{${data.pronunciation.all}}`)

        $('.container').append($pronunciation, $partOfSpeech, $definition, $synDiv); 

    }

    /////////////// EVENT LISTENERS ////////////////

    $('form').on('submit', (event) => {
        event.preventDefault()
        $('.container').empty(); 
        const input = $('.word').val()
        console.log('in',input)
        const BASE_URL = `https://wordsapiv1.p.rapidapi.com`

        $.ajax({
            url: `${BASE_URL}/words/${input}`,
            headers: {
                'X-RapidAPI-Key': '41e7823406mshac74571fd99dc9fp1247b9jsnec420c41a75b'
            }
        })
        .then(handleData);
    })


    function thing(element) {
        $(element).on('click', (event) => {
            event.preventDefault()
            $('.container').empty();
            const clickedSyn = element[0].innerText;
            const BASE_URL = `https://wordsapiv1.p.rapidapi.com`
            $.ajax({
                url: `${BASE_URL}/words/${clickedSyn}`,
                headers: {
                    'X-RapidAPI-Key': '41e7823406mshac74571fd99dc9fp1247b9jsnec420c41a75b'
                }
            })
            .then(handleData);
        })
    }

})
