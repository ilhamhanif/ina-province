const request = require("request-promise")
const cheerio = require("cheerio")
const fs = require("fs")

var dict = '{"Indonesia Province":[]}'
var obj = JSON.parse(dict)
let data = JSON.stringify(obj, null, 2)
fs.writeFileSync("indonesia-province.json", data)

async function main() {
    const result = await request.get("https://en.wikipedia.org/wiki/Provinces_of_Indonesia")
    const $ = cheerio.load(result)
    const table = $("#mw-content-text > div.mw-content-ltr.mw-parser-output > table.wikitable.sortable.sticky-header.col2left.col4left.col5center.col9left")
    table.find("tbody > tr").each((_, row) => {
        var province_eng = $($(row).find("td")[1]).text()
        var province_ind = $($(row).find("td")[2]).text()
        var iso = $($(row).find("td")[3]).text()
        var capital = $($(row).find("td")[4]).text()
        var population = $($(row).find("td")[5]).text()
        var area = $($(row).find("td")[6]).text()
        var pop_per_area = $($(row).find("td")[7]).text()
        var geographical = $($(row).find("td")[8]).text()
        var citiesandregionNumber = $($(row).find("td")[9]).text()
        var citiesNumber = $($(row).find("td")[10]).text()
        var regionNumber = $($(row).find("td")[11]).text()
        var push = {
            "Nama Provinsi (eng)": province_eng,
            "Nama Provinsi (ina)": province_ind,
            "Kode ISO": iso,
            "Ibu Kota": capital,
            "Populasi Penduduk": population,
            "Luas Area": area,
            "Populasi per km2": pop_per_area,
            "Unit Geografis": geographical,
            "Jumlah Kota dan Kabupaten": citiesandregionNumber,
            "Jumlah Kota": citiesNumber,
            "Jumlah Kabupaten": regionNumber,
        }
        obj["Indonesia Province"].push(push)
        let data = JSON.stringify(obj, null, 2)
        fs.writeFileSync("indonesia-province.json", data)
    })
}

main()
