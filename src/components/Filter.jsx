import React from 'react'

const Filter = (props) => {

	const { value, onChange } = props;

	const handleClick = (key, event) => {
		event.preventDefault();
		onChange(key);
	};

	return (
		<div className="panel-tabs">
			<a
				href='#'
				onClick={handleClick.bind(null, 'ALL')}
				cla
		</div>
	)
}

export default Filter