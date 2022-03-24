import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import TopNavBar from './TopNavBar';
import '../css/DashBottom.css'
import '../css/home.css'

export default function DashBottom(): ReactElement {
	return(<div className = "dashBottomContain">
        <div className = "dashBottom">
            <span className = "bottomSpan watchLists">
                <div className = "spanCap"><p>Watchlists
                    <select className = "watchSelect">
                        <option value = "Default-Watchlist">
                            Default Watchlist
                        </option>
                        <option value = "Watchlist-A">
                            Watchlist A
                        </option>
                        <option value = "Watchlist-B">
                            Watchlist B
                        </option>
                        <option value = "Watchlist-C">
                            Watchlist C
                        </option>
                    </select>
                    </p>
                </div>
            </span>
            <span className = "bottomSpan positions">
                <div className = "spanCap">
                    <p>Positions</p>
                </div>
            </span>
            <span className = "bottomSpan recentTrade">
                <div className = "spanCap">
                    <p>Recent Trades</p>
                </div>
            </span>
        </div>
    </div>)
}