const Article = require("../models/article");

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: "desc" });
    console.log(articles);
    res.render("articles/index", { articles: articles });
    // res.json({ articles });
  } catch (err) {
    console.log(err);
  }
};

const getSingleArticle = async (req, res) => {
  const slug = req.params.slug;

  try {
    const article = await Article.findOne({ slug: slug });
    if (article === null) {
      return res.redirect("/");
    }
    res.render("articles/article", { article: article });
  } catch (err) {
    console.log(err);
  }
};

const getNewArticleForm = (req, res) => {
  res.render("articles/new-article", { article: new Article() });
};

const getEditForm = async (req, res) => {
  const id = req.params.id;
  const articleToEdit = await Article.findById(id);
  res.render("articles/edit-article", { article: articleToEdit });
};

const createNewArticle = async (req, res) => {
  const { title, description, markdown } = req.body;

  const article = new Article({ title, description, markdown });

  let newArticle;

  try {
    newArticle = await article.save();
    res.redirect(`/articles/${newArticle.slug}`);
  } catch (err) {
    console.log(err);
    res.render("articles/new-article", { article: article });
  }
};

const updateArticle = async (req, res) => {
  const id = req.params.id;
  const { title, description, markdown } = req.body;

  const articleToEdit = await Article.findById(id);

  articleToEdit.title = title;
  articleToEdit.description = description;
  articleToEdit.markdown = markdown;

  await articleToEdit.save();

  res.render("articles/article", { article: articleToEdit });
};

const deleteArticle = async (req, res) => {
  const id = req.params.id;

  const articleToDelete = await Article.findByIdAndDelete(id);

  res.redirect("/");
};

module.exports = {
  createNewArticle,
  getNewArticleForm,
  getAllArticles,
  getSingleArticle,
  deleteArticle,
  getEditForm,
  updateArticle,
};
