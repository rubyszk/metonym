$(() => {
    ///////////// HANDLE DATA ////////////////
    const handleData = (data) => {
        const $synDiv = $('<div>')
        const dataResult = data.results

        $.each(dataResult, (index, eachResult) => {
            if (eachResult.synonyms && index < 10) {
                for (let i = 0; i < eachResult.synonyms.length; i++) {
                    console.log('got:',eachResult.synonyms, index);
                    const $new = $('<a>').text(`${eachResult.synonyms[i]}`)
                        if (eachResult.synonyms[i].indexOf(' ') >= 0){
                            $new.splice([1])
                        } else { 
                            handleSynClick($new)
                            $synDiv.append($new)
                            console.log('new',$new.val()); 
                        }
                }
            } else {
                $('.container').append('')
            }
        })
        
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
        const BASE_URL = `https://wordsapiv1.p.rapidapi.com`

        $.ajax({
            url: `${BASE_URL}/words/${input}`,
            headers: {
                'X-RapidAPI-Key': '41e7823406mshac74571fd99dc9fp1247b9jsnec420c41a75b'
            }
        })
        .then(handleData);
    })

    const handleSynClick = (element) => {
        $(element).on('click', (event) => {
            event.preventDefault()
            $('.container').empty();
            console.log('thing', element[0].innerText)
            const clickedSyn = element[0].innerText;
            $('.word').val(clickedSyn)
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
