class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  toString() {
    return `${this.width} x ${this.height}`;
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }
}

let rc = new Rectangle(2, 3);
console.log(rc.toString(5));

let square = new Square(5);
console.log(square.toString());
// Problem: I can manually change one of the fields
square.width = 10;
console.log(square.toString());

console.log("------------------------------------");
// It might be tempty to solve this by adding some complicated validation logic:

class Rectangle2 {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }

  set width(value) {
    this._width = value;
  }
  set height(value) {
    this._height = value;
  }

  get area() {
    return this._width * this._height;
  }

  toString() {
    return `${this._width}×${this._height}`;
  }
}

class Square2 extends Rectangle2 {
  constructor(size) {
    super(size, size);
  }

  set width(value) {
    this._width = this._height = value;
  }

  set height(value) {
    this._width = this._height = value;
  }
}

let useIt = function (rc) {
  let width = rc._width;
  rc.height = 10;
  console.log(`Expected area of ${10 * width}, ` + `got ${rc.area}`);
  // conclusion: works for rectangle but not for square, but square is a subtype of rectangle,
  // we are broking Liskov Substitution principle
};

let rctest = new Rectangle2(2, 3);
useIt(rctest);

let sq = new Square2(5);
useIt(sq);

// we expect 50 but got 100, there is an error
// We are breaking Liskov Substitution Principle because if in our code we replace a
// derived class 'Square2' for its based class 'Rectangle2' it is not working as expected and it has a bad behaviour
