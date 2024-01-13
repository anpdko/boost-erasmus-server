const express = require('express');
const router = express.Router();
const Categories = require('../models/categories.module');
const { verifyToken } = require('../middleware/admin.middleware');

// GET api/categories - Получить все книги
router.get('/', (req, res) => {
   Categories.find()
    .then(categories =>{
      res.json(categories)
    })
    .catch(err => {
      res.status(404).json({ error: 'Categories не найдены' })});
});

// GET api/categories/:id - Получить одну книгу по id
router.get('/:id', (req, res) => {
  console.log("id: ", req.params.id)
  Categories.findById(req.params.id)
    .then(categorie => {
      console.log("categorie:", categorie)
      res.json(categorie)
    })
    .catch(err => res.status(404).json({ error: 'Categories не найдена' }));
});

// GET api/categories - Добавить/сохранить книгу
router.post('/', verifyToken, (req, res) => {
   Categories.create(req.body)
    .then(categorie => {
      res.json(categorie)
    })
    .catch(err => res.status(400).json({ error: 'Не удалось добавить Categories' }));
});

// GET api/categories/:id - Обновить книгу
router.put('/:id', verifyToken, (req, res) => {
   Categories.findByIdAndUpdate(req.params.id, req.body)
    .then(categorie => res.json(categorie))
    .catch(err =>
      res.status(400).json({ error: 'Невозможно обновить базу данных' })
    );
});

// GET api/categories/:id - Удалить книгу 
router.delete('/:id', verifyToken, (req, res) => {
   Categories.findByIdAndRemove(req.params.id, req.body)
    .then(categories => res.json({ mgs: 'Запись в Categories успешно удалена' }))
    .catch(err => res.status(404).json({ error: 'Нет такой Categories' }));
});

module.exports = router;