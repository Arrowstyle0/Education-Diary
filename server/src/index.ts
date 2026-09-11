import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose, { Schema, type Document } from 'mongoose';

interface EntryInput { title: string; description: string; date: string; }
interface EntryDocument extends EntryInput, Document { createdAt: Date; }
const entrySchema = new Schema<EntryDocument>({
  title: { type: String, required: true, trim: true, maxlength: 80 },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  date: { type: String, required: true }
}, { timestamps: true });
const Entry = mongoose.model<EntryDocument>('Entry', entrySchema);
const memoryEntries: Array<EntryInput & { _id: string }> = [];
const app = express();
app.use(cors());
app.use(express.json());

function validEntry(body: Partial<EntryInput>): body is EntryInput {
  return typeof body.title === 'string' && body.title.trim().length > 0 && body.title.length <= 80
    && typeof body.description === 'string' && body.description.trim().length > 0 && body.description.length <= 2000
    && typeof body.date === 'string' && body.date.length > 0;
}
function serialize(entry: EntryDocument): EntryInput & { _id: string } { return { _id: entry._id.toString(), title: entry.title, description: entry.description, date: entry.date }; }

app.get('/api/health', (_request, response) => response.json({ ok: true }));
app.get('/api/entries', async (_request, response) => {
  if (mongoose.connection.readyState === 1) return response.json((await Entry.find().sort({ date: -1, createdAt: -1 })).map(serialize));
  return response.json(memoryEntries);
});
app.post('/api/entries', async (request, response) => {
  if (!validEntry(request.body)) return response.status(400).json({ message: 'Title, description, and date are required.' });
  if (mongoose.connection.readyState === 1) return response.status(201).json(serialize(await Entry.create(request.body)));
  const entry = { _id: `local-${Date.now()}`, title: request.body.title.trim(), description: request.body.description.trim(), date: request.body.date };
  memoryEntries.unshift(entry);
  return response.status(201).json(entry);
});
app.delete('/api/entries/:id', async (request, response) => {
  if (mongoose.connection.readyState === 1) await Entry.findByIdAndDelete(request.params.id);
  else { const index = memoryEntries.findIndex((entry) => entry._id === request.params.id); if (index >= 0) memoryEntries.splice(index, 1); }
  return response.status(204).send();
});

const port = Number(process.env.PORT || 3000);
const mongoUri = process.env.MONGO_URI;
if (mongoUri) {
  mongoose.connect(mongoUri).then(() => console.log('MongoDB connected')).catch(() => console.warn('MongoDB unavailable; using temporary in-memory entries.'));
}
app.listen(port, () => console.log(`Education Diary API listening on http://localhost:${port}`));
