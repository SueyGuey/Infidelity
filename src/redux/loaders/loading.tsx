/**
 * loading.tsx
 * Loading screen
 */

import React, { ReactElement } from 'react';
import './loaders.css';

export default function LoadingAnimation(): ReactElement {
	return (
		<div className="loadingContainer">
			<p className="loadingMessage">Loading...</p>
			<div className="progress-bar">
				<div className="progress-bar-value"></div>
			</div>
		</div>
	);
}
