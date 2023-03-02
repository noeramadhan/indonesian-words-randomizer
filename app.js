const process = require('process')
const axios = require('axios')
const fs = require('fs')
const wordlist = './wordlist.txt'


const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

const readWordlist = (file) =>
    fs.readFileSync(file, 'utf-8', (err, res) => {
        if (err) throw err
        return res
    })

const kategloAPI = async (word) =>
    axios
        .get('http://kateglo.lostfocus.org/api.php?format=json&phrase=' + word)
        .then(res => res)
        .catch(err => err)

const randomize = async (max = 1) => {
    const data = readWordlist(wordlist).split('\n')
    const wordsCount = data.length

    for (let i = 0; i < max; i++) {
        let num = randomNumber(0, wordsCount)
        let currentWord = data[num]


        const response = await kategloAPI(currentWord)
        console.log(currentWord)

        const dataType = response.data instanceof Object

        if(!dataType) console.log('definisi tidak ditemukan')
        else {
            let kateglo = response.data.kateglo
            kateglo.definition.forEach((item) => {

                let lex_class_ref = item.lex_class_ref ? item.lex_class_ref + ' ' : ''
                let discipline = item.discipline ? item.discipline + ', ' : ''
                let see = item.see ? `\n  --> ${item.see}` : ''

                console.log(`- ${lex_class_ref}${discipline}${item.def_text}${see}`)
            })
        }
        console.log('')
    }

}

randomize(process.argv[2])

module.exports = {
    readWordlist,
    kategloAPI
}