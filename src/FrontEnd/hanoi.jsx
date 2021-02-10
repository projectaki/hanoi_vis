import React from "react";
import { hanoi } from "../BackEnd/algorithm";

import "./hanoi.css";

const DISK_NUMBER = 5;

export default class Hanoi extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tower1 : [],

        
        };
    }

    componentDidMount() {
        this.refresh();
        
    }

    refresh() {
        const tower1 = createDisks(DISK_NUMBER);
        this.setState({tower1});

    }

    setUpDisks(n) {
        const elems = document.getElementsByClassName("emptyblock");
        for(let i = 0; i < DISK_NUMBER; i++) {
            console.log(elems[i]);
            elems[i].style.backgroundColor = "brown";
            elems[i].style.margin = "auto";
            elems[i].style.boxShadow = "0 0 0 2px black";
        }
    }

    async runPuzzle() {
        const elems = document.getElementsByClassName("emptyblock");
        let t1h = DISK_NUMBER;
        let t2h = 0;
        let t3h = 0;
        const moves = hanoi(DISK_NUMBER);
        console.log(moves);
        for (let i = 0; i < moves.length; i++) {
            console.log(t1h, t2h, t3h);
            const pair = moves[i];
            
            const from =  getBlockId(pair[0],DISK_NUMBER,t1h,t2h,t3h);
            const to =  getBlockId(pair[1],DISK_NUMBER,t1h,t2h,t3h) - 1;
            let style1 = elems[from].style;
            let style2 = elems[to].style;
            shiftDisk(style1,style2);
            if (pair[0] === 1) t1h -= 1;
            if (pair[0] === 2) t2h -= 1;
            if (pair[0] === 3) t3h -= 1;
            if (pair[1] === 1) t1h += 1;
            if (pair[1] === 2) t2h += 1;
            if (pair[1] === 3) t3h += 1;
            
            await delay(500);
            
    
        }
        
        
        
        
    }

    render() {
        const {tower1} = this.state;
        
        return (
            
            <>
                <div>
                    <div className="tcontainer">
                        <div class="row">

                            <div class="col s4">
                                <div className="towercont">
                                    {tower1.map((block, id) => {
                                        return <div key={id} className="emptyblock" style={{width: `${block * 20}px`, height: `10px`}}></div>
                                    })}
                                </div>
                            </div>
                            <div class="col s4">
                                <div className="towercont">
                                    {tower1.map((block, id) => {
                                        return <div key={id} className="emptyblock" style={{width: `${block * 20}px`, height: `10px`}}></div>
                                    })}
                                </div>
                            </div>
                            <div class="col s4">
                                <div className="towercont">
                                    {tower1.map((block, id) => {
                                        return <div key={id} className="emptyblock" style={{width: `${block * 20}px`, height: `10px`}}></div>
                                    })}
                                </div>
                            </div>

                        </div>
                        
                        
                        
                    </div>
                    <div className="container">
                    <div class="row">

                        <div class="col s6">
                            <div >
                                <center>
                                    <button className="waves-effect waves-light btn" onClick={() => this.setUpDisks(7)}>setup</button>
                                </center>
                            
                            </div>
                        </div>
                        <div class="col s6">
                            <div >
                                <center>
                                    <button className="waves-effect waves-light btn" onClick={() => this.runPuzzle()}>Solve</button>
                                </center>
                            
                            </div>
                        </div>


                    </div>
                        
                        
                    </div>
                    <div className="container">
                    <div class="row">
                        <div class="col s12 m12">
                        <div class="card brown ">
                            <div class="card-content white-text">
                            <span class="card-title">Instruction</span>
                            <p>The setup button sets up the disks. The solve button then solves the puzzle! As of now you have to refresh the page
                                if you want to reset.(still buggy)
                            </p>
                            </div>
                            
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                
                

                
                
                
                
            </>
            
        )
    }

}
function getBlockId(tower, n, t1, t2, t3) {

        let toSwap = tower * n;
        if (tower === 1) toSwap -= t1;
        if (tower === 2) toSwap -= t2;
        if (tower === 3) toSwap -= t3;
        return toSwap;
}

function createDisks(numberOfDisks) {
    const disks = [];
    for (let i = 0; i < numberOfDisks; i++) {
        disks.push(i + 2);
    }
    return disks;
}

function shiftDisk(style1, style2) {
        
        style2.width = style1.width;
        style2.height = style1.height;
        style2.backgroundColor = style1.backgroundColor;
        style2.margin = style1.margin;
        style2.boxShadow = style1.boxShadow;
        style1.backgroundColor = "white";
        style1.boxShadow = "0 0 0 0px black";
}


function delay(n) {  
    n = n || 2000;
    return new Promise(done => {
      setTimeout(() => {
        done();
      }, n);
    });
  }