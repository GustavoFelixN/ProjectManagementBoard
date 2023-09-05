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
	const [loading, error, tasks] = useDataFetching('https://my-json-server.typicode.com/GustavoFelixN/ProjectManagementBoard/tasks');

	const onDragStart = (e, id) => {
		e.dataTransfer.setData('id', id);
	}

	const onDragOver = (e) => {
		e.preventDefault();
	}

	return (
		<div className='Board-wrapper'>
			{lanes.map((lane) => (
				<Lane 
					key={lane.id} 
					title={lane.title} 
					loading={loading}
					error={error}
					tasks={tasks.filter(task => task.lane === lane.id)}
					onDragStart={onDragStart}
					onDragOver={onDragOver}
				/>
			))}
		</div>
	);
}

export default Board;
