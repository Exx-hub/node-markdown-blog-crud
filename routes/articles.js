const express = require("express");
const articleController = require("../controllers/articleController");

const router = express.Router();

// articles routes
router.get("/", articleController.getAllArticles);

// get new article form
router.get("/new", articleController.getNewArticleForm);

// add new article
router.post("/", articleController.createNewArticle);

// get single article
router.get("/:slug", articleController.getSingleArticle);

// edit article form
router.get("/edit/:id", articleController.getEditForm);

// edit article
router.put("/edit/:id", articleController.updateArticle);

// delete article
router.delete("/delete/:id", articleController.deleteArticle);

module.exports = router;
