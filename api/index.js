import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

// const requireAuth = auth({
//   audience: process.env.AUTH0_AUDIENCE,
//   issuerBaseURL: process.env.AUTH0_ISSUER,
//   tokenSigningAlg: "RS256",
// });

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/ping", (req, res) => {
  res.send("pong");
});

// GET: list of all journals
app.get("/journals", async (req, res) => {
  const notes = await prisma.journalItem.findMany();
  if (!notes) {
    res.sendStatus(404);
  } else {
    res.status(200).json(notes);
  }
});

// GET: get a journal
app.get("/journal/:id", async (req, res, next) => {
  const id = req.params.id;
  // check ID exisit
  const note = await prisma.journalItem.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!note) {
    res.sendStatus(404);
  } else {
    res.status(200).json(note);
  }
});

//POST: post a new journal
app.post("/journal", async (req, res) => {
  const { title, content, movie } = req.body;
  const note = await prisma.journalItem.create({
    data: {
      title,
      content,
      movie,
    },
  });
  if (!note) {
    res.sendStatus(404);
  } else {
    res.status(200).json(note);
  }
});

// DELETE: delete a journal
app.delete("/journal", async (req, res) => {
  const { id } = req.body;
  const note = await prisma.journalItem.delete({
    where: {
      id,
    },
  });
  if (!note) {
    res.sendStatus(404);
  } else {
    res.status(200).json(note);
  }
});

// PUT: update a journal
app.put("/journal", async (req, res) => {
  const { id, content } = req.body;
  //console.log("Test");
  const posts = await prisma.journalItem.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });
  if (!posts) {
    res.sendStatus(404);
  } else {
    res.status(200).json(posts);
  }
});

//POST: post a new movie
app.post("/movie", async (req, res) => {
  const { title, director, rating } = req.body;
  const note = await prisma.movie.create({
    data: {
      title,
      director,
      rating,
    },
  });
  if (!note) {
    res.sendStatus(404);
  } else {
    res.status(200).json(note);
  }
});

// GET: get a movie
app.get("/movie", async (req, res) => {
  const notes = await prisma.movie.findUnique();
  if (!notes) {
    res.sendStatus(404);
  } else {
    res.status(200).json(notes);
  }
});

const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log("Server running on http://localhost: ${PORT} 🎉 🚀");
});
