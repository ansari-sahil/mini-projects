const { Todo } = require("../db/models/Todo");
const { isAuthorised } = require("../middlewares");

const router = require("express").Router();

router.get("/", isAuthorised, async (req, res) => {
  try {
    const { user } = req;
    const todos = await Todo.find({ userId: user.id });
    return res.json({
      data: todos,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

router.post("/", isAuthorised, async (req, res) => {
  try {
    const { user } = req;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({
        message: "title is required",
        success: false,
      });
    }
    const todo = await Todo.create({
      title,
      complete: false,
      userId: user.id,
    });
    return res.json({
      data: todo,
      success: true,
      message: "todo created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

router.patch("/:id", isAuthorised, async (req, res) => {
  try {
    const { user } = req;
    const { id: todoId } = req.params;
    const { title, complete } = req.body;
    // check if todo exists
    const todo = Todo.findOne({ _id: todoId });
    if (todo.userId !== user.id) {
      return res.status(401).json({
        message: "unauthorized",
        success: false,
      });
    }
    // check if todo belongs to the user
    if (todo.userId !== user.id) {
      return res.status(401).json({
        message: "unauthorized",
        success: false,
      });
    }
    // update the todo
    if (title !== undefined) {
      todo.title = title;
    }
    if (complete !== undefined) {
      todo.complete = complete;
    }
    await Todo.findOneAndUpdate({ _id: todoId }, todo, { new: true });
    return res.json({
      data: todo,
      success: true,
      message: "todo updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

router.delete("/:id", isAuthorised, async (req, res) => {
  try {
    const { user } = req;
    const { id: todoId } = req.params;
    // check if todo exists
    const todo = Todo.findOne({ _id: todoId });
    if (!todo) {
      return res.status(404).json({
        message: "todo not found",
        success: false,
      });
    }
    // check if todo belongs to the user
    if (todo.userId !== user.id) {
      return res.status(401).json({
        message: "unauthorized",
        success: false,
      });
    }
    // delete the todo
    await Todo.findOneAndDelete({ _id: todoId }, todo, { new: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});
module.exports = router;
