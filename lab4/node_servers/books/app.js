require("dotenv").config();
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

app.use(express.json());

// Set up Sequelize
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.db",
});

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res.status(403).json("A token is required for authentication");

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json("Invalid token");
  }
}

// Define the Book model
const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sync the database
sequelize.sync();

// Define the /api/books route to get all books
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Define the /api/books/:id route to get a single book by ID
app.get("/api/books/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Define the /api/books route to add a new book
app.post("/api/books", verifyToken, async (req, res) => {
  try {
    const { name, author, year } = req.body;
    const newBook = await Book.create({ name, author, year });
    res.status(201).json({ id: newBook.id });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Define the /api/books/:id route to delete a book by ID
app.delete("/api/books/:id", verifyToken, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.status(204).send(); // No Content
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
