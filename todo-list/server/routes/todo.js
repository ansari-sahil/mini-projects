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
        message: "Title is required",
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
      message: "Todo created successfully",
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

    const todo = await Todo.findOne({ _id: todoId });
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
      });
    }

    if (todo.userId.toString() !== user.id) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    if (title !== undefined) {
      todo.title = title;
    }
    if (complete !== undefined) {
      todo.complete = complete;
    }
    await todo.save();
    return res.json({
      data: todo,
      success: true,
      message: "Todo updated successfully",
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

    const todo = await Todo.findOne({ _id: todoId });
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
      });
    }

    if (todo.userId.toString() !== user.id) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    await Todo.findOneAndDelete({ _id: todoId });
    return res.json({
      message: "Todo deleted successfully",
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

module.exports = router;
