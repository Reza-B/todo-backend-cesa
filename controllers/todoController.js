import ToDo from '../models/ToDo.js';

export const createTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const todo = new ToDo({
      userId: req.user.userId,
      title,
      completed: completed || false
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Error creating ToDo' });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await ToDo.find({ userId: req.user.userId });
    res.json(todos);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Error fetching ToDos' });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const updatedToDo = await ToDo.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { title, completed },
      { new: true }
    );

    res.json(updatedToDo);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Error updating ToDo' });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await ToDo.findOneAndDelete({ _id: id, userId: req.user.userId });
    res.json({ message: 'ToDo deleted' });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Error deleting ToDo' });
  }
};
