import {Component} from 'react';
import logo from "./logo.png";
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
                <ul style={styling.nav}>
                    <li style={styling.links}>About</li>
                    <li style={styling.links}>Product</li>
                    <li style={styling.links}>Features</li>
                    <li style={styling.links}>Nav4</li>
                    <li style={styling.links}>Nav5</li>
                </ul>
            </div>
        </div>
        );
    }
}

var styling = {
    name: {
        fontFamily: "\"Montserrat\"",
        fontSize: "50px",
        display: "inline-block",
        height: "100%",
        backgroundColor: "yellow"
    },
    nav: {
        listStyleType: "none",
        display: "inline-block",
    },
    links: {
        verticalAlign: "middle",
        display: "inline-block",
    }
}

export default TopNavBar