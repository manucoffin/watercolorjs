window.onload = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let stainId = 1;

    document.addEventListener('stainManagerChanged', (e) => { 
        refreshCanvas(ctx, canvas, stains);
    }, false);

    document.getElementById('add-stain-btn').addEventListener('click', () => {
        stains.push(new Stain(stainId, ctx, canvas));
        stains[stainId].createManager();
        refreshCanvas(ctx, canvas, stains);
        stainId++;
    });


    // Initialize with a first stain
    let s = new Stain(0, ctx, canvas);
    s.createManager();
    stains.push(s);
    refreshCanvas(ctx, canvas, stains);
}