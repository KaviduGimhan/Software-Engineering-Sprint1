/* Import dependencies */
import express from "express";
import mysql from "mysql2/promise";

/* Create express instance */
const app = express();
const port = 3000;

// Integrate Pug with Express
app.set("view engine", "pug");

// Serve assets from 'static' folder
app.use(express.static("static"));

/* Setup database connection */
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST || "localhost",
  user: "user",
  password: "password",
  database: "world",
});

/* Landing route */
app.get("/", (req, res) => {
  res.render("index");
});

// Sample API route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Landing route
app.get("/", (req, res) => {
  res.render("index");
});

// Gallery route
app.get("/gallery", (req, res) => {
  res.render("gallery");
});

// About route
app.get("/about", (req, res) => {
<<<<<<< Updated upstream
  res.render("about", { title: "Boring about page" });
=======
  res.render("about"); 
>>>>>>> Stashed changes
});

app.get("/cities", async (req, res) => {
  try{
    const [rows, fields] = await db.execute("SELECT *  FROM 'City' ");
    /* Render cities.pug with data passed as plain object */
    return res.render("cities", { rows, fields });
  } catch (err){
      console.error(err)
  }
});


// Returns JSON array of cities
app.get("/api/cities", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT *  FROM 'City' ");
  return res.send(rows);
});

// Run server!
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});