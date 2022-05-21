//enum
let Color = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
});

let Size = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

class ProductFilter {
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }

  // Now if we want to implement filter by size we can do >>> Copy and Paste <<
  // Isn't this approach repetitive ? we are extending more and more the class, it seems that we are missing something !
  // Objects should be open for extension but closed for modification
  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }

  // Now we want to filter by both size and color
  // Again, int seems that we are doing a repetitive task
  filterBySize(products, size, color) {
    return products.filter((p) => p.size === size && p.color === color);
  }

  // State space explosion: this approach doesn't work for infinity
  // Image that now we want to implent:
  //    filter by Size OR Color || filter by Size AND Color AND name || filter by Size OR Color OR Name
  // all of this operations are filters and in the bad approch we would end implementing one method for each filter type

  // How to solve it ?  ==> Use the Specification Pattern !
}

let apple = new Product("Apple", Color.green, Size.small);
let tree = new Product("Tree", Color.green, Size.large);
let house = new Product("HOuse", Color.blue, Size.large);

let products = [apple, tree, house];
let pf = new ProductFilter();
console.log(`Green products (old approach):`);
for (let p of pf.filterByColor(products, Color.green))
  console.log(` * ${p.name} is green`);

// Specification Pattern
// specifications
class Specification {
  constructor() {
    // force to make it an abstract class, in Java we could also use and interface
    if (this.constructor.name === "Specification")
      throw new Error("Specification is abstract!");
  }
  isSatisfied(item) {}
}
class ColorSpecification extends Specification {
  constructor(color) {
    super();
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification extends Specification {
  constructor(size) {
    super();
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

// a combinator is a specification that combines other specifications
class AndSpecification extends Specification {
  constructor(...specs) {
    super();
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

// every specification is decouple from each filter, and this is going to give us a big power:
class BetterFilter {
  filter(items, spec) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

let betterFilter = new BetterFilter();
console.log(`Green products (new approach):`);

for (let p of betterFilter.filter(
  products,
  new ColorSpecification(Color.green)
)) {
  console.log(` * ${p.name} is green`);
}

console.log(`Large and Green products (new approach):`);
let spec = new AndSpecification(
  new SizeSpecification(Size.large),
  new ColorSpecification(Color.green)
);
for (let p of betterFilter.filter(products, spec)) {
  console.log(` * ${p.name} is large AND green`);
}
