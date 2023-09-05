import { useState, useEffect } from 'react';
import useDataFetching from '../../hooks/useDataFetching';
import Lane from '../../components/Lane/Lane';
import './Board.css';

const lanes = [
	{ id: 1, title: 'To Do' },
	{ id: 2, title: 'In Progress' },
	{ id: 3, title: 'Review' },
	{ id: 4, title: 'Done' },
];

const Board = () => {
	const [loading, error, data] = useDataFetching('https://my-json-server.typicode.com/GustavoFelixN/ProjectManagementBoard/tasks');

	const [tasks, setTasks] = useState([]);

	const onDragStart = (e, id) => {
		e.dataTransfer.setData('id', id);
	}

	const onDragOver = (e) => {
		e.preventDefault();
	}

	const onDrop = (e, laneId) => {
		const id = e.dataTransfer.getData('id');
		const updatedTasks = tasks.filter((task) => {
			if (task.id.toString() === id) {
				task.lane = laneId;
			}
			return task;
		});
		setTasks(updatedTasks);
	};

	useEffect(() => {
		setTasks(data);
	}, [data])

	return (
		<div className='Board-wrapper'>
			{lanes.map((lane) => (
				<Lane 
					key={lane.id} 
					laneId={lane.id}
					title={lane.title} 
					loading={loading}
					error={error}
					tasks={tasks.filter(task => task.lane === lane.id)}
					onDragStart={onDragStart}
					onDragOver={onDragOver}
					onDrop={onDrop}
				/>
			))}
		</div>
	);
}

export default Board;
