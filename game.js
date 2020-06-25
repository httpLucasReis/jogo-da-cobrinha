window.onload = function () {
    var stage = document.querySelector('#stage')

    // Criando um contexto para o canvas 
    var ctx = stage.getContext("2d");

    document.addEventListener("keydown", keyPress);

    // A cada 80 ms a função game é chamada
    setInterval(game, 60);

    // Adicionando contandor

    function count() {
        ctx.fillStyle = "yellow"
        ctx.font = "700 20px Arial";
        ctx.textAling = "left";
        ctx.fillText(`Pontos: ${counter.points}`, counter.pontx, counter.ponty);
    }

    // Cobra
    const snake = {
        vel: 1,
        velx: 0,
        vely: 0,
        px: 10,
        py: 15,
    }

    // Contador
    const counter = {
        pontx : 10,
        ponty : 25,
        points : 0,
    }

    let qp = 20;
    let tp = 20;

    let ax = 10;
    let ay = 10;

    var trail = [];
    tail = 5;

    function game() {

        snake.px += snake.velx;
        snake.py += snake.vely;

        if (snake.px < 0) {
            snake.px = qp - 1;
        }

        if (snake.px > qp - 1) {
            snake.px = 0;
        }

        if (snake.py < 0) {
            snake.py = qp - 1;
        }

        if (snake.py > qp - 1) {
            snake.py = 0;
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = "red";
        ctx.fillRect(ax * tp, ay * tp, tp, tp);

        for (let i = 0; i < trail.length; i++) {
            ctx.fillStyle = "blue";
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp, tp);
            count();

            if (trail[i].x == snake.px && trail[i].y == snake.py) {
                snake.velx = snake.vely = 0;
                tail = 5;
            }

        }

        trail.push({
            x: snake.px,
            y: snake.py
        });

        while (trail.length > tail) {
            // tira o primeiro elemento do array
            trail.shift();
        }

        if (ax == snake.px && ay == snake.py) {
            tail++;
            counter.points++;

            // Reposicionando a maça
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);
        }

    }

    function keyPress(event) {

        switch (event.keyCode) {
            case 37: // left
                snake.velx = -snake.vel;
                snake.vely = 0;
                break;
            case 38: // up
                snake.velx = 0;
                snake.vely = -snake.vel;
                break;
            case 39: // right
                snake.velx = snake.vel;
                snake.vely = 0;
                break;

            case 40: // down
                snake.velx = 0;
                snake.vely = snake.vel;
                break;
            default:
                break;
        }
    }

};