// Solid pseudo code

// Bad Practice
class Journal {
    constructor() {
        this.entries = []
    }
    addEntry(text) {
        //
    }
    removeEntry(index) {
        //
    }
    save(filename) {
        //
    }
    loadFromUrl(url) {
        //
    }
}

// Better Practice
class Journal {
    constructor() {
        this.entries = []
    }
    addEntry(text) {
        //
    }
    removeEntry(index) {
        //
    }
}
class PersistenceManager {
    preprocessor() {
        //
    }
    saveToFile(journal, filename) {
        //
    }
}
