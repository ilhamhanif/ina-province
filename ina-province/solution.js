const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

var dict = '{"Indonesia Province":[]}';
var obj = JSON.parse(dict);
let data = JSON.stringify(obj, null, 2);
fs.writeFileSync('indonesia-province.json', data);

async function main() {
    const result = await request.get("https://en.wikipedia.org/wiki/Provinces_of_Indonesia");
    const $ = cheerio.load(result);
    $("#mw-content-text > div.mw-parser-output > table:nth-child(16) > tbody > tr").each((index, element) => {
        var province_eng = $($(element).find('td')[1]).text();
        var province_ind = $($(element).find('td')[2]).text();
        var iso = $($(element).find('td')[3]).text();
        var capital = $($(element).find('td')[4]).text();
        var population = $($(element).find('td')[5]).text();
        var area = $($(element).find('td')[6]).text();
        var pop_per_area = $($(element).find('td')[7]).text();
        var geographical = $($(element).find('td')[8]).text();
        var citiesandregionNumber = $($(element).find('td')[9]).text();
        var citiesNumber = $($(element).find('td')[10]).text();
        var regionNumber = $($(element).find('td')[11]).text();
        var push = {
            "Nama Provinsi (eng)": province_eng, 
            "Nama Provinsi (ina)": province_ind, 
            "Kode ISO": iso,
            "Ibu Kota": capital,
            "Populasi": population,
            "Luas Area": area,
            "Populasi per km2": pop_per_area,
            "Unit Geografis": geographical,
            "Jumlah Kota dan Kabupaten": citiesandregionNumber,
            "Jumlah Kota": citiesNumber,
            "Jumlah Kabupaten": regionNumber,
        };
        obj["Indonesia Province"].push(push);
        let data = JSON.stringify(obj, null, 2);
        fs.writeFileSync('indonesia-province.json', data);
    });
}

main();

// request(link).then(function (html) {
//     var $ = cheerio.load(html);

//     // Get imageurl
//     var img = $('#wrapperindex #contentpromolain2 .keteranganinside img')
//     var image = $(img).attr('src');

//     // Get title and other information
//     const other = [];
//     other.push('https://www.bankmega.com'+image);
//     other.push(cheerio('#wrapperindex #contentpromolain2 .titleinside h3', html).text());
//     other.push(cheerio('#wrapperindex #contentpromolain2 .area', html).text());
//     var iterator = other.values();
//     var nama = iterator.next().value;
//     var capital = iterator.next().value;
//     console.log(nama)
//     console.log(capital)

//     // Write title, imageurl, and other informations to JSON file created before.
//     // fs.readFile('solusi.json', 'utf8', function readFileCallback(err, data) {
//     //     if (err){
//     //         console.log(err);
//     //     } 
//     //     else {
//     //         var push = {"title": judul, "imageurl": alamat, "area": area}
            
//     //         if (m === 0) {
//     //             obj["Travel"].push(push);
//     //         }
//     //         else if (m === 4) {
//     //             obj["Daily Needs"].push(push);
//     //         }
//     //         else if (m === 2) {
//     //             obj["Food & Beverages"].push(push);
//     //         }
//     //         else if (m === 1) {
//     //             obj["Lifestyle"].push(push);
//     //         }
//     //         else if (m === 3) {
//     //             obj["Gadget & Entertainment"].push(push);
//     //         }
//     //         else {
//     //             obj["Others"].push(push);
//     //         }

//     //         let data = JSON.stringify(obj, null, 2);
//     //         fs.writeFileSync('solution.json', data);
//     //     }
//     // })
// })

// // To handle error
// .catch(function(err){
//     console.log(err);
// });