import express from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todoController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, createTodo);
router.get('/', authenticateToken, getTodos);
router.put('/:id', authenticateToken, updateTodo);
router.delete('/:id', authenticateToken, deleteTodo);

export default router;
