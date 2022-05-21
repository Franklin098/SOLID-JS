
# SOLID

## Single Responsability

> A class should have a single primary responsability, should have just 1 reason to change.

It is a bad idea to add more than 1 responsability to a class.

'Antipattern': a pattern that shows something that is bad, and that we should avoid to do.

Avoid 'God Objects' antipattern: big class with lots of responsabilities.

> Separation of concerns: when refactoring separate or split a class or method in different specific, well-defined components.

* Check SingleResponsability.js 



## Open-Closed Principle

> Objects should be open for extension but closed for modification

Modification: adding more and more methods, modifying an existing class. We shouldn't modify a class 
              that was tested and put in production

Extension: inheritance, a class inherits from another class and implements its own functionality

State space explosion: this approach doesn't work for infinity

Imagine that now we want to implent:
        filter by Size OR Color || filter by Size AND Color AND name || filter by Size OR Color OR Name
all of this operations are filters and in the bad approch we would end implementing one method for each filter type

How to solve it ?  ==> Use the Specification Pattern !

* Check OpenClosedPrinciple.js 

# Liskov Substitution Principle

> Each derived type should have the ability to be replaced by its based type

For example:  interface Animal,  class Cat implements Animal, class Dog implemnts Animal

If we have any variable of type Cat or Dog, those variable types must handle to be replaced by Animal, eg:

Animal x = new Cat();
Animal y = new Dog();

# Interface Segregation Principle

Someties we want to implment a given interface but just for the sake of some methods defined by the interface.
We can end up wiwth fat interfaces, containing more methods taht the actual class needs. Violates Single Responsability principle.
> We should segregate or split interfaces in many parts, so we don't get forced to implement methods that we don't need.

> Software modules (classes and methods) should not be forced to depend upon interfaces that they do not use.

YAGNI: You Ain't Going to Need It. Why implement something that we don't need?

# Dependency Inversion Principle

When implementing and application usuallly we start with the low level software components. Then we implement the high level modules that rely on these low level modules.

The problem is that if we decide to change the low modules, then we'll also need to update and change the high level modules.
We will end up changing the hole application because the low level modules change.

Solution:
> High level modules should not depend on low level modules. Both should depend on abstractions.

We want the low-level and high-level modules to be loosly couple, so thay can be tested and mantain independently, we can achive this by creating abstractions and some middle-bridge to communicate.

> Abstractions should not depend on details. Details (concrete implementations) should depend on abstractions.

For example, if our application relais on a Database, we should not care wheter it is a Oracle, Postgress or MySQL database, we should have a general 'DataBase' abstractions and then implement de details in a concrete class.

Instead of direct communication between high-level modules and low-level modules we should add an abstraction layer to communicate each other.

The application doesn't know nothing about the details or implementation, just know about the abstraction.