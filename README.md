# Solid Design Principal

**S.O.L.I.D** stands for  
- **S** stands for Single responsibility principle
- **O** stands for Open closed principle
- **L** stands for Liskov substitution principle
- **I** stands for Interface segregation principle
- **D** stands for Dependency Inversion principle
---
## Single Responsibility Principle


**Single responsibility principle** is a simple principle, and it tells us that a class should have single primary responsibility and as a consequence it should only have one reason to change, That reason being somehow related to its responsibility in other words it's a bat idea to add more than one responsibility to a class.

<!--bad code example img-->
```
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
```

In the above code we made a journal that is going to keep record. While the bat practice signifies that you add a lot of code and give a multiple responsibility for singel class for journal management as well as file handeling . 

<!--better code example img-->
```
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
```
In the above example it can be seen that it is easy to understand and implement the code by grouping the functionalities by the class instead of sticking all the functionality into a single class

In actual fact there is an anti-pattern that shows up during a coding practice which is rather bad as opposed to a good. There is also a pattern called a god object pattern which is huge massive class that has lots of responsibility and spaghetti code which is very difficult to figure out

And so the single responsibility is the exact opposite that basically lets us have just one responsibility and if we need additional responsibility then we just make other class as they don't cost us anything. 

Another term we used is called separation of concerns. So separation of concern is what we do when we refactor for example so let's suppose you find a really complicated algorithm and what we are trying to do is split it into a diffrent parts which are somehow related. 

Seperation of the concern is also widely used one of most popular JS libary reactjs. So in React, we solved this issue by creating container components that contain all the logic, which would then pass down the data via props to the presentational component. And with the introduction of React hooks, there's a new approach to this: using custom hooks. 

The code is available to preview on *"singleResponsibilityPrincipale.js"*

---

## Open-Closed Principle


**Objects-Closed Principle(OCP)** states that objects or entities should be open for extension but closed for the modification which means you never jump into existing class and start to modify it unless you absolutely have to.

```
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
```
In the above code extending the functionality is not a good thing because if the product filter class is something that other people might have just copied your class, and then you modified it, but it doesn't they just took a copy having something that has already been tested and put into production modifying it explicitly might not be a good idea

```
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

```
But generally it's not such a great practice because it affects scalability it affects maintenance ability of our code, So a better approach is to basically use inheritance or some sort of way of extending functionality

Now typically an object oriented programming language these specification classes would have some sort of base class you would have sort of maybe you have some kind of abstract class called specification but in javascript there is no abstract class, but we could just force it into constructor by making sure that if somebody calls the constructor of the specification then they get an error. 

Generally the idea is that you use inheritance of some kind or seperation of concerns effectively to separate each criteria by which you want to filter into separate specification 

The implementation can be previewed in *"openClosed.js"*

---

## Liskov Substitution Principle

The third principle of solid design is Liskov Substitution principle, and it is named after Barbra liskov. The liskov substitution principle states that any subclass object should be substituted for the superclass object from which it is derived.

```
// BAD

class Rectangle {
    constructor() {
        this.width = 0
        this.height = 0
    }

    setColor(color) {
        // ...
    }

    render(area) {
        // ...
    }

    setWidth(width) {
        this.width = width
    }

    setHeight(height) {
        this.height = height
    }

    getArea() {
        return this.width * this.height
    }
}

class Square extends Rectangle {
    setWidth(width) {
        this.width = width
        this.height = width
    }

    setHeight(height) {
        this.width = height
        this.height = height
    }
}

function renderLargeRectangles(rectangles) {
    //
}
```
According to the code above rectangle class should substitute for the rectangle class but in the code above it only works for rectangle not for square

```
lass Shape {
    setColor(color) {
        // ...
    }

    render(area) {
        // ...
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super()
        this.width = width
        this.height = height
    }

    getArea() {
        return this.width * this.height
    }
}

class Square extends Shape {
    constructor(length) {
        super()
        this.length = length
    }

    getArea() {
        return this.length * this.length
    }
}

function renderLargeShapes(shapes) {
    //
}

```

So we are going to create shape class whit will be extended both to rectangle and the square. The rectangle class has the constructor both with and height, and we can get the area by multiplying width and height , while for the square class it has constructor with length only, and we render the area through the renderLargeShapes function 

The code implementation can be previewed in *"lsp.js"*

---

## Interface Segregation Principle

Interface segregation principle states 'A client should never be forced to implement an interface that it doesn’t use, or clients shouldn’t be forced to depend on methods they do not use'.

#### Simple Approach

Suppose if you enter a restaurant, and you are pure vegetarian. The waiter in that restaurant gave you the menu card which includes vegetarian items, non-vegetarian items, drinks, and sweets. In this case, as a customer, you should have a menu card which includes only vegetarian items, not everything which you don’t eat in your food.

Here the menu should be different for different types of customers. The common or general menu card for everyone can be divided into multiple cards instead of just one. Using this principle helps in reducing the side effects and frequency of required changes.

In javascript we don't have interface by default. But we all would have faced situations where we want to do so many things on the constructor of a class.

```
class DOMTraverser {
    constructor(settings) {
        this.settings = settings
        this.setup()
    }

    setup() {
        this.rootNode = this.settings.rootNode
        this.animationModule.setup()
    }

    traverse() {
        // ...
    }
}

const $ = new DOMTraverser({
    rootNode: document.getElementsByTagName("body"),
    animationModule() {}, // Most of the time, we won't need to animate when traversing.
    // ...
})
```
We create dom traverser class awe pass a settings it gets a root node and we pass a animation module always but we may not need to animate 

```
// GOOD

class DOMTraverser {
    constructor(settings) {
        this.settings = settings
        this.options = settings.options
        this.setup()
    }

    setup() {
        this.rootNode = this.settings.rootNode
        this.setupOptions()
    }

    setupOptions() {
        if (this.options.animationModule) {
            // ...
        }
    }

    traverse() {
        // ...
    }
}

const $ = new DOMTraverser({
    rootNode: document.getElementsByTagName("body"),
    options: {
        animationModule() {},
    },
})

```
So in the code above we make the passing of the animation module optional by making animation module objects optional so if passed in the animation module the it is implemented if not its is not implemented

The implementation of this principle can be previewed in *"isp.js"*

## Dependency inversion principle

Dependency inversion principle states that the high level module must not depend on the low level module, but they should depend on abstractionsIt states that the high level module must not depend on the low level module, but they should depend on abstractions

The dependency inversion principle basically defines a relationship that you should have between low level modules and high level modules.

#### Simple approach
You can consider the real-life example of a TV remote battery. Your remote needs a battery but it’s not dependent on the battery brand. You can use any XYZ brand that you want and it will work. So we can say that the TV remote is loosely coupled with the brand name. Dependency Inversion makes your code more reusable

```
// BAD

class InventoryRequester {
    constructor() {
        this.REQ_METHODS = ["HTTP"]
    }

    requestItem(item) {
        // ...
    }
}

class InventoryTracker {
    constructor(items) {
        this.items = items

        // BAD: 
        // We should just have requestItems depend on a request method: `request`
        this.requester = new InventoryRequester()
    }

    requestItems() {
        this.items.forEach((item) => {
            this.requester.requestItem(item)
        })
    }
}

const inventoryTracker = new InventoryTracker(["apples", "bananas"])
inventoryTracker.requestItems()
```
In the above code we create a inventory tracker class which is always going to use a inventory requester class is always going to use http method.We have created a dependency on a specific request implementation.
```
// GOOD

class InventoryTracker {
    constructor(items, requester) {
        this.items = items
        this.requester = requester
    }

    requestItems() {
        this.items.forEach((item) => {
            this.requester.requestItem(item)
        })
    }
}

class InventoryRequesterV1 {
    constructor() {
        this.REQ_METHODS = ["HTTP"]
    }

    requestItem(item) {
        // ...
    }
}

class InventoryRequesterV2 {
    constructor() {
        this.REQ_METHODS = ["WS"]
    }

    requestItem(item) {
        // ...
    }
}


const inventoryTracker = new InventoryTracker(
    ["apples", "bananas"],
    new InventoryRequesterV2()
)
inventoryTracker.requestItems()

```
By constructing our dependencies externally and injecting them, we can easily
substitute our request module for a fancy new one that uses WebSockets.