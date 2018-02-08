'use strict';

class Stain {
    constructor(id, ctx, canvas) {
        this.id = id;
        this.ctx = ctx;
        this.canvas = canvas;
        this.origin = {x: 250, y: 250};
        this.radius = 100;
        this.sides = 5;
        this.rotateAngle = 0;
        this.offset = 0;
        this.randomNumbers = genRdmNumbers(10);
        this.pointsBetweenSummits = 10;
        this.regularity = 3;
        this.spread = 20;
        this.details = 3;
        this.color = 'rgba(0, 0, 255, .01)';
        this.dilution = 80;

        this.managerEvent = new Event('stainManagerChanged');
    }

    createManager() {
        document.getElementById('managers').innerHTML += `
            <div data-classid=`+this.id+`>
                <div>
                    <label for="input-originx">originx</label>
                    <input type="range" name="originx" min="0" max="`+Math.round(this.canvas.width)+`" id="input-`+this.id+`-originx" value="`+Math.round(this.canvas.width/2)+`">
                </div>
                
                <div>
                    <label for="input-originy">originy</label>
                    <input type="range" name="originy" min="0" max="`+Math.round(this.canvas.height)+`" id="input-`+this.id+`-originy" value="`+Math.round(this.canvas.height/2)+`">
                </div>

                <div>
                    <label for="input-sides">Sides</label>
                    <input type="range" name="sides" min="3" max="10" id="input-`+this.id+`-sides" value="5">
                </div>
                
                <div>
                    <label for="input-radius">Radius</label>
                    <input type="range" name="radius" min="50" max="300" id="input-`+this.id+`-radius" value="100">
                </div>

                <div>
                    <label for="input-regularity">Regularity</label>
                    <input type="range" name="regularity" min="1" max="10" id="input-`+this.id+`-regularity" value="3">
                </div>

                <div>
                    <label for="input-spread">Spread</label>
                    <input type="range" name="spread" min="10" max="50" id="input-`+this.id+`-spread" value="20">
                </div>
                
                <div>
                    <label for="input-details">Details</label>
                    <input type="range" name="details" min="1" max="10" id="input-`+this.id+`-details" value="3">
                </div>
                
                <div>
                    <label for="input-dilution">Dilution</label>
                    <input type="range" name="dilution" min="0" max="100" id="input-`+this.id+`-dilution" value="80">
                </div>

                <div>
                    <label for="input-color">Color</label>
                    <input type="color" id="input-`+this.id+`-color">
                </div>
            </div>`;


        const ranges = document.querySelectorAll('input[type=range]');

        for (let i=0; i<ranges.length; i++) {
            ranges[i].addEventListener('input', e => {
                const id = e.target.parentNode.parentNode.dataset.classid;
                if (ranges[i].name==='originx') {
                    stains[id].origin.x = e.target.value;
                } else if(ranges[i].name==='originy') {
                    stains[id].origin.y = e.target.value;
                } else {
                    stains[id][ranges[i].name] = e.target.value;
                }

                document.dispatchEvent(this.managerEvent);
            });
        }

        document.getElementById('input-'+this.id+'-color').addEventListener('input', e => {
            this.color = e.target.value + '01';
            document.dispatchEvent(this.managerEvent);
        }, false);        
    }
}