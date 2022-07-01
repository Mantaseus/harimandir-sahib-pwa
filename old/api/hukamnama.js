import http from 'http';
import iconv from 'iconv-lite';

module.exports = (request, response) => {
  const { query: {day, month, year} } = request;

  const options = {
    hostname: 'old.sgpc.net',
    path: `/hukumnama/oldhukumnama.asp?print_flag=Y&nullstr_flag=&date1=${day}&month=${month}&year=${year}&kk=2`,
    method: 'GET',
  }
  console.log(options);

  http.request(options, res => res.pipe(iconv.decodeStream('windows-1252')).pipe(response, { end: true }))
    .on('error', console.error)
    .end();
};
