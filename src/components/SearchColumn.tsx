import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import TopNavBar from './TopNavBar';
import '../css/Search.css'
import DashTop from './DashTop';
import searchIcon from '../images/searchIcon.png';

export default function Search(): ReactElement {
    return(
        <div className = "searchContainer">
            <div className = "searchBar">
                <input className = "searchInput" type = "text" value = "Stock Search..."></input>
                <img className = "searchIcon"src = {searchIcon}/>
            </div>
        </div>
    )
}