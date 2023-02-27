// projects ara yazılımları buraya
const { get, insert, update, remove } = require("./projects-model");

async function idCheck(req, res, next) {
  try {
    let action = await get(req.params.id);
    if (!action) {
      res.status(404).json({
        message: "Belirtilen id'ye sahip bir proje yok",
      });
    } else {
      next();
    }
  } catch (error) {}
}
function validateNewProject(req, res, next) {
  const { description, name } = req.body;
  if (!description || !name) {
    res.status(400).json({
      message: "İstek gövdesinde gerekli alanlardan herhangi biri eksik",
    });
  } else {
    req.name = name;
    req.description = description;
    next();
  }
}
module.exports = { idCheck, validateNewProject };
