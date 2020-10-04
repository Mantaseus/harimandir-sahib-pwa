import {parse} from 'node-html-parser';
import http from 'http';

function parseMukhvaak(html){
    const fontElements = html.querySelectorAll('font');
    const fontElementsText = []

    // FIrst section starts at index 1
    const sectionStartIndexes = [2];

    // Loops through the '<font>' elements and identify the separators. Also generate an array
    // of text from the font elements
    for (var i in fontElements){
        //const elementText = parse(fontElements[i].toString()).rawText.replace(/[\r\n\t]/g, '');;
        const elementText = fontElements[i].rawText.replace(/[\r\n\t]/g, '');
        fontElementsText.push(elementText);

        // Test if the element text has the separator element between mukhvaak and punjabi
        // translation
        if (/pMjwbI ivAwiKAw/g.test(elementText)){
            sectionStartIndexes.push(parseInt(i)+1);
            continue;
        }

        // Test if the element text has the separator element between punjabi translation and
        // english translation
        if (/English\s+Translation/g.test(elementText)){
            sectionStartIndexes.push(parseInt(i)+1);
            continue;
        }
    }

    // Get the required data
    const result = {
        mukhvaak: {
            titles: fontElementsText.slice(sectionStartIndexes[0], sectionStartIndexes[1]-4),
            body: fontElementsText[sectionStartIndexes[1]-4]
        },
        punjabiTranslation: {
            titles: fontElementsText.slice(sectionStartIndexes[1], sectionStartIndexes[2]-2),
            body: fontElementsText[sectionStartIndexes[2]-2],
            punjabiDate: fontElementsText[sectionStartIndexes[1]-2],
            page: fontElementsText[sectionStartIndexes[1]-1],
        },
        englishTranslation: {
            titles: fontElementsText.slice(sectionStartIndexes[2], fontElementsText.length-3),
            body: fontElementsText[fontElementsText.length-3],
            punjabiDate: fontElementsText[fontElementsText.length-2],
            page: fontElementsText[fontElementsText.length-1],
        }
    }

    return result;
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
                response.json(parseMukhvaak(parse(data)));
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
