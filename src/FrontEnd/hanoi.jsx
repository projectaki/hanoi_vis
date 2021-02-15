import React from "react";
import { hanoi } from "../BackEnd/algorithm";

import "./hanoi.css";


export default class Hanoi extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tower1 : [],
            terminate : true,
            running: false,
            input: 3,
            
        };
    }

    componentDidMount() {
        this.refresh();
        this.setUpDisks();
    }

    refresh() {
        // tower1 is array with disk lengths
        const tower1 = createDisks(this.state.input);
        this.setState({tower1});
    }

    // terminate the running loop and reset
    async reset() {
        this.setState({terminate:true});
        await delay(1);
        this.refresh();
        await delay(1);
        this.setUpDisks();
    }

    // reset div lengths
    resetBoardLengths() {
        const elems = document.getElementsByClassName("emptyblock");
        for(let i = 0; i < elems.length; i++) {
            var wide = this.state.tower1[i % this.state.input];
            elems[i].style.width = wide +"vw";
        }
    }

    // empty the board of colors
    clearBoard() {
        this.resetBoardLengths();
        const elems = document.getElementsByClassName("emptyblock");
        for(let i = 0; i < elems.length; i++) {
            
            elems[i].style.backgroundColor = "black";
            elems[i].style.margin = "auto";
            elems[i].style.boxShadow = "0 0 0 0px black";
        }
        
    }

    // set up the discs
    async setUpDisks() {
        //this.setState({running: false});
        this.clearBoard();
        await delay(1);
        
        const elems = document.getElementsByClassName("emptyblock");
        for(let i = 0; i < this.state.input; i++) {
            
            elems[i].style.backgroundColor = "brown";
            elems[i].style.margin = "auto";
            elems[i].style.boxShadow = "0 0 0 0.1vw black";
        }
    }

    // if no functiuon is running then run the function
    async solve() {
        
        if (this.state.running === false) {
            
            this.setState({running: true});
            this.runPuzzle();
        }
    }

    async runPuzzle() {
        
        this.setState({terminate:false});
        await delay(1);
        const elems = document.getElementsByClassName("emptyblock");
        let t1h = this.state.input;
        let t2h = 0;
        let t3h = 0;
        const moves = hanoi(this.state.input);
        
        
        for (let i = 0; i < moves.length; i++) {
            if(this.state.terminate === true) {
                this.setState({running: false});
                return;
            }
            
            const pair = moves[i];
            
            const from =  getBlockId(pair[0],this.state.input,t1h,t2h,t3h);
            const to =  getBlockId(pair[1],this.state.input,t1h,t2h,t3h) - 1;
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
        
        await delay(1);
        this.setState({running: false});
        
    }

    async updateInput(evt) {
        this.setState({input: evt.target.value});
        await delay(1);
        this.refresh();
        this.clearBoard();
        this.render();
        this.setUpDisks();
    }

    render() {
        const {tower1} = this.state;
        
        return (
            
            <>
                <div>
                    <div className="container" style={{textAlign: "center"}}>
                    <label htmlFor="diskRange" class="form-label" style={{fontSize: "2vw"}}>Number of discs</label>
                    <input value={this.state.input} onChange={evt => this.updateInput(evt)} type="range" class="form-range" min="1" max="8" step="1" id="diskRange"
                    style={{height: "3vh"}}
                    />
                    <div className="white-text" style={{fontSize: "2vw"}}>
                        {this.state.input}
                    </div>
                    </div>
                    <div className="tcontainer">
                        <div class="row" style={{paddingTop: "10vh"}}>

                            <div class="col s4">
                                <div className="towercont">
                                    {tower1.map((block, id) => {
                                        return <div key={id} className="emptyblock" style={{width: `${block }vw`, height: `2vw`}}></div>
                                    })}
                                </div>
                            </div>
                            <div class="col s4">
                                <div className="towercont">
                                    {tower1.map((block, id) => {
                                        return <div key={id} className="emptyblock" style={{width: `${block}vw`, height: `2vw`}}></div>
                                    })}
                                </div>
                            </div>
                            <div class="col s4">
                                <div className="towercont">
                                    {tower1.map((block, id) => {
                                        return <div key={id} className="emptyblock" style={{width: `${block}vw`, height: `2vw`}}></div>
                                    })}
                                </div>
                            </div>

                        </div>
                        
                        
                        
                    </div>
                    <div className="container" style={{marginTop: "3vh"}}>
                    <div class="grid-container">
                            <div className="grid-item">
                                
                                <button className="waves-effect waves-light btn" onClick={() => this.solve()}>
                                    <label className="white-text" style={{fontSize: "1vw"}}>solve</label>
                                </button>
                            </div>
                            <div className="grid-item">
                                <button className="waves-effect waves-light btn" onClick={() => this.reset()}>
                                    <label className="white-text" style={{fontSize: "1vw"}}>reset</label>
                                </button>
                            </div>

                    </div>
                        
                        
                    </div>
                    <div className="container">
                    <div class="row">
                        <div class="col s12 m12">
                        <div class="card blue-grey ">
                            <div class="card-content white-text">
                            <h4 class="resp-head">Towers of Hanoi Puzzle Description</h4>
                            <p>The Tower of Hanoi (also called the Tower of Brahma or Lucas' Tower[1] and sometimes pluralized as Towers) is a mathematical game or puzzle. It consists of three rods and a number of disks of different sizes, which can slide onto any rod. The puzzle starts with the disks in a neat stack in ascending order of size on one rod, the smallest at the top, thus making a conical shape.

                                The objective of the puzzle is to move the entire stack to another rod, obeying the following simple rules:

                                Only one disk can be moved at a time.
                                Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod.
                                No larger disk may be placed on top of a smaller disk. <a href="https://en.wikipedia.org/wiki/Tower_of_Hanoi" style={{fontSize:"1vw"}}>[source]</a>
                                
                                
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
        disks.push(i*3 + 3);
    }
    return disks;
}

function shiftDisk(style1, style2) {
        
        style2.width = style1.width;
        style2.height = style1.height;
        style2.backgroundColor = style1.backgroundColor;
        style2.margin = style1.margin;
        style2.boxShadow = style1.boxShadow;
        style1.backgroundColor = "black";
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

// function clearDelay(tim) {
//     clearTimeout(tim);
// }