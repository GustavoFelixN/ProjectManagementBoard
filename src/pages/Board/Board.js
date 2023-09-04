import { useState, useEffect } from 'react';
import Lane from '../../components/Lane/Lane';
import './Board.css';

const lanes = [
	{ id: 1, title: 'To Do' },
	{ id: 2, title: 'In Progress' },
	{ id: 3, title: 'Review' },
	{ id: 4, title: 'Done' },
];

const Board = () => {
	const [loading, setLoading] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const tasks = await fetch('https://my-json-server.typicode.com/GustavoFelixN/ProjectManagementBoard/tasks');

				const results = await tasks.json();

				if (results) {
					setTasks(results);
				}
			} catch (e) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		}

		fetchData();

	}, [])

	return (
		<div className='Board-wrapper'>
			{lanes.map((lane) => (
				<Lane key={lane.id} title={lane.title} />
			))}
		</div>
	);
}

export default Board;
