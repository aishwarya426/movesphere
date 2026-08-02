const express = require('express');
const { body, param, validationResult } = require('express-validator');

const createCrudRoutes = (models) => {
  const router = express.Router();

  // Validation error handler middleware
  const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  };

  Object.entries(models).forEach(([modelName, Model]) => {
    const basePath = `/api/${modelName.toLowerCase()}`;

    // GET all
    router.get(basePath, async (req, res) => {
      try {
        const items = await Model.findAll();
        res.json(items);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // GET by id
    router.get(`${basePath}/:id`, [param('id').notEmpty()], handleValidation, async (req, res) => {
      try {
        const item = await Model.findByPk(req.params.id);
        if (item) res.json(item);
        else res.status(404).json({ error: `${modelName} not found` });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // POST create - simple generic validation example (adjust per model)
    router.post(basePath, [body('id').notEmpty()], handleValidation, async (req, res) => {
      try {
        const newItem = await Model.create(req.body);
        res.status(201).json(newItem);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // PUT update
    router.put(`${basePath}/:id`, [param('id').notEmpty()], handleValidation, async (req, res) => {
      try {
        const [updated] = await Model.update(req.body, { where: { id: req.params.id } });
        if (updated) {
          const updatedItem = await Model.findByPk(req.params.id);
          res.json(updatedItem);
        } else res.status(404).json({ error: `${modelName} not found` });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // DELETE by id
    router.delete(`${basePath}/:id`, [param('id').notEmpty()], handleValidation, async (req, res) => {
      try {
        const deleted = await Model.destroy({ where: { id: req.params.id } });
        if (deleted) res.json({ success: true });
        else res.status(404).json({ error: `${modelName} not found` });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

  });

  return router;
};

module.exports = createCrudRoutes;
