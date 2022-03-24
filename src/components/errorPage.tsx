import React, { ReactElement } from 'react';

type ErrorPageProps = {
	message?: string;
};

function ErrorPage(props: ErrorPageProps): ReactElement<ErrorPageProps> {
	return (
		<div className="errorPage">
			<div id="errorPageContainer">
				<div className="centerErrorPage">
					<h2 className="errorPageText1">Oops!</h2>
					<h2 className="errorPageText2">Something went wrong.</h2>
					<h2 className="errorPageText3">
						We're working hard on a fix. Please come back later!
					</h2>
					{props.message && <p>Error message: "{props.message}"</p>}
				</div>
			</div>
		</div>
	);
}

export default ErrorPage;
