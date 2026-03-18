require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const BASE_URL = process.env.BASE_URL;
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "DocuThinker API Documentation",
      version: "1.1.0",
      description:
        "Comprehensive API documentation for the DocuThinker application.",
      termsOfService:
        "https://docuthinker-fullstack-app.vercel.app/terms-of-service",
      contact: {
        name: "DocuThinker",
        url: "https://docuthinker-fullstack-app.vercel.app/",
        email: "vk1062480@gmail.com",
      },
      license: {
        name: "MIT License",
        url: "https://opensource.org/licenses/MIT",
      },
    },
   servers: [
  {
    url: process.env.BASE_URL || "http://localhost:5000",
    description: "Production server",
  },
  {
    url: "https://docuthinker-ai-app.onrender.com",
    description: "Backup production server",
  },
  {
    url: "http://localhost:5000",
    description: "Local development server",
  },
],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: [
    path.resolve(__dirname, "../index.js"),
    path.resolve(__dirname, "../controllers/controllers.js"),
    path.resolve(__dirname, "../models/models.js"),
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
