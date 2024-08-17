# TableApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Features

- **Table Management:** The application includes a table which fetches the data from the given API url. Table allows to edit the "bio" field inside.
  When routing inside the detail page it allows to edit all the pages.
- **Responsive Design:** The UI is responsive and adjusts gracefully to different screen sizes, enhancing usability on both desktop and mobile devices.
- **Data Searching and Pagination:** Users can search data based on Name and Language property of data inside the Table
- **Authentication concept:** The application has used the basic authentication property just by using the localStorage specification.
  User can simply login and logout by clicking on the respective buttons showed in the UI.
- **Routing and Guard:** Application uses the Authguard and Routes to handle the user login and logout.
- **Directive use:** The application uses highlight directive to show some styles in the tr of the table while hovering.
- **Using Pipes:** Application uses a pipe to convert the string to PascalCase in the Table header.

## Components

- **LoginComponent** Allows users to login to the application.(Simply clicking the button).
- **TableComponent** Displays the Tables. Bio field is made editable for the user friendly approach and the remaining are made editable in the details page.
- **DetailComponent** Displays the particular detials from the table. All the fields are editable. Saving will redirect to Table page. And user can search based on the updated data.

## State Management

### RxJS

RxJS is used for state management within the application. It allows us to handle asynchronous data streams and manage application state reactively. Key concepts and usage include:

- **Observables:** Used to represent data streams and handle events such as user inputs, HTTP requests, and other asynchronous operations.
- **Subjects:** Facilitate communication between different parts of the application by allowing components to emit and subscribe to data changes.
- **Operators:** RxJS operators (e.g., `map`, `filter`, `tap`, `of`) are used to transform and manage data streams, making it easier to handle complex state changes and data manipulations.


## Storage Management

### `StorageService`

The `StorageService` class is used to handle data storage dynamically within the application. It abstracts the use of `localStorage` and `sessionStorage`, allowing you to switch between them based on the persistence needs.

## CSS Utility
This Application used Bootstrap specifications and styles.

### Colors

These colors are defined in the `src/assets/scss/_variables.scss` file.

### Mixins

Mixins are defined in the `src/assets/scss/_mixins.scss` file.

Styles are exported from the `src/assets/scss/main.scss` file.

### Images/Icons

Images or Icons are defined in the `src/assets/images`.