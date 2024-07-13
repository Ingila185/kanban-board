# KanbanBoard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Development server

- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## State Management
- The reactivity is added through [signals()](https://angular.dev/guide/signals) API.
- Component states are managed by [NgRx Store](https://ngrx.io/).

## Important Assumptions
- Once an Item is Done, it cannot be edited but only deleted.
- To edit an item once it is marked Done, first drag it to In Progress and then edit.
- An item cannot be marked Done without first getting marked "In-Progress" by dragging it to the right section.



## UI/UX Frameworks
- [Angular 17](https://angular.dev/) 
- [PrimeNG](https://primeng.org/)
- [PrimeFlex](https://primeflex.org/)
- Scss
- Reactive Forms
- [NgRx Store](https://ngrx.io/) for state management.


## Linter
- ESLint 17

## e2e and Component Testing
- [Cypress 13](https://docs.cypress.io/) 
- Run `npx cypress open` or `npx cypress run` to execute the test suite.




## Build on Localhost

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Vercel Deployment
This project is deployed at [Vercel](https://kanban-board-benify.vercel.app/) version 17.2.0.
