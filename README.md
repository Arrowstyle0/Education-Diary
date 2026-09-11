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

Create `server/.env` from `server/.env.example` and set `MONGO_URI` to your MongoDB connection string. MongoDB keeps entries available after the server restarts. If it is not configured, the API uses a temporary in-memory store for local testing.

Start the API in one terminal:

```text
npm run dev:server
```

Start Angular in a second terminal:

```text
npm start:client
```

Open `http://localhost:4200` in your browser. The API runs at `http://localhost:3000`.
