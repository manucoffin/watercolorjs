function refreshCanvas(ctx, canvas, stains) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let k=1; k<=20; k++) {
        stains.map( (stain) => {
            const canvas = stain.canvas;
            const ctx = stain.ctx;
            ctx.translate(stain.origin.x, stain.origin.y);

            let dilutionParams = {
                ctx: ctx,
                canvas: canvas,
                origin: stain.origin,
                radius: stain.radius * .97,
                sides: stain.sides,
                rotateAngle: stain.rotateAngle,
                offset: stain.offset,
                randomNumbers: stain.randomNumbers,
                pointsBetweenSummits: stain.pointsBetweenSummits,
                regularity: 10,
                spread: 10,
                details: 10,
                color: 'rgba(255, 255, 255, .01)',
                dilution: stain.dilution
            }

            const polygonLayer = {
                baseLayer: stain,
                dilutionLayer: dilutionParams, 
                basePolygonPoints: generateBasePolygon(stain), 
                dilutionPolygonPoints: generateBasePolygon(dilutionParams),
            }

            for(let i=1; i<=5; i++) {
                drawLayer(i*k, polygonLayer)
            }

            ctx.translate(-stain.origin.x, -stain.origin.y);
        });
    }
}


function drawLayer(index, polygonLayer) {
    const baseLayer =  polygonLayer.baseLayer;
    const dilutionLayer =  polygonLayer.dilutionLayer;
    const basePolygonPoints =  polygonLayer.basePolygonPoints;
    const dilutionPolygonPoints =  polygonLayer.dilutionPolygonPoints;

    const polygonPoints = generateVariancePolygon(basePolygonPoints, baseLayer.details, baseLayer.spread);
    draw(baseLayer.ctx, polygonPoints, baseLayer.color);

    if (index<=dilutionLayer.dilution) {
        const dilutionPolygon = generateVariancePolygon(dilutionPolygonPoints, dilutionLayer.details, dilutionLayer.spread);
        draw(baseLayer.ctx, dilutionPolygon, dilutionLayer.color);
    }
}


function draw(ctx, polygonPoints, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);

    for(let i=0; i<polygonPoints.length; i++) {
        ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
    }

    ctx.closePath();
    ctx.fill();
}


function generateBasePolygon(params) {
    const ctx = params.ctx;
    const radius = params.radius;
    const sides = params.sides;
    const rotateAngle = params.rotateAngle;
    const offset = params.offset;
    const randomNumbers = params.randomNumbers;
    const pointsBetweenSummits = params.pointsBetweenSummits;
    const regularity = params.regularity;

    const basePolygonPoints = []

    if (sides < 3) return;
    const a = (Math.PI * 2)/sides;
    
    let currentSummit = {
        x: radius,
        y: 0
    };

    for (let i = 1; i <= sides; i++) {

        let nextSummit = {
            x: radius*Math.cos(a*i),
            y: radius*Math.sin(a*i)
        };

        const points = getPointsBetween(currentSummit, nextSummit, pointsBetweenSummits);

        if(i===1) {
            basePolygonPoints.push(currentSummit);
        }

        for(let j=0; j<points.length; j++) {
            const x = points[j].x + randomNumbers[j*2];
            const y = points[j].y + randomNumbers[j*2+1];

            const rdm = Math.floor(Math.random()*regularity);
            const spreadMore = (rdm===0)? true: false;
            basePolygonPoints.push({x: x, y: y, spreadMore: spreadMore});
        }

        basePolygonPoints.push(nextSummit);

        // Set the new summit
        currentSummit = {
            x: radius*Math.cos(a*i),
            y: radius*Math.sin(a*i)
        };
    }

    return basePolygonPoints;
}


function generateVariancePolygon(points, details, spread) {
    let variancePolygon = [];

    for (let i=0; i<points.length-1; i++) {
        if(i===0) {
            variancePolygon.push(points[i]);
        }

        let variancePoints = getPointsBetween(points[i], points[i+1], details);
        
        
        let spreadMore = 1;
        if (points[i].spreadMore) {
            spreadMore = Math.random()*4;
        }
        
        for(let j=0; j<variancePoints.length; j++) {

            variancePoints[j].x += Math.floor(Math.random() * ((spread*2 + 1)) - spread) * spreadMore;
            variancePoints[j].y += Math.floor(Math.random() * ((spread*2 + 1)) - spread) * spreadMore;
            variancePolygon.push(variancePoints[j]);
        }

        variancePolygon.push(points[i+1]);
    }

    return variancePolygon;
}


function getPointsBetween(a, b, numberOfPoints) {
    let points = [];

    for(let i=0; i<numberOfPoints; i++) {
        const t = i/numberOfPoints;

        const cx = a.x * (1-t) + b.x * t;
        const cy = a.y * (1-t) + b.y * t;

        points.push({x: cx, y: cy});
    }

    return points;
}


function getMiddlePoint(a, b) {
    return {
        x: (a.x + b.x)/2,
        y: (a.y + b.y)/2,
    }
}


function genRdmNumbers(size) {
    let randomNumbers = [];
    for(let i=0; i<size*2; i++) {
        randomNumbers.push(Math.floor(Math.random() * 21) - 10 * (Math.floor(Math.random() * 2) - 1));
    }

    return randomNumbers;
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}