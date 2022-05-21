// JavaScript doesn't have interfaces

class Document {}

class Machine {
  constructor() {
    // force to make it an abstract class, in Java we could also use and interface
    if (this.constructor.name === "Machine")
      throw new Error("Machine is abstract!");
  }

  print(doc) {}
  fax(doc) {}
  scan(doc) {}
}

class MultiFunctionPrinter extends Machine {
  print(doc) {
    //etc
  }
  fax(doc) {
    //etc
  }
  scan(doc) {
    //etc
  }
}

class OldFashionedPrinter extends Machine {
  print(doc) {
    // an Old Fashioned Printer can print, it is okay
  }
  fax(doc) {
    // Problem: and old fashioned printer cannot fax, so what can we do?
    // -> do nothing. Bad idea, it violetes the principle of least surprise
    //                we don't want users to be surprise by the behaviour, it should be predictable
  }
  scan(doc) {
    // Problem: and old fashioned printer cannot scan, so what can we do?
    // -> throw and error. Also bad idea, not expected behaviour, violates Liskov Substitution Principle
    throw new Error("Not implemented !");
  }
}

let oldPrinter = new OldFashionedPrinter();
oldPrinter.scan();

// SOLUTION : Use the Interface Segregation Principle
//We should segreagate or split interfaces in many parts, so we don't get forced to implement most of what we need.

//In this example: Split Machine interface in 2 other simplified interfaces -> Printer and Scanner.
class Printer {
  constructor() {
    // force to make it an abstract class, in Java we could also use and interface
    if (this.constructor.name === "Printer")
      throw new Error("Printer is abstract!");
  }
  print(doc) {}
}

class Scanner {
  constructor() {
    // force to make it an abstract class, in Java we could also use and interface
    if (this.constructor.name === "Scanner")
      throw new Error("Scanner is abstract!");
  }
  scan(doc) {}
}
