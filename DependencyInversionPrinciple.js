let Relationship = Object.freeze({
  parent: 0,
  child: 1,
  siblings: 2,
});

class Person {
  constructor(name) {
    this.name = name;
  }
}

// Low-level module, to store information:
class Relationships {
  constructor() {
    this.data = [];
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child,
    });
  }
}

let parent = new Person("Jhon");
let child1 = new Person("Chris");
let child2 = new Person("Matt");

let rels = new Relationships();
rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2);

// High-level module, gets the data out
class Research {
  constructor(relationships) {
    //find all children of Jhon
    let relations = relationships.data;
    for (let rel of relations.filter(
      (r) => r.from.name === "Jhon" && r.type === Relationship.parent
    )) {
      console.log(`Jhon has a child named ${rel.to.name}`);
    }
  }
}

let res = new Research(rels);

// Dependency Inversion Principle: High level modules should not depent directly on low-level modules
//                                  they should depend on abstractions, like Interfaces or Abstract classes

// In this example image that we don't want to store the data in an array, but instead on a binary tree, or hash table
// we would need to refactor all our classes, because now our high-level modules directly depends on low-level modules
// in JS we don't have Interfaces, but still we can implent some abstractions.

// mock an interface
class RelationShipBrowser {
  constructor() {
    // force to make it an abstract class, in Java we could also use and interface
    if (this.constructor.name === "RelationShipBrowser")
      throw new Error("RelationShipBrowser is abstract!");
  }

  findAllChildrenOf(name) {}
}

class RelationshipsSOLID extends RelationShipBrowser {
  constructor() {
    super();
    this.data = [];
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child,
    });
  }

  findAllChildrenOf(name) {
    return this.data
      .filter((r) => r.from.name === name && r.type === Relationship.parent)
      .map((r) => r.to);
  }
}
class ResearchSOLID {
  //broser is just and interface, RelationShipBrowser
  constructor(browser) {
    for (let p of browser.findAllChildrenOf("Jhon")) {
      console.log(`Jhon has a child called ${p.name}`);
    }
  }
}

console.log("======== SOLID VERSION ====");
let rels2 = new RelationshipsSOLID();
rels2.addParentAndChild(parent, child1);
rels2.addParentAndChild(parent, child2);
let resS = new ResearchSOLID(rels2);

// Note that we are not accessing directly to any array or data structure, we are just calling an API
