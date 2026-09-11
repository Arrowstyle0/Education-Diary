# Education Diary

Education Diary is a small homework and learning journal. It gives students one place to record what they worked on, review recent entries, and use the interface in a familiar language.

## What it includes

- An Angular client with ten language options.
- Translation text stored in JSON files under `client/public/locales`.
- A form for adding a title, description, and date.
- A recent homework list with delete support.
- An Express API connected to MongoDB through Mongoose.
- Required-field validation before an entry is submitted.
- LocalStorage recovery when a page is refreshed or the connection drops.

## Start the project

From the project folder, install the dependencies:

```text
npm run install:all
```

Create `server/.env` from `server/.env.example` and set `MONGO_URI` to your MongoDB connection string. MongoDB keeps entries available after the server restarts. If it is not configured, the API uses in-memory storage.

Start the API in one terminal:

```text
npm run dev:server
```

Start Angular in a second terminal:

```text
npm run start:client
```

Open `http://localhost:4200` in your browser. The API runs at `http://localhost:3000`.

## Technologies & Dependencies

### Backend

**Runtime & Build Tools:**
- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe JavaScript
- **TSX** - TypeScript execution for development
- **tsc** - TypeScript compiler for production builds

**Core Dependencies:**
- **Express** (^5.1.0) - Web framework for building the REST API
- **Mongoose** (^8.18.0) - MongoDB object modeling and validation
- **CORS** (^2.8.5) - Middleware for handling Cross-Origin Resource Sharing
- **dotenv** (^16.4.7) - Environment variable management

**Development Dependencies:**
- **@types/cors** - TypeScript types for CORS
- **@types/express** - TypeScript types for Express
- **@types/node** - TypeScript types for Node.js

### Frontend

**Core Framework & Libraries:**
- **Angular** (^20.3.0) - Modern web application framework
  - @angular/common - Common utilities and components
  - @angular/compiler - Angular template compiler
  - @angular/core - Core Angular functionality
  - @angular/forms - Forms handling and validation
  - @angular/platform-browser - Browser platform implementation
  - @angular/router - Client-side routing

**Supporting Libraries:**
- **RxJS** (~7.8.0) - Reactive programming with observables
- **tslib** (^2.3.0) - TypeScript runtime library
- **zone.js** (~0.15.0) - Zone management for Angular

**Development & Build Tools:**
- **@angular/build** (^20.3.36) - Angular build system
- **@angular/cli** (^20.3.36) - Angular command line interface
- **@angular/compiler-cli** - Angular template compilation for build
- **TypeScript** (~5.9.2) - Type-safe JavaScript

**Testing Framework:**
- **Jasmine** (~5.9.0) - Testing framework
- **Karma** (~6.4.0) - Test runner
- **karma-chrome-launcher** - Chrome browser launcher for tests
- **karma-coverage** - Code coverage reports
- **karma-jasmine** - Jasmine adapter for Karma
- **karma-jasmine-html-reporter** - HTML test reports

**Code Quality:**
- **Prettier** - Code formatter (configured for 100 character print width and single quotes)
