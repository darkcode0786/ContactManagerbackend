import express from "express";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

import contactsRoutes from "./routes/contactRoutes.js";
import connectDb from "./config/dbConnection.js";
connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", contactsRoutes);
app.use("/api/users", userRoutes);
app.use(cors());

app.listen(port, () => {
    console.log(`server is running in ${port} port`)
});