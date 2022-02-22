import {Component} from 'react';
import logo from '../images/logo.png';
import '../css/TopNavBar.css';

class TopNavBar extends Component{
    render(){
        return(
        <div className='header'>
            <div className='insideHeader'>
                <img src= {logo} className='logo' />
                <div className='name' >
                    <p>Infidelity</p>
                </div>
                <ul className='nav'>
                    <li>About</li>
                    <li>Product</li>
                    <li>Features</li>
                    <li>Nav4</li>
                    <li>Nav5</li>
                </ul>
            </div>
        </div>
        );
    }
}

export default TopNavBar