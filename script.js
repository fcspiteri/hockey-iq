const players = document.querySelectorAll('.player');
let activePlayer = null;

// 1. Dragging Logic
players.forEach(player => {
    player.addEventListener('dragstart', (e) => {
        activePlayer = e.target;
    });
});

document.querySelector('#rink').addEventListener('dragover', (e) => {
    e.preventDefault(); // Necessary to allow dropping
});

document.querySelector('#rink').addEventListener('drop', (e) => {
    e.preventDefault();
    const rinkRect = document.querySelector('#rink').getBoundingClientRect();
    
    // Calculate position relative to the rink container
    let x = e.clientX - rinkRect.left - 20; // 20 is half player width
    let y = e.clientY - rinkRect.top - 20;

    activePlayer.style.left = x + 'px';
    activePlayer.style.top = y + 'px';
});

// 2. Validation Logic
function checkAnswer() {
    const d1 = document.getElementById('d1');
    const target = document.getElementById('target-d1');
    
    // Get current positions
    const d1Rect = d1.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // Calculate distance between center points
    const dist = Math.sqrt(
        Math.pow(d1Rect.x - targetRect.x, 2) + 
        Math.pow(d1Rect.y - targetRect.y, 2)
    );

    const feedback = document.getElementById('feedback');
    if (dist < 30) { // 30px tolerance
        feedback.innerText = "Coach is happy! Great positioning.";
        feedback.style.color = "green";
    } else {
        feedback.innerText = "You're out of position! Get back to the slot.";
        feedback.style.color = "red";
    }
}
