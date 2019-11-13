import React, { Component } from 'react';
import logo from './disc-logo.png';
import './Header.css';

class Header extends Component{
    constructor(props) {
        super(props);
    }
      
    render(){
        return (
            <div>
                <ul className="header">
                    <li className="header-item title">
                        <img src={logo} className="logo" />
                        <div>Disc Manager</div>
                    </li>
                    <li className="header-item"><a href="/colecoes">Coleções de Disco</a></li>
                    <li className="header-item"><a href="/discos">Discos</a></li>
                </ul>
            </div>
        )
    }
}

export default Header;