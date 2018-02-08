window.onload = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let baseParams = {
        ctx: ctx,
        canvas: canvas,
        origin: {x: 250, y: 150},
        radius: 150,
        sides: 5,
        rotateAngle: 0,
        offset: 0,
        randomNumbers: genRdmNumbers(10),
        pointsBetweenSummits: 10,
        regularity: 3,
        spread: 20,
        details: 3,
        color: 'rgba(0, 0, 255, .01)',
        dilution: 80
    }
    
    let baseParams2 = {
        ctx: ctx,
        canvas: canvas,
        origin: {x: 325, y: 250},
        radius: 150,
        sides: 5,
        rotateAngle: 0,
        offset: 0,
        randomNumbers: genRdmNumbers(10),
        pointsBetweenSummits: 10,
        regularity: 3,
        spread: 20,
        details: 3,
        color: 'rgba(255, 0, 0, .01)',
        dilution: 80
    }

    let baseParams3 = {
        ctx: ctx,
        canvas: canvas,
        origin: {x: 175, y: 250},
        radius: 150,
        sides: 5,
        rotateAngle: 0,
        offset: 0,
        randomNumbers: genRdmNumbers(10),
        pointsBetweenSummits: 10,
        regularity: 3,
        spread: 20,
        details: 3,
        color: 'rgba(0, 255, 0, .01)',
        dilution: 80
    }

    let stains = [baseParams, baseParams2, baseParams3];

    refreshCanvas(ctx, canvas, stains);


    const inputSides = document.getElementById('input-sides');
    const inputRadius = document.getElementById('input-radius');
    const inputRegularity = document.getElementById('input-regularity');
    const inputSpread = document.getElementById('input-spread');
    const inputDetails = document.getElementById('input-details');
    const inputColor = document.getElementById('input-color');
    const inputDilution = document.getElementById('input-dilution');

    inputRegularity.addEventListener('input', () => {
        baseParams.regularity = inputRegularity.value;
        refreshCanvas(baseParams);
    }, false);
    
    inputSpread.addEventListener('input', () => {
        baseParams.spread = inputSpread.value;
        refreshCanvas(baseParams);
    }, false);
    
    inputDetails.addEventListener('input', () => {
        baseParams.details = inputDetails.value;
        refreshCanvas(baseParams);
    }, false);
    
    inputRadius.addEventListener('input', () => {
        baseParams.radius = inputRadius.value;
        refreshCanvas(baseParams);
    }, false);
    
    inputSides.addEventListener('input', () => {
        baseParams.sides = inputSides.value;
        refreshCanvas(baseParams);
    }, false);
    
    inputColor.addEventListener('input', () => {
        baseParams.color = inputColor.value + '01';
        refreshCanvas(baseParams);
    }, false);
    
    inputDilution.addEventListener('input', () => {
        baseParams.dilution = inputDilution.value;
        refreshCanvas(baseParams);
    }, false);
}