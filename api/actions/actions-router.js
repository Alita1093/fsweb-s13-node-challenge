// "eylem" routerını buraya yazın
const express = require("express");
const actionsModel = require("./actions-model");
const router = express.Router();
const mw = require("./actions-middlware");

router.get("/", (req, res, next) => {
  actionsModel
    .get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", mw.idCheck, (req, res, next) => {
  actionsModel.get(req.params.id).then((singleAction) => {
    res.status(200).json(singleAction);
  });
});

router.post("/", mw.validateNewAction, (req, res, next) => {
  actionsModel
    .insert({
      project_id: req.project_id,
      description: req.description,
      notes: req.notes,
    })
    .then((insertedActions) => {
      res.json(insertedActions);
    })
    .catch(next);
});

router.put("/:id", mw.idCheck, mw.validateNewAction, async (req, res, next) => {
  try {
    await actionsModel.update(req.params.id, {
      description: req.description,
      notes: req.notes,
      project_id: req.project_id,
    });
    let updated = await actionsModel.get(req.params.id);
    res.status(201).json(updated);
  } catch (error) {
    next();
  }
});

router.delete("/:id", mw.idCheck, async (req, res, next) => {
  try {
    await actionsModel.remove(req.params.id);
    res.json({ message: "basariyla silindi" });
  } catch (error) {
    next();
  }
});

router.use((err, res, req) => {
  res.status(err.status || 500).json({
    customMessage: "Bir hata oluştu",
    message: err.message,
  });
});
module.exports = router;
