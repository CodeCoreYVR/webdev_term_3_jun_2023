import React from "react";

const NotFoundPage = () => {
	return (
		<div className="container mt-5">
			<div className="card border-light mx-auto">
				<div className="card-header bg-secondary text-white">
					<h1 className="text-center">404 Error</h1>
				</div>
				<div className="card-body">
					<h3 className="text-center">
						Oops! The page you're looking for does not exist.
					</h3>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
