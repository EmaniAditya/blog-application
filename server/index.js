import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db";
import userRoute from "./routes/user"
import blogRoute from "./routes/blog"

dotenv.config({ path: './.env' })
const PORT = process.env.PORT || 5050

const app = express()

app.use(cors())
app.use(express.json())

connectDB();

app.get("/health", (req, res) => {
    console.log("status - ok");
    res.status(200).send("OK")
});

app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}).on('error', (err) => {
  console.error("Failed to start server:", err);
});
