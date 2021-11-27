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

// Open Closed Principle

// !Bad practice
class Product {
    constructor(name, color, size) {
        //
    }
}
class ProductFilter {
    filterByColor(products, color) {
        //
    }
    filterBySize(products, size) {
        //
    }
    filterBySizeAndColor(products, size, color) {
        //
    }
    // state space explosion
    // 3 criteria (+weight) = 7 methods

    // OCP = open for open for extension but closed for modification
}

// !Better Practice

class Product {
    constructor(name, color, size) {
        //
    }
}
class ColorSpecification {
    constructor(color) {
        //
    }
    isSatisfied(product) {
        //
    }
}
class SizeSpecification {
    constructor(size) {
        //
    }
    isSatisfied(product) {
        //
    }
}
class BetterSpecification {
    filter(items, spec) {
        //
    }
}
class AndSpecification {
    constructor(...spec) {
        //
    }
    isSatisfied(product) {
        //
    }
}
