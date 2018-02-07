window.onload = function() {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.translate(canvas.width/2, canvas.height/2);

    // Store the randomness of a shape
    let randomNumbers = genRdmNumbers(POINTS_BETWEEN_SUMMITS);

    let baseParams = {
        ctx: ctx,
        canvas: canvas,
        radius: 100,
        sides: 5,
        rotateAngle: 0,
        offset: 0,
        randomNumbers: randomNumbers,
        pointsBetweenSummits: POINTS_BETWEEN_SUMMITS,
        regularity: 3,
        spread: 20,
        details: 3,
        color: 'rgba(0, 0, 255, .01)',
    }


    refreshCanvas(baseParams);

    

    const inputRegularity = document.getElementById('input-regularity');
    const inputSpread = document.getElementById('input-spread');
    const inputDetails = document.getElementById('input-details');
    const inputSides = document.getElementById('input-sides');
    const inputColor = document.getElementById('input-color');

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
    
    inputSides.addEventListener('input', () => {
        baseParams.sides = inputSides.value;
        refreshCanvas(baseParams);
    }, false);
    
    inputColor.addEventListener('input', () => {
        baseParams.color = inputColor.value + '01';
        refreshCanvas(baseParams);
    }, false);
}