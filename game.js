window.onload = function () {
    var stage = document.querySelector('#stage')

    // Criando um contexto para o canvas 
    var ctx = stage.getContext("2d");

    document.addEventListener("keydown", keyPress);

    // A cada 80 ms a função game é chamada
    setInterval(game, 80);

    const vel = 1;

    var vx = 0;
    var vy = 0;

    var px = 10;
    var py = 15;

    var tp = 20;
    var qp = 20;

    var ax = 10;
    var ay = 10;

    var trail = [];
    tail = 5;

    function game() {
        console.log(`x:${px} y:${py}`)


        px += vx;
        py += vy;

        if (px < 0) {
            px = qp - 1;
        }

        if (px > qp - 1) {
            px = 0;
        }

        if (py < 0) {
            py = qp - 1;
        }

        if (py > qp - 1) {
            py = 0;
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = "red";
        ctx.fillRect(ax*tp, ay*tp, tp, tp);

        ctx.fillStyle = "blue";
        
        for (let i = 0; i < trail.length; i++) {
            console.log(`trail x:${trail[i].x} trail y:${trail[i].y}`)
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp, tp);

            if (trail[i].x == px && trail[i].y == py) {
                vx = vy = 0;
                tail = 5;
            }
        
        }

        trail.push({
            x: px,
            y: py
        });

        while (trail.length > tail) {
            // tira o primeiro elemento do array
            trail.shift();
        }

        if (ax == px && ay == py) {
            tail++;

            // Reposicionando a maça
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);
        }

    }

    function keyPress(event) {

        switch (event.keyCode) {
            case 37: // left
                vx = -vel;
                vy = 0;
                break;
            case 38: // up
                vx = 0;
                vy = -vel;
                break;
            case 39: // right
                vx = vel;
                vy = 0;
                break;

            case 40: // down
                vx = 0;
                vy = vel;
                break;
            default:
                break;
        }
    }

};