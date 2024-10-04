import React, { useState, useEffect } from "react";

const Home = () => {
	const [todo, setTodo] = useState("")
	const [tasks, setTasks] = useState([])
	const [hidden, setHidden] = useState(null)
	
	useEffect(() => {
		fetch('https://playground.4geeks.com/todo/users/vinkavladislavic', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			console.log(response.ok);
			console.log(response.status);
			if (response.status === 404) {
				createUser();
			} 
			return response.json();
		})	
		.then(data => {
        	setTasks(data.todos);
		})	
		.catch(error => console.log('Error on GET request: ', error))

	}, [])

	function createUser() {
		fetch('https://playground.4geeks.com/todo/users/vinkavladislavic', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			console.log(response.ok);
			console.log(response.status);
			return response.json();
		})	
		.then(data => console.log(data))
		.catch(error => console.log("Error creating user:", error))
	}

	function keyDownFunction(e) {
		if(todo.trim() === "") {
			return
		}
		if(e.key === "Enter") {
			fetch('https://playground.4geeks.com/todo/todos/vinkavladislavic', {
				method: 'POST',
				body: JSON.stringify({
					"label": todo.trim(),
					"is_done": false
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then(response => {
				console.log(response.ok);
				console.log(response.status);
				return response.json();
			})	
			.then(data => {
				console.log(data);
				setTasks([...tasks, data]);
				setTodo("");
			})
			.catch(error => console.log("Error adding task:", error))
		}
	}	

	function deleteTask(selectedId) {
		fetch('https://playground.4geeks.com/todo/todos/'+selectedId, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			console.log(response.ok);
			console.log(response.status);
			if (response.ok) {
				setTasks(tasks.filter((actualTask) => actualTask.id !== selectedId));
			} else {
				console.error("Failed to delete task");
			}
		})
		.catch(error => console.log('Error on DELETE request: ', error))
	}

	function deleteAllTasks() {
		fetch('https://playground.4geeks.com/todo/users/vinkavladislavic', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			console.log(response.ok);
			console.log(response.status);
			if (response.ok) {
				setTasks([]);
				createUser();
			} else {
				console.error("Failed to clear all tasks");
			}
		})
		.catch(error => console.log('Error on DELETE request: ', error))
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
					{tasks.map((task) =>(
						<li key={task.id} 
							className="list-group-item"
							onMouseEnter={() => {setHidden(task.id)}}
							onMouseLeave={() => {setHidden(null)}}
						>
							{task.label}
							{hidden === task.id ? 
								<svg 
									xmlns="http://www.w3.org/2000/svg" 
									width="32" 
									height="32" 
									fill="currentColor" 
									style={{ fill: "#D4ADAD" }} 
									className="bi bi-x" 
									viewBox="0 0 16 16"
									onClick={() => deleteTask(task.id)}
								>
									<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
								</svg> : null}
						</li>
					))}
				</ul>
				<div className="footer">
					<p>{tasks.length === 0 ? "No tasks, add a task" : tasks.length + " item left"}</p>
					<button onClick={deleteAllTasks}>Clear all tasks</button>
				</div>
			</div>
			<div className="todo-list-card-effect1 border"></div>
			<div className="todo-list-card-effect2 border"></div>
			<div className="todo-list-card-effect3 border"></div>
		</div>
	);
};

export default Home;
