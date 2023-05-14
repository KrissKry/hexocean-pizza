# HexOcean - task

## Prerequisites

-   Node `v18.14.1` (npm v9.3.1), but any LTS Node won't introduce any project-breaking differences [Download](https://nodejs.org/dist/v18.14.1/)

## Setup & Run

-   Clone git repository
-   `npm i` to install all the libraries
-   `npm run dev` to run the project locally
-   WebApp accessible at [http://localhost:5173/](http://localhost:5173/)

## End note

Time spent on the project is circa 10h as I had to figure out `@tanstack/react-query` with _POST_ requests (mutations) + had to (quickly) redesign generic form for `watch` hook.

Project was set up in a modern way with TS, Vite, ESLint and Prettier in mind. Used `react-hook-form` as I already knew the library pretty well and learning `redux-form` - an obsolete library - was simply unnecessary for the sake of the task.

However, it's successor - `react-final-form` - looks quite interesting and I am looking forward to mastering it in the upcoming projects.
