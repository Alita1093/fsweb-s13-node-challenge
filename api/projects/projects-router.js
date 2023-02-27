// "project" routerını buraya yazın!
const express = require("express");
const projectModel = require("./projects-model");
const router = express.Router();
const mw = require("./projects-middleware");
router.get("/", (req, res, next) => {
  projectModel.get().then((projects) => {
    res.json(projects);
  });
});

router.get("/:id", mw.idCheck, (req, res, next) => {
  projectModel.get(req.params.id).then((singleProject) => {
    res.status(200).json(singleProject);
  });
});

router.post("/", mw.validateNewProject, (req, res, next) => {
  projectModel
    .insert({
      description: req.description,
      name: req.name,
    })
    .then((insertedActions) => {
      res.json(insertedActions);
    })
    .catch(next);
});

router.put(
  "/:id",
  mw.idCheck,
  mw.validateNewProject,
  async (req, res, next) => {
    try {
      await projectModel.update(req.params.id, {
        description: req.description,
        name: req.name,
      });
      let updated = await projectModel.get(req.params.id);
      res.status(201).json(updated);
    } catch (error) {
      next();
    }
  }
);

router.delete("/:id", mw.idCheck, async (req, res, next) => {
  try {
    await projectModel.remove(req.params.id);
    res.json({ message: "basarıyla silindi" });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/actions", mw.idCheck, async (req, res, next) => {
  try {
    let actions = await projectModel.getProjectActions(req.params.id);
    res.json(actions);
  } catch (error) {
    next(error);
  }
});

router.use((err, res, req) => {
  res.status(err.status || 500).json({
    customMessage: "Bir hata oluştu kontrol edin",
    message: err.message,
  });
});
module.exports = router;
