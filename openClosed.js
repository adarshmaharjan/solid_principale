// Open/Closed Principle

// Bad Practice
let Color = Object.freeze({
    red: "red",
    green: "green",
    blue: "blue",
})
let Size = Object.freeze({
    small: "small",
    medium: "medium",
    large: "large",
    huge: "huge",
})

class Product {
    constructor(name, color, size) {
        this.name = name
        this.color = color
        this.size = size
    }
}
class ProductFilter {
    filterByColor(products, color) {
        return products.filter((product) => product.color === color)
    }
    filterBySize(products, size) {
        return products.filter((product) => product.size === size)
    }
    filterBySizeAndColor(products, color, size) {
        return products.filter(
            (product) => product.color === color && product.size === size
        )
    }
    // state space explosion
    // 3 criteria (+weight) = 7 methods

    // OCP = open for open for extension but closed for modification
}

let apple = new Product("Apple", Color.green, Size.small)
let tree = new Product("Tree", Color.green, Size.large)
let house = new Product("House", Color.blue, Size.huge)

let products = [apple, tree, house]

// let pf = new ProductFilter()
// console.log(`Green products (old):`)
// for(let p of pf.filterByColor(products,Color.green)){
// console.log(`${p.name} is green`)
// }

// Before

// After

// general interface for a specification

class ColorSpecification {
    constructor(color) {
        this.color = color
    }
    isSatisfied(item) {
        return item.color === this.color
    }
}
class SizeSpecification {
    constructor(size) {
        this.size = size
    }
    isSatisfied(item) {
        return item.size === this.size
    }
}
class BetterFilter {
    filter(items, spec) {
        return items.filter((x) => spec.isSatisfied(x))
    }
}
// specification combinator

class AndSpecification {
    constructor(...specs) {
        this.specs = specs
    }
    isSatisfied(item) {
        return this.specs.every((spec) => spec.isSatisfied(item))
    }
}
let bf = new BetterFilter()
console.log(`Green products (new)`)
for (let p of bf.filter(
    products,
    bf.filter(products, new ColorSpecification(Color.green))
)) {
    console.log(`${p.name} is green`)
}
console.log(`Large Products`)
for (let p of bf.filter(products, new SizeSpecification(Size.large))) {
    console.log(`${p.name} is large`)
}

console.log("Large and green Products")
let spec = new AndSpecification(
    new ColorSpecification(Color.green),
    new SizeSpecification(Size.large)
)

for (let p of bf.filter(products, spec)) {
    console.log(`${p.name} is large and green`)
}
