import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav>
                    <div class="nav-wrapper" >
                    <div className="navgrid" style={{display: "grid", gridTemplateColumns: "20% 80%"}}>
                        <div classname="navgrid-item" style={{paddingLeft: "2vh", marginTop: 0, paddingTop: 0}}>
                            <a href="https://projectaki.github.io/portfolio_akos_madarasz/#/Projects"  >
                            <i class="fas fa-arrow-left"></i>
                            </a>
                        </div>
                        <div classname="navgrid-item">
                            <div style={{paddingLeft: "30%"}}>
                                <p style={{fontSize: "3vh"}}>Towers of Hanoi</p>
                            </div>
                        </div>
                    </div>
                    
                    
                    
                        
                        
                        
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;