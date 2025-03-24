import { postList, updateList, deleteList, completedList } from "./fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query"

const listaMutaciones = () => {
    const queryClient = useQueryClient();
    //Mutaciones
  const mutationCompleted = useMutation({
    mutationFn: completedList,
    onMutate: async (taskCompleted) => {
      await queryClient.cancelQueries(['todos']);

      const previousTasks = queryClient.getQueryData(['todos']);

      queryClient.setQueryData(['todos'], (old) => 
        old.map(task => task.id === taskCompleted.id ? {...task, completed: !task.completed} : task));
      
      return { previousTasks }
    }, 
    onError: (_, __, context) => {
      queryClient.setQueryData(['todos'], context.previousTasks);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    }
  })
  const mutationDelete = useMutation({
    mutationFn: deleteList,
    onMutate: async (id) => {
      await queryClient.cancelQueries(['todos']);

      const previousTasks = queryClient.getQueryData(['todos']);

      queryClient.setQueryData(['todos'], (old) => old.filter(task => task.id !== id));

      return { previousTasks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['todos'], context.previousTasks);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    }
  })
  const mutationUpdate = useMutation({
    mutationFn: updateList,
    onMutate: async (taskToUpdate) => {
      await queryClient.cancelQueries(['todos']);

      const previousTasks = queryClient.getQueryData(['todos']);

      queryClient.setQueryData(['todos'], (old) => 
        old.map(task => task.id === taskToUpdate.id ? taskToUpdate : task))

      return { previousTasks }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['todos'], context.previousTasks);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    }
  })
  const mutation = useMutation({
    mutationFn: postList,
    onMutate: async (newTask) => {
      await queryClient.cancelQueries(['todos'])

      const previousTasks = queryClient.getQueryData(['todos']);

      queryClient.setQueryData(['todos'], (old) => [...old, newTask]
      );

      return { previousTasks };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(['todos'], context.previousTasks);
      console.error('Error al cargar los datos', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    }
  })
  return { mutationCompleted, mutationDelete, mutationUpdate, mutation }
}

export default listaMutaciones
