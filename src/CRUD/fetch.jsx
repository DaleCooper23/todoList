import axios from 'axios';

 export const fetchList = async () => {
    const { data } = await axios.get('http://localhost:5000/todos')
    return data;
  }
 export const postList = async (task) => {
    const { data } = await axios.post('http://localhost:5000/todos', task)
    return data;
  }
 export const updateList = async (task) => {
    try {
    const { data } = await axios.put(`http://localhost:5000/todos/${task.id}`, task);
    return data;
    } catch (error) {
      console.error("Error al actualizar estado", error);
    }
  
  }
 export const deleteList = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/todos/${id}`);
      return data;
    } catch (error) {
      console.error("Error eliminando el todo:", error.response?.data || error.message);
    }
  }
 export const completedList = async (task) => {
    const { data } = await axios.put(`http://localhost:5000/todos/${task.id}`, {
      ...task, completed: !task.completed,
    })
    return data;
  }

