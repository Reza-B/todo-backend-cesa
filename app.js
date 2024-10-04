import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mongoURI } from "./config/config.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import swaggerUi from "swagger-ui-express";

const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
    "title": "ToDo API",
    "version": "1.0.0",
    "description": "API documentation for ToDo application"
  },
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "Todo": {
        "type": "object",
        "properties": {
          "userId": { "type": "string" },
          "title": { "type": "string" },
          "completed": { "type": "boolean" }
        },
        "required": ["userId", "title"]
      }
    }
  },
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "paths": {
    "/api/auth/register": {
      "post": {
        "summary": "Register a new user",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "password": { "type": "string" }
                },
                "required": ["username", "password"]
              }
            }
          }
        },
        "responses": {
          "201": { "description": "User created successfully" },
          "400": { "description": "Error creating user" }
        }
      }
    },
    "/api/auth/login": {
      "post": {
        "summary": "Login a user",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "password": { "type": "string" }
                },
                "required": ["username", "password"]
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Login successful" },
          "400": { "description": "Login error" }
        }
      }
    },
    "/api/todos": {
      "get": {
        "summary": "Get user todos",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "List of todos",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Todo"
                  }
                }
              }
            }
          },
          "400": { "description": "Error fetching todos" }
        }
      },
      "post": {
        "summary": "Create a new todo",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": { "type": "string" },
                  "completed": { "type": "boolean", "default": false }
                },
                "required": ["title"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Todo created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Todo"
                }
              }
            }
          },
          "400": { "description": "Error creating todo" }
        }
      }
    },
    "/api/todos/{id}": {
      "put": {
        "summary": "Update a todo",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": { "type": "string" },
                  "completed": { "type": "boolean" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Todo updated" },
          "400": { "description": "Error updating todo" }
        }
      },
      "delete": {
        "summary": "Delete a todo",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": { "description": "Todo deleted" },
          "400": { "description": "Error deleting todo" }
        }
      }
    }
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", (req, res) =>
  res.status(200).json({ msg: "سلام، برای دیدن سواگر به مسیری که گذاشتم برو!", swagger: "/api-docs" })
);

// Database connection
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



