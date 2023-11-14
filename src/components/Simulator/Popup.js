import React from 'react';

const Popup = ({ id, label, position }) => {
	return (
		<div
			className='popup'
			style={{
				left: position.x,
				top: position.y,
			}}
		>
			<h3>Node {id}</h3>
			<p>{label}</p>
		</div>
	);
};

export default Popup;
