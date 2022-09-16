import Task from "./Task"

const Tasks = ( {tasks, onDelete, onToggle} ) => {    

  return (
    <>
        {tasks.map((task) => (
            // onDelete passed down to the individual task
            <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
        ))}
    </>
  )
}

export default Tasks