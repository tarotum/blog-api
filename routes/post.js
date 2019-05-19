const express = require("express");

const Router = express.Router();
const PostController = require("../controllers/post");

Router.get("/", PostController.getAll);
Router.get("/:id", PostController.get);
Router.post("/", PostController.create);
Router.put("/:id", PostController.update);
Router.delete("/:id", PostController.delete);

module.exports = Router;
