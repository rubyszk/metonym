$(() => {
    ///////////// HANDLE DATA ////////////////
    const handleData = (data) => {
        const $synDiv = $('<div>')
        const dataResult = data.results

        $.each(dataResult, (index, eachResult) => {
            if (eachResult.synonyms && index < 10) {
                for (let i = 0; i < eachResult.synonyms.length; i++) {
                    const $new = $('<a>').text(`${eachResult.synonyms[i]}`)
                        if (eachResult.synonyms[i].indexOf(' ') >= 0){
                            $new.splice([1])
                        } else { 
                            handleSynClick($new)
                            $synDiv.append($new)
                        }
                }
            } else {
                $('.container').append('')
            }
        })
        
        const $definition = $('<h2>').text(`${data.results[0].definition}`)
        const $partOfSpeech = $('<h4>').text(`${data.results[0].partOfSpeech}`)
        const $pronunciation = $('<h5>').text(`{${data.pronunciation.all}}`)
        const $dot = $('<h4>').text('•')

        $('.container').append($pronunciation, $dot, $partOfSpeech, $definition, $synDiv); 
    }

    /////////////// EVENT LISTENERS ////////////////

    let counter = 0;

    $('form').on('submit', (event) => {
        event.preventDefault()
        $('.container').empty(); 
        const input = $('.word').val()
        $('.heart').css('display', 'block')
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
            counter = 0;
            $('.heart').css('color', 'black');
            const clickedSyn = element[0].innerText;
            localStorage.setItem('word', clickedSyn);
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

    const saveWord = () => {
        const input = $('.word').val();
        localStorage.setItem('word', input);
        console.log(localStorage);
    }

    const deleteWord = () => {
        const input = $('.word').val();
        localStorage.removeItem('word', input);
        console.log(localStorage);
    }

        // let counter = 0;

        $('.heart').on('click', (event) => {
            event.preventDefault();
            counter++
                 if (counter % 2 !== 0) {
                    $('.heart').css('color', '#ff7d93');
                    saveWord();
                } else {
                    $('.heart').css('color', 'black');
                    deleteWord();
                }
        })

})
