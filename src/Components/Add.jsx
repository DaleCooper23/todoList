import React from 'react'

const Add = ({ addTask, title, setTitle, mutation, setTask }) => {
  return (
    <>
      {addTask ? 
        <div className="absolute bg-white w-80 h-auto p-4 top-20 shadow-[0px_10px_10px_rgba(0,0,0,0.3)] flex flex-col items-center">
          <h1 className="m-2 text-xl font-mono uppercase">Agregar Tareas</h1>
          <input className="p-2 m-5 shadow-[0px_10px_20px_rgba(0,0,0,0.2)] rounded" type="text" placeholder="Agregar texto.." value={title} onChange={(e) => setTitle(e.target.value)} />
          <button onClick={() => {
              mutation.mutate({
              title: title,
              completed: false
            })
          }}
          disabled={mutation.isLoading || title.trim() === ''}
          className="bg-green-600 w-[9em] cursor-pointer p-2 text-white font-mono text-[14px] rounded">Agregar tarea</button>
        </div> 
        : 
        <button onClick={() => {
          setTask(!addTask)}}
        className="bg-blue-300 w-[2em] h-[2em] font-mono 
        font-bold text-blue-500 cursor-pointer hover:scale-110 
        transition duration-1000 text-4xl rounded-[50%]
        absolute bottom-0 right-0 m-5">
          +
        </button>
        }
    </>
  )
}

export default Add
