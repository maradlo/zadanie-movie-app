# Movie App

A simple movie application built with React, TypeScript, Redux Toolkit, and Ant Design. The app allows users to search for movies, view movie details, and manage a list of favourite movies.

## Features

### Movie Search:

Search for movies using the OMDb API with infinite scrolling of results.

### Movie Details:

View detailed information about a selected movie.

### Favourite Movies:

Add or remove movies from your list of favourites.

### State Management:

Uses Redux Toolkit for state management.

### Persistent Favourites:

Favourite movies are persisted in localStorage.

### Responsive UI:

Built with Ant Design components and styled for a dark theme.

### Error Handling:

Displays toast notifications for errors and user actions.

# Getting Started

## Prerequisites

Before you begin, ensure you have met the following requirements:

### Node.js: Make sure you have Node.js installed (version 14 or higher recommended). You can download it from Node.js Official Website.

### npm: Comes with Node.js, but ensure it's up to date.

## Installation

Follow these steps to set up and run the project locally:

### Clone the repository:

```
git clone https://github.com/maradlo/zadanie-movie-app.git
cd movie-app
```

### Install dependencies:

```
npm install
```

### Set up environment variables:

The application requires an API key from the OMDb API to function correctly.

### Option 1: Create a .env file

Create a .env file in the root directory of the project:

```
touch .env
```

Add the following environment variables to the .env file:

```
VITE_API_KEY=your_omdb_api_key
VITE_API_BASE_URL=http://www.omdbapi.com/
```

Replace your_omdb_api_key with your actual OMDb API key.

### Option 2: Rename .env.example

An example environment file is provided. You can rename it and add your API key:

```
cp .env.example .env
```

Open the .env file and replace your_omdb_api_key with your actual OMDb API key.

Obtain an OMDb API Key:

### Available Scripts

In the project directory, you can run:

```
npm run dev
```

Runs the app in development mode.
Open

#### http://localhost:5173

to view it in your browser.

## Dependencies

#### React: Front-end library for building user interfaces.

#### TypeScript: Typed superset of JavaScript.

#### Redux Toolkit: State management library.

#### React Redux: Official React bindings for Redux.

#### React Router DOM: Declarative routing for React.

#### Ant Design: UI component library.

#### Axios: Promise-based HTTP client.

#### Vite: Front-end build tool.

#### @ant-design/icons: Official Ant Design icons.

#### dotenv: Loads environment variables from .env file.
