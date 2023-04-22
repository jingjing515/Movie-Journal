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
  const notes = await prisma.journalItem.findMany()
  if (!notes) {
    res.sendStatus(404);
  }else{
    res.status(200).json(notes);
  }
});

//POST: post a new journal
app.post("/journal", async (req, res) => {
  const { title, content, movie } = req.body;
  const note = await prisma.journalItem.create({
    data: {
      title,
      content,
      movie
    },
  });
  if (!note) {
    res.sendStatus(404);
  }else{
    res.status(200).json(note);
  }
});

// DELETE: delete a journal
app.delete("/journal", async (req, res) => {
  const { id } = req.body;
  const note = await prisma.journalItem.delete({
    where: {
      id
    },
  });
  if (!note) {
    res.sendStatus(404);
  }else{
    res.status(200).json(note);
  }
});

// app.get("/journals", requireAuth, async (req, res) => {
//   const auth0Id = req.auth.payload.sub;

//   const user = await prisma.user.findUnique({
//     where: {
//       auth0Id,
//     },
//   });

//   const journals = await prisma.journalItem.findMany({
//     where: {
//       authorId: user.id,
//     },
//   });

//   res.json(journals);
// });

// creates a journal item
// app.post("/journals", requireAuth, async (req, res) => {
//   const auth0Id = req.auth.payload.sub;

//   const { title } = req.body;

//   if (!title) {
//     res.status(400).send("title is required");
//   } else {
//     const newItem = await prisma.journalItem.create({
//       data: {
//         title,
//         author: { connect: { auth0Id } },
//       },
//     });

//     res.status(201).json(newItem);
//   }
// });

// deletes a journal item by id
// app.delete("/journals/:id", requireAuth, async (req, res) => {
//   const id = req.params.id;
//   const deletedItem = await prisma.journalItem.delete({
//     where: {
//       id,
//     },
//   });
//   res.json(deletedItem);
// });

// get a journal item by id
// app.get("/journals/:id", requireAuth, async (req, res) => {
//   const id = req.params.id;
//   const journalItem = await prisma.journalItem.findUnique({
//     where: {
//       id,
//     },
//   });
//   res.json(journalItem);
// });

// updates a journal item by id
// app.put("/journals/:id", requireAuth, async (req, res) => {
//   const id = req.params.id;
//   const { title } = req.body;
//   const updatedItem = await prisma.journalItem.update({
//     where: {
//       id,
//     },
//     data: {
//       title,
//     },
//   });
//   res.json(updatedItem);
// });

// get Profile information of authenticated user
// app.get("/me", requireAuth, async (req, res) => {
//   const auth0Id = req.auth.payload.sub;

//   const user = await prisma.user.findUnique({
//     where: {
//       auth0Id,
//     },
//   });

//   res.json(user);
// });

// verify user status, if not registered in our database we will create it
// app.post("/verify-user", requireAuth, async (req, res) => {
//   const auth0Id = req.auth.payload.sub;
//   const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
//   const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];

//   const user = await prisma.user.findUnique({
//     where: {
//       auth0Id,
//     },
//   });

//   if (user) {
//     res.json(user);
//   } else {
//     const newUser = await prisma.user.create({
//       data: {
//         email,
//         auth0Id,
//         name,
//       },
//     });

//     res.json(newUser);
//   }
// });

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
