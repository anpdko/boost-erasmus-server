const express = require('express');
const router = express.Router();
const Events = require('../models/events.module');
const { verifyToken } = require('../middleware/admin.middleware');

const PAGE_SIZE = 5;

// GET api/events - Get all events
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page || '1') - 1
  const totalPages = await Events.countDocuments({})
   
   Events.find()
   .limit(PAGE_SIZE)
   .skip(PAGE_SIZE * page)
   .sort({date:-1}) 
   .then((events) => {
      return res.json({
         page: page + 1,
         totalPages: Math.ceil(totalPages / PAGE_SIZE),
         books: events
      });
   })
   .catch((err) => {
      console.log(err)
      return res.status(400).json({ message: 'Книги не знайдено' })
   })
});

// GET api/events/:id - Get one events by id
router.get('/:id', (req, res) => {
  Events.findById(req.params.id)
    .then(events => {
      res.json(events)
    })
    .catch(err => res.status(404).json({ msg: 'Events not found' }));
});

// GET api/events - Add/save events
router.post('/', verifyToken, (req, res) => {
   Events.create(req.body)
    .then(events => {
      res.json({ msg: 'Events added successfully' })
    })
    .catch(err => {
      console.log("err:", err)
      res.status(400).json({ error: 'Failed to add events' })
    });
});

// GET api/events/:id - Update events
router.put('/:id', verifyToken, (req, res) => {
   Events.findByIdAndUpdate(req.params.id, req.body)
    .then(events => res.json({ msg: 'Successfully updated' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update database' })
    );
});

// GET api/events/:id - Delete book
router.delete('/:id', verifyToken, (req, res) => {
   Events.findByIdAndRemove(req.params.id, req.body)
    .then(events => res.json({ mgs: 'events successfully deleted' }))
    .catch(err => res.status(404).json({ error: 'Events not found' }));
});

module.exports = router;