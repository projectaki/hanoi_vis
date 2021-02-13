import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav>
                    <div class="nav-wrapper" style={{textAlign: "center"}}>
                        <p style={{fontSize: "3vh"}}>Towers of Hanoi</p>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;