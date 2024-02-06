# @secma/base

This library contains the base classes and interfaces for the Secma project.

Following building blocks are provided here:

- `@vebgen/access-api`-based `API` classes;
- `SecMaUser` interface that describes the properties of the current user;
- all models for data exchange with the server;
- a set of validations for common fields like `username`, `email`,
  `password`, etc.

## Development

### Building

Run `nx build base` to build the library.

### Running unit tests

Run `nx test base` to execute the unit tests via [Jest](https://jestjs.io).
