import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import TopNavBar from './TopNavBar';
import '../css/Dashboard.css'
import DashTop from './DashTop';
import DashBottom from './DashBottom';

export default function Dashboard(): ReactElement {
	const user = userPool.getCurrentUser();
	return /*user ?*/ (
		<div className = "Dashboard">
			{/* <TopNavBar/> */}
			<DashSideMenu/>
			<DashTop/>
			<DashBottom/>
		</div>
	) /* : <Navigate to="/"/>*/;
}
