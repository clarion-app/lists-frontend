# @clarion-app/lists-frontend

A frontend application for managing lists (TODO lists, grocery lists, etc.) using React, Redux Toolkit, and Tailwind CSS.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Build](#build)
- [API](#api)
- [Routes](#routes)
- [Menu](#menu)
- [License](#license)

## Installation

To install the dependencies, run the following command:

```bash
npm install
```

## Usage
To build the project for production, run:

```bash
npm run build
```

The build artifacts will be stored in the `dist` directory.

## API

The frontend communicates with the backend API using the `listsApi` module. The base URL for the API is `/api/clarion-app/lists`.

The `listsApi` module provides the following endpoints:

- `getLists`: Fetches all lists.
- `getList`: Fetches a specific list by ID.
- `createList`: Creates a new list.
- `updateList`: Updates a specific list by ID.
- `deleteList`: Deletes a specific list by ID.
- `cloneList`: Clones a specific list by ID.

## Routes

The application includes the following routes:

- `/clarion-app/lists`: Displays a list of all lists.
- `/clarion-app/lists/:name`: Displays a specific list by name.

## Menu

The application includes a menu entry for managing lists:

- **List Manager**
  - **Lists**: `/clarion-app/lists`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Author

Tim Schwartz <tim@metaverse.systems>

## Repository

[GitHub Repository](https://github.com/clarion-app/lists-frontend)
