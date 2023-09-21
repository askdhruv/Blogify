import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Nexa Baleno",
    content:
      "The Nexa Baleno offers a spacious interior, making it comfortable for both drivers and passengers. It's a popular choice in the premium hatchback segment, known for its practicality and style.",
    author: "Dhruv Aggarwal",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Nexa Ignis",
    content:
      "The Nexa Ignis is a compact and stylish car, perfect for city driving. It offers a comfortable ride with a modern interior design, making it a great choice for urban commuters.",
    author: "Ishank",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Hyundai I20",
    content:
      "The Hyundai i20 is a well-rounded hatchback with a sleek design. It offers a comfortable and feature-rich interior, making it a top choice in its segment for those seeking style and modern amenities.",
    author: "Aditya Gupta",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
