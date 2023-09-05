import { useState, useEffect } from 'react';

const useDataFetching = (dataSource) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetch(dataSource);
				const result = await data.json();

				if (result) {
					setData(result);
					setLoading(false);
				}
			} catch(e) {
				setError(e.message);
				setLoading(false);
			}

		};

		fetchData();
	}, [dataSource]);

	return [
		loading,
		error,
		data
	];
};

export default useDataFetching;
