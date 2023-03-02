const request = require('supertest')
const app = require('./app')

describe('testing the app', () => {
    it('should read the wordlist properly', () => {
        const file = './wordlist.txt'
        const readFile = app.readWordlist(file)
        expect(readFile).not.toBeUndefined()
    })
    it('should connect to kateglo api', async () => {
        const response = await app.kategloAPI('buku')
        expect(response.status).toBe(200)
    })
})