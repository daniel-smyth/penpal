# Penpal

Core Penpal intellectual property. Should only contain pure Typescript functions and classes (preferably classes). Code should only be related to generating and sharing content through AI models.

Classes should adhere to good design practices. Read the SOLID principals:

- **Single Responsibility Principle (SRP)**: Each class should have a single, well-defined responsibility. This means that a class should have only one reason to change, and all its methods and properties should be closely related to that responsibility.

- **Open-Closed Principle (OCP)**: Classes should be open for extension but closed for modification. This means that a class should be designed in such a way that new functionality can be added without modifying the existing code.

- **Liskov Substitution Principle (LSP)**: Subtypes should be substitutable for their base types. This means that any instance of a derived class should be able to replace an instance of the base class without affecting the correctness of the program.

- **Interface Segregation Principle (ISP)**: A class should not be forced to implement interfaces it does not use. This means that a class should only implement those interfaces that are relevant to its behavior.

- **Dependency Inversion Principle (DIP)**: High-level modules should not depend on low-level modules, but both should depend on abstractions. This means that a class should not depend on specific implementations of other classes, but rather on abstract interfaces or contracts.
