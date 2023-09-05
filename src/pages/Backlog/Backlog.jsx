import Task from '../../components/Task/Task.js'
import useDataFetching from '../../hooks/useDataFetching.js'
import './Backlog.css'

const Backlog = () => {
	const [loading, error, tasks] = useDataFetching('https://my-json-server.typicode.com/GustavoFelixN/ProjectManagementBoard/tasks');

	return (
		<div className='Backlog-wrapper'>
			<h2>Backlog</h2>
			<div className='Task-wrapper'>
				{loading || error ? (
					<span>{error || 'Loading...'}</span>
				) : (
					tasks.map(task => (
						<Task 
							key={task.id}
							title={task.title}
							body={task.body}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default Backlog;
