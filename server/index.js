// Small Express API behind the website: receives the loan application form.
// Submissions are stored as JSON under server/data so the project runs with no database.
// Swap the store for your database, CRM or an email/WhatsApp notification when ready.

import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");
const DIST_DIR = path.join(__dirname, "..", "dist");
const PORT = Number(process.env.PORT) || 5001;

fs.mkdirSync(DATA_DIR, { recursive: true });

function readAll(name) {
  const file = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return [];
  }
}

function append(name, row) {
  const rows = readAll(name);
  rows.push(row);
  fs.writeFileSync(path.join(DATA_DIR, `${name}.json`), JSON.stringify(rows, null, 2));
  return row;
}

const isEmail = (v) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/loan-application", (req, res) => {
  const b = req.body ?? {};
  if (b.honeypot) return res.status(400).json({ error: "Rejected" });
  const required = ["fullName", "email", "address", "state", "pinCode", "mobile", "loanPurpose", "loanAmount"];
  const missing = required.filter((k) => !String(b[k] ?? "").trim());
  if (missing.length) return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });
  if (!isEmail(b.email)) return res.status(400).json({ error: "Please enter a valid email address." });
  if (!/^[\d+()\-. ]{6,20}$/.test(String(b.mobile))) return res.status(400).json({ error: "Please enter a valid mobile number." });

  const application = append("applications", {
    id: crypto.randomUUID(),
    status: "New",
    createdAt: new Date().toISOString(),
    fullName: String(b.fullName).trim(),
    email: String(b.email).trim(),
    address: String(b.address).trim(),
    state: String(b.state).trim(),
    pinCode: String(b.pinCode).trim(),
    mobile: String(b.mobile).trim(),
    loanPurpose: String(b.loanPurpose).trim(),
    loanAmount: Number(b.loanAmount),
  });

  // Hook point: send an email / WhatsApp / CRM notification here.
  console.log(`[loan-application] ${application.id} from ${application.mobile}`);
  res.status(201).json({ ok: true, id: application.id });
});

// In production, serve the built React app from the same server
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get("*", (_req, res) => res.sendFile(path.join(DIST_DIR, "index.html")));
}

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
