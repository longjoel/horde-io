const main = async () => {

   

    let gameState = {
        isRunning: true
        
    };

    let resources = {
        canvas: document.getElementById('_main'),
        ctx: document.getElementById("_main").getContext("2d"),
        size:{width:-1, height:-1}
    };

    const gfxStep = async (ts) => {

        if (resources.ctx) {
            const ctx = resources.ctx;
            ctx.lineWidth = 10;

            // Wall
            ctx.strokeRect(75, 140, 150, 110);

            // Door
            ctx.fillRect(130, 190, 40, 60);

            // Roof
            ctx.beginPath();
            ctx.moveTo(50, 140);
            ctx.lineTo(150, 60);
            ctx.lineTo(250, 140);
            ctx.closePath();
            ctx.stroke();

        }



        if (gameState.isRunning) {
            requestAnimationFrame(gfxStep);
        }
    }



    const init = async () => {
        window.onload = window.onresize = function() {
            resources.canvas.width = window.innerWidth;
            resources.canvas.height = window.innerHeight;   
            resources.size = {width:window.innerWidth, height:window.innerHeight};
        }
        requestAnimationFrame(gfxStep);
    }

    


    await init();


};



main();