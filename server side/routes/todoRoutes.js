// External imports 
const router = require('express').Router();

const { readTodo, createTodo, deleteTodo, updateTodo, updateTodoStatus, selectTodoByStatus, selectTodoByDate } = require('../controllers/TodoController');
// Internal imports 
const { authCheck } = require('../middlewere/authCheck');



// User routes 
router.get('/', authCheck, readTodo)
router.post('/', authCheck, createTodo)
router.delete('/:id',  authCheck, deleteTodo)
router.patch('/:id',authCheck, updateTodo)
router.patch('/update-status/:id', authCheck, updateTodoStatus)
router.post('/select-by-status', authCheck, selectTodoByStatus)
router.post('/select-by-date',authCheck, selectTodoByDate)

// Export Router 
module.exports = router;