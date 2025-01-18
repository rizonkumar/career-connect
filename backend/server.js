import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebHooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/company.routes.js";
import connectCloudinary from "./config/cloudinary.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
await connectDB();
await connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post("/webhooks", clerkWebHooks);

app.use("/api/company", companyRoutes);

const PORT = process.env.PORT || 5001;

Sentry.setupExpressErrorHandler(app);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
