document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('main');
    const ctx = canvas.getContext('2d');
    let painting = false;
    let brushSize = 5;
    let color = '#000000'; // Default color is black

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function finishedPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;

        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    // Event Listeners for drawing
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);

    // Color buttons
    document.querySelectorAll('.btn-action').forEach(item => {
        item.addEventListener('click', function() {
            color = window.getComputedStyle(item, null).getPropertyValue('background-color');
            ctx.beginPath(); // Reset the path so color doesn't drag if switching mid-draw
        });
    });

    // Erase button
    document.getElementById('erase').addEventListener('click', function() {
        color = '#FFFFFF'; // Change color to white for erasing
    });

    // New canvas
    document.getElementById('new').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Brush size slider
    const slider = document.getElementById('slider');
    const brushSizeDisplay = document.getElementById('brushSize');
    slider.value = brushSize; // Default brush size
    brushSizeDisplay.textContent = brushSize;

    slider.addEventListener('input', function() {
        brushSize = this.value;
        brushSizeDisplay.textContent = brushSize;
    });
})