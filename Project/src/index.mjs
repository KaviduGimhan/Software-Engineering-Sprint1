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
const db = await mysql.createConnection({
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



// About route
app.get("/about", (req, res) => {
  res.render("about", { title: "group 7w ! scrum master -Kavidu, product owner - Thinura, members- Zasheen and Sarah " });
});

app.get("/cities", async (req, res) => {
  try{
    const [rows, fields] = await db.execute("SELECT *  FROM `city`");
    /* Render cities.pug with data passed as plain object */
    return res.render("cities", { rows, fields });
  } catch (err) {
      console.error(err);
  }
});

// Login route
app.get("/login", (req, res) => {
  res.render("login");
});
// Login route
app.route('/login')
  .get((req, res) => {
    res.render("login");
  })
  .post(async (req, res) => {
    const { username, password } = req.body;
    // Implement authentication logic here
    if (username === "admin" && password === "password") {
      // Authentication successful, redirect to a protected page
      return res.redirect("/dashboard");
    } else {
      // Authentication failed, show an error message
      return res.render("login", { message: "Invalid username or password" });
    }
  });
  app.get('/signup', (req, res) => {
    res.render('signup');
  });
  app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    res.redirect('/');
  });
    
  // City search route
app.get("/search", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    // If no city name is provided, return an empty page
    return res.render("search");
  }
  try {
    const [rows, fields] = await db.execute(
      `SELECT * FROM city WHERE Name LIKE '%${city}%'`
    );
    // Render the search results in a table
    return res.render("search-results", { rows, fields });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});

  
// Returns JSON array of cities
app.get("/api/cities", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT *  FROM `city`");
  return res.send(rows);
});



// Run server!
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 