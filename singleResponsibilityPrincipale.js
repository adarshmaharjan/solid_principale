// **Single Responsibility Principle**
const fs = require("fs")
class Journal {
    constructor() {
        this.entries = {}
    }
    addEntry(text) {
        let c = ++Journal.count
        let entry = `${c}: ${text}`
        return c
    }
    removeEntry(index) {
        delete this.entries[index]
    }
    toString() {
        return Object.values(this.entries).join("\n")
    }
    //bad practice

    // save(filename) {
    //     fs.writeFileSync(filename, this.toString())
    // }
    // load(filename) {
    //     //
    // }
    // loadFromUrl(url) {
    //     //
    // }
}
Journal.count = 0

class PersistenceManager {
    preprocess(j) {
        //
    }
    saveToFile(journal, filename) {
        fs.writeFileSync(filename, journal.toString())
    }
}
