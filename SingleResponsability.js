const fs = require("fs");

class Journal {
  constructor() {
    this.entries = {};
  }

  addEntry(text) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join("\n");
  }

  // We want to save the journey, it might be tempty to put that functionlity inside the Journey class
  // this is a bad idea because we are adding another responsability to our class: 'save or load from different sources'
  // each save or load implementation should be independet of the Journey class.
  // Let's create a new PersistenceManager to split responsabilities
  save(filename) {
    fs.writeFileSync(filename, this.toString());
  }

  load(fielname) {
    //
  }

  loadFromUrl(url) {
    //
  }
}

class PersistenceManager {
  preprocess(journal) {
    //
  }

  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString());
  }
}

Journal.count = 0;

let j = new Journal();
j.addEntry("I cried today");
j.addEntry("I ate a bug");
console.log(j.toString());

let p = new PersistenceManager();
let filename = "./outputs/journal.txt";
p.saveToFile(j, filename);

// Avoid 'God Objects' antipattern: big class with lots of responsabilities. Make other class to split responsabilities
// Separation of concerns: when refactoring separate or split a class or method in different specific, well-defined components.
