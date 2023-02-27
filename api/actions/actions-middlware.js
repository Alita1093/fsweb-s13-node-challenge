// eylemlerle ilgili ara katman yazılımları yazın
const { get, insert, update, remove } = require("./actions-model");

function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toLocaleString();
  console.log(method + "---" + url + "--" + timestamp);
  next();
}

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
function validateNewAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  if (!description || !notes) {
    res.status(400).json({
      message: "İstek gövdesinde gerekli alanlardan herhangi biri eksik",
    });
  } else {
    req.description = description;
    req.notes = notes;
    req.project_id = project_id;
    next();
  }
}
module.exports = {
  logger,
  idCheck,
  validateNewAction,
};
