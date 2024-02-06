# @secma/react

The library builds on `@secma/base` and provides a set of React components and
hooks for the Secma project:

- a set of hooks based on `@vebgen/use-api` and `@secma/base` for each endpoint
  of the Secma API (like `useUserList`, `useUserCreate` and so on).
- `SecMaController` is the component that will usually wrap your entire
  react tree. It provides functions for signing-in and signing out and
  information about the current user.
- `SecMaAppController` helps with placing other application-level information
  into an easy-to-use context (the default log-in path, the prefix for the
  admin routes, and others).
- `PageGuard` in which you can wrap your pages to ensure that the user is
  logged in and have a set of permissions before they can see the protected
  content. The component redirects to the login page if the user is not
  authenticated.


## Development

### Building

Run `nx build react` to build the library.

### Running unit tests

Run `nx test react` to execute the unit tests via [Jest](https://jestjs.io).
