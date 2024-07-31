const router = require("express").Router();
const path = require("path");

router.get("/", (req, res) => {
    const filePath = path.join(path.resolve(), "pages", "todos.html");
    return res.sendFile(filePath);
})
router.get("/login", (req, res) => {
    const filePath = path.join(path.resolve(), "pages", "login.html");
    return res.sendFile(filePath);
})
router.get("/signup", (req, res) => {
    const filePath = path.join(path.resolve(), "pages", "signup.html");
    return res.sendFile(filePath);
})

module.exports = router;