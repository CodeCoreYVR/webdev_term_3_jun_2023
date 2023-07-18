import React from "react";

const WelcomePage = ({ currentUser }) => {
	return (
		<div className="container mt-5">
			<div className="card border-light mx-auto">
				<div className="card-header bg-secondary text-white">
					<h1 className="text-center">Welcome</h1>
				</div>
				<div className="card-body">
					<h3 className="text-center">
						{currentUser
							? `${currentUser.full_name}, you're back! `
							: "Please sign in or sign up to continue."}
					</h3>
				</div>
			</div>
		</div>
	);
};

export default WelcomePage;
