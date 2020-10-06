import {parse} from 'node-html-parser';
import http from 'http';
import {StringDecoder} from 'string_decoder';

function parseMukhvaak(html){
    /*
    tableElements is going to have the following order and has the "metadata" about the hukamnama
    [
        // This is always there
        "HUKAMNAMA\nFROM SRI DARBAR SAHIB,\n\n\nSri Amritsar.",

        // 1 or more titles for the main hukamna
        "iqlýg mhlw 4 ]",

        // Date of the hukamna in punjabi
        "somvwr, 20 A`sU (sMmq 552 nwnkSwhI)",

        // Page number of the hukamnama in punjabi. This serves as the indicator of where the main
        // hukamnama section and punjabi translation sections are separated
        "(AMg: 725)", 

        // 1 or more titles for the punjabi translation section. Always same as the titles for the
        // main hukamnam
        "iqlýg mhlw 4 ]",

        // This is always there. Marks the separation between the main hukamnam and the punjabi
        // translation
        "English\nTranslation :",

        // English translation of the one or more titles. The number of titles here should be the
        // same as the number of titles in the other sections
        "TILANG, FOURTH MEHL:",

        // English readable nanakshahi date of the hukamnam
        "Monday, 20th Assu (Samvat 552 Nanakshahi)",

        // English readable page number of the hukamnama
        "(Page: 725)"
    ]
    */
    const tableElements = html.querySelectorAll('td font')
        .map(el => el.rawText.trim());

    /*
        paraElement should have 3 elements.
        - First one for the body of the main hukamnama
        - Second one for the body of the punjabi translation
        - Third one for the body of the english translation
    */
    const paraElements = html.querySelectorAll('p font')
        .map(el => el.rawText.trim())

    const mukhvaakIndex = 1;
    const punjabiTranslationIndex = tableElements.findIndex(el => /^\(?AMg/ig.test(el));
    const englishTranslationIndex = tableElements.findIndex(el => /English\s+Translation/ig.test(el));

    return {
        mukhvaak: {
            titles: tableElements.slice(mukhvaakIndex, punjabiTranslationIndex - 1),
            body: paraElements[0],
        },
        punjabiTranslation: {
            titles: tableElements.slice(punjabiTranslationIndex + 1, englishTranslationIndex),
            body: paraElements[1],
        },
        englishTranslation: {
            titles: tableElements.slice(englishTranslationIndex + 1, -2),
            body: paraElements[2],
        },
        date: {
            punjabi: tableElements[punjabiTranslationIndex - 1],
            english: tableElements[tableElements.length - 2],
        },
        pageNumber: Number(tableElements[tableElements.length - 1].match(/\d+/)),
    };
}

module.exports = (request, response) => {
    const {query: {day, month, year}} = request;

    const options = {
        hostname: 'old.sgpc.net',
        path: `/hukumnama/oldhukumnama.asp?print_flag=Y&nullstr_flag=&date1=${day}&month=${month}&year=${year}&kk=2`,
        method: 'GET',
    }
    console.log(options)

    const req = http.request(options, res => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk
        })
        res.on('end', () => {
            if(data) {
                const decoder = new StringDecoder('latin1');
                const decodedHtml = decoder.end(Buffer.from(data, 'latin1'));
                response.json(parseMukhvaak(parse(decodedHtml)));
            } else {
                response.json({
                    error: true,
                    reason: 'No response from hukamnama source'
                })
            }
        })
    })

    req.on('error', console.error);
    req.end();
}
