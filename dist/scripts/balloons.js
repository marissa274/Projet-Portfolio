// ./src/scripts/balloons.ts
function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
}
function rand(min, max) {
    return min + Math.random() * (max - min);
}
function makeBall(w, h) {
    var r = rand(14, 34);
    var x = rand(r, Math.max(r + 1, w - r));
    var y = rand(r, Math.max(r + 1, h - r));
    var vx = rand(-0.9, 0.9);
    var vy = rand(-0.9, 0.9);
    if (Math.abs(vx) < 0.25)
        vx = vx < 0 ? -0.25 : 0.25;
    if (Math.abs(vy) < 0.25)
        vy = vy < 0 ? -0.25 : 0.25;
    return { x, y, r, vx, vy };
}
function resizeCanvas(canvas, ctx) {
    var dpr = window.devicePixelRatio || 1;
    var w = Math.floor(window.innerWidth);
    var h = Math.floor(window.innerHeight);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    return { w, h };
}
function resolveBallCollision(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    var dist2 = dx * dx + dy * dy;
    var minDist = a.r + b.r;
    if (dist2 === 0)
        return;
    if (dist2 > minDist * minDist)
        return;
    var dist = Math.sqrt(dist2);
    var nx = dx / dist;
    var ny = dy / dist;
    var overlap = minDist - dist;
    a.x -= nx * (overlap * 0.5);
    a.y -= ny * (overlap * 0.5);
    b.x += nx * (overlap * 0.5);
    b.y += ny * (overlap * 0.5);
    var dvx = b.vx - a.vx;
    var dvy = b.vy - a.vy;
    var vn = dvx * nx + dvy * ny;
    if (vn > 0)
        return;
    var impulse = -vn * 0.9;
    a.vx -= impulse * nx;
    a.vy -= impulse * ny;
    b.vx += impulse * nx;
    b.vy += impulse * ny;
}
function step(balls, w, h) {
    var i, j;
    for (i = 0; i < balls.length; i++) {
        var b = balls[i];
        b.x += b.vx;
        b.y += b.vy;
        if (b.x - b.r < 0) {
            b.x = b.r;
            b.vx *= -1;
        }
        else if (b.x + b.r > w) {
            b.x = w - b.r;
            b.vx *= -1;
        }
        if (b.y - b.r < 0) {
            b.y = b.r;
            b.vy *= -1;
        }
        else if (b.y + b.r > h) {
            b.y = h - b.r;
            b.vy *= -1;
        }
    }
    for (i = 0; i < balls.length; i++) {
        for (j = i + 1; j < balls.length; j++) {
            resolveBallCollision(balls[i], balls[j]);
        }
    }
}
function draw(ctx, balls, w, h) {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < balls.length; i++) {
        for (var j = i + 1; j < balls.length; j++) {
            var a = balls[i];
            var b = balls[j];
            var dx = b.x - a.x;
            var dy = b.y - a.y;
            var d2 = dx * dx + dy * dy;
            var max = 170;
            if (d2 < max * max) {
                var d = Math.sqrt(d2);
                var alpha = (1 - d / max) * 0.18;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = "rgba(255, 244, 196," + alpha.toFixed(3) + ")";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
    for (var k = 0; k < balls.length; k++) {
        var c = balls[k];
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 244, 196, 0.08)";
        ctx.fill();
        ctx.strokeStyle = "rgba(230, 220, 201, 0.28)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
    }
}
function initBalloons() {
    var canvas = document.getElementById("bgBalloons");
    if (!canvas)
        return;
    var ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    var size = resizeCanvas(canvas, ctx);
    var balls = [];
    var count = Math.floor(clamp(size.w / 140, 6, 14));
    for (var i = 0; i < count; i++) {
        balls.push(makeBall(size.w, size.h));
    }
    function loop() {
        step(balls, size.w, size.h);
        draw(ctx, balls, size.w, size.h);
        window.requestAnimationFrame(loop);
    }
    function onResize() {
        size = resizeCanvas(canvas, ctx);
        for (var i = 0; i < balls.length; i++) {
            var b = balls[i];
            b.x = clamp(b.x, b.r, size.w - b.r);
            b.y = clamp(b.y, b.r, size.h - b.r);
        }
    }
    window.addEventListener("resize", onResize);
    loop();
}
document.addEventListener("DOMContentLoaded", initBalloons);
