import React from 'react'

const Tasks = ({ data, edit, editTitle, setEditTitle, mutationCompleted, mutationUpdate, setEdit, mutationDelete }) => {
  return (
    <>
      {data?.map(task => (
            <div className="bg-white m-4 flex justify-between items-center p-2" key={task.id}>
          {edit === task.id ? <input placeholder="Cambiar título" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /> :
              <p>
                {task.title}
              </p>
          }
              <div>
                <button onClick={() => mutationCompleted.mutate(task)}
                 className={`${task.completed ? 'bg-green-500' : 'bg-yellow-500'} m-1 text-white p-1 rounded`}>
                  {task.completed ? 'Completado' : 'Pendiente'}
                </button>
                {edit === task.id ? <button className="bg-gray-500 p-1 m-1 text-white rounded cursor-pointer" 
                onClick={() => {
                mutationUpdate.mutate({
                  id: task.id,
                  title: editTitle,
                  completed: task.completed
                })
                setEdit(null)}}>
                  Guardar cambios
                </button> : <button onClick={() => {
                  setEditTitle(task.title)
                  setEdit(task.id) 
                }} className={`bg-blue-500 p-1 m-1 text-white rounded cursor-pointer`}>
                  Editar
                </button>}
                <button onClick={() => {
                  mutationDelete.mutate(task.id);
                }}
                 className="bg-red-500 text-white p-1 m-1 rounded">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
    </>
  )
}

export default Tasks
