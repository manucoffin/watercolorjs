const POINTS_BETWEEN_SUMMITS = 10;

function refreshCanvas(baseParams) {
    const canvas = baseParams.canvas;
    const ctx = baseParams.ctx;

    ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

    let dilutionParams = {
        ctx: ctx,
        canvas: canvas,
        radius: baseParams.radius * .97,
        sides: baseParams.sides,
        rotateAngle: baseParams.rotateAngle,
        offset: baseParams.offset,
        randomNumbers: baseParams.randomNumbers,
        pointsBetweenSummits: baseParams.pointsBetweenSummits,
        regularity: 10,
        spread: 10,
        details: 10,
        color: 'rgba(255, 255, 255, .01)',
        dilution: baseParams.dilution
    }

    // Generate base polygon and store its points into array
    const basePolygonPoints = generateBasePolygon(baseParams);
    const dilutionPolygonPoints = generateBasePolygon(dilutionParams);

    // Draw base polygon with variation
    for(let i=0; i<100; i++) {
        const polygonPoints = generateVariancePolygon(basePolygonPoints, baseParams.details, baseParams.spread);
        draw(ctx, polygonPoints, baseParams.color);
        
        if (i<=dilutionParams.dilution) {
            const dilutionPolygon = generateVariancePolygon(dilutionPolygonPoints, dilutionParams.details, dilutionParams.spread);
            draw(ctx, dilutionPolygon, dilutionParams.color);
        }        
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