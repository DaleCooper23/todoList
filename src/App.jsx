import { fetchList } from "./CRUD/fetch";
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";
import listaMutaciones from "./CRUD/listaMutaciones";
import Tasks from "./Components/Tasks";
import Add from "./Components/Add";

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchList,
  })
  // Estados para editar task
  const [edit, setEdit] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  //Estados para filtrar task
  const [tareas, setTareas] = useState('todos');
  //Estados para añadir task
  const [addTask, setTask] = useState(false);
  const [title, setTitle] = useState('');
  
  const filter = () => {
    if (!data) return [];
    if (tareas === 'pendient') return data.filter(task => !task.completed)
    if (tareas === 'completed') return data.filter(task => task.completed)
    return data;
  }
  //Mutaciones exportadas
  const { mutation, mutationCompleted, mutationDelete, mutationUpdate } = listaMutaciones();  

 // Render
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-2xl p-4 mb-2 font-mono font-bold text-blue-400 uppercase shadow-2xl bg-blue-100 w-screen ">Lista de tareas</h1>
        <Add addTask={addTask}
             title={title}
             setTitle={setTitle}
             mutation={mutation}
             setTask={setTask}
        />
        <div className="bg-blue-200 min-w-[50vw] h-auto m-6 p-4">
          <button onClick={() => setTareas('pendient')}
          className="bg-blue-500 text-white p-1 rounded m-1 cursor-pointer">
            Mostrar tareas pendientes
          </button>
          <button onClick={() => setTareas('completed')}
          className="bg-blue-700 text-white p-1 rounded m-1 cursor-pointer">
            Mostrar tareas completadas
          </button>
          <button onClick={() => setTareas('todos')}
           className="bg-blue-600 text-white p-1 rounded m-1 cursor-pointer">
            Mostrar todo
          </button>
          {isError && <p>Error al cargar datos. Compuebe su conexion a internet</p>}
          {isLoading && <p>Cargando Datos...</p>}
          {!isLoading && !isError && <Tasks 
          data={filter()}
          edit={edit}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          mutationCompleted={mutationCompleted}
          mutationUpdate={mutationUpdate}
          setEdit={setEdit}
          mutationDelete={mutationDelete}
          />}
        </div>
      </div>
    </>
  )
}

export default App