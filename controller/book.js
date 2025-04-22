import book from "../model/book.js";

const createbook = async (req, res) => {
  try {
    {
      const newbook = new book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        genre: req.body.genre,
        publishedYear: req.body.publishedYear,
      });
      const savedBook = await newbook.save();
      res.status(201).json(savedBook);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const getbook = async (req, res) => {
  try {
    const { genre, author } = req.query;
    const filter = {};
    if (genre) filter.genre = genre;
    if (author) filter.author = author;
    const books = await book.find(filter);
    if (books.length === 0) {
      return res.status(404).json("No books match the criteria");
    }
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const updatebook = async (req, res) => {
  try {
    const updated = await book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        genre: req.body.genre,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const Deletedbook = async (req, res) => {
  try {
    const deleted = await book.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Book not found" }); // Add return
    }
    return res.json({ message: "book deleted successfully" }); // Add return
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
};

export { createbook, Deletedbook, getbook, updatebook };
