require("dotenv").config();
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3001;
const bookport = 3000;

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

// Define the Order model
const Order = sequelize.define("Order", {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sync the database
sequelize.sync();

app.get("/api/orders/:id", async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.params.id } });
    if (orders.length > 0) {
      res.json(orders);
    } else {
      res.status(404).send("No orders found for this user");
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/orders", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId, quantity } = req.body;
    try {
      const bookExistsResponse = await fetch(
        `http://localhost:${bookport}/api/books/${bookId}`
      );
      if (!bookExistsResponse.ok) {
        return res.status(400).send("Book does not exist");
      }
      const bookExists = await bookExistsResponse.json();
      if (!bookExists) {
        return res.status(400).send("Book does not exist");
      }
    } catch (error) {
      console.error("Error checking if book exists:", error);
      return res.status(500).send("Internal Server Error");
    }
    const newOrder = await Order.create({ bookId, quantity, userId });
    res.status(201).json({ orderId: newOrder.orderId });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Define the /api/orders/:id route to delete an order by ID
app.delete("/api/orders/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.destroy();
      res.status(204).send(); // No Content
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.patch("/api/orders/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      const { bookId, quantity, userId } = req.body;
      await order.update({ bookId, quantity, userId });
      res.json(order);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
