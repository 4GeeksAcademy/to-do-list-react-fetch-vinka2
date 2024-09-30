import React, { useState } from "react";

const Home = () => {
	const [todo, setTodo] = useState("")
	const [tasks, setTasks] = useState([])
	const [hidden, setHidden] = useState(null)

	function keyDownFunction(e) {
		if(todo.trim() === "") {
			return
		}
		if(e.key === "Enter") {
			setTasks([...tasks, todo.trim()])
			setTodo("")
		}
	}

	function deleteTask() {
		let newTask = tasks.filter((actuaTask, i) => i !== hidden);
		setTasks(newTask);
	}

	return (
		<div className="todo-list-container">
			<h1>todos</h1>
			<div className="todo-list text-start border">
				<div className="todo-list-input">
					<input type="text" 
						onChange={(e) => setTodo(e.target.value)} value={todo}
						onKeyDown={keyDownFunction}
						placeholder="What needs to be done?"
						className="container-fluid"
						/>
				</div>
				<ul className="list-group ">
					{tasks.map((task, index) =>(
						<li key={index} 
							className="list-group-item"
							onMouseEnter={() => {setHidden(index)}}
							onMouseLeave={() => {setHidden(null)}}
						>
							{task}
							{hidden === index ? 
								<svg 
									xmlns="http://www.w3.org/2000/svg" 
									width="32" 
									height="32" 
									fill="currentColor" 
									style={{ fill: "#D4ADAD" }} 
									className="bi bi-x" 
									viewBox="0 0 16 16"
									onClick={deleteTask}
								>
									<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
								</svg> : null}
						</li>
					))}
				</ul>
				<div className="footer">
					<p>{tasks.length === 0 ? "No tasks, add a task" : tasks.length + " item left"}</p>
				</div>
			</div>
			<div className="todo-list-card-effect1 border"></div>
			<div className="todo-list-card-effect2 border"></div>
			<div className="todo-list-card-effect3 border"></div>
		</div>
	);
};

export default Home;
