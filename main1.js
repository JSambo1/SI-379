    // Draw the bars for the expected and actual probabilities
    for (let i = 0; i < 2 * NUM_LEVELS - 1; i += 2) {
        const { x, y } = getGraphicLocation(i, NUM_LEVELS - 1);
        const barY = y + PEG_RADIUS + 2;

        const actualBar = createRect(x - X_MOVEMENT / 2, barY, X_MOVEMENT, 0, BALL_COLOR, 'none', svgElement);
        actualBars.push(actualBar);

        const prob = getBinomialProbability(NUM_LEVELS - 1, Math.floor(i / 2), PROBABILITY_RIGHT);
        const expectedBar = createRect(x - X_MOVEMENT / 2, barY, X_MOVEMENT, BAR_SCALE_FACTOR * prob, 'rgba(0, 0, 0, 0.1)', BALL_COLOR, svgElement);
        expectedBars.push(expectedBar);
    }

    async function dropBall() {
        let row = 0;
        let col = NUM_LEVELS - 1;

        const { x, y } = getGraphicLocation(col, row);
        const circle = createCircle(x, y, BALL_RADIUS, BALL_COLOR, BALL_COLOR, svgElement);
        circle.setAttribute('opacity', 0.9);

        for (let i = 0; i < NUM_LEVELS - 1; i++) {
            row++;

            if (Math.random() < PROBABILITY_RIGHT) {
                col++;
            } else {
                col--;
            }

            const { x, y } = getGraphicLocation(col, row);
            await moveCircleTo(circle, x, y, DELAY_BETWEEN_PEGS / ballsAnimationSpeed);

            const peg = pegs[row][col];
            hitCounts[row][col]++;
            if (hitCounts[row][col] === 1) {
                peg.setAttribute('fill', '#DDD');
            } else {
                peg.setAttribute('fill', '#AAA');
            }
        }

        const finalColHitCount = hitCounts[NUM_LEVELS - 1][col];
        const barIndex = Math.floor(col / 2);
        const newBarHeight = BAR_SCALE_FACTOR * finalColHitCount / numBallsInput.value;
        await changeHeightTo(actualBars[barIndex], newBarHeight, DELAY_WHEN_DROP / ballsAnimationSpeed);

        circle.remove();
    }

    async function dropBalls() {
        redrawBoard();

        dropBallsButton.setAttribute('disabled', true);
        numLevelsInput.setAttribute('disabled', true);
        numBallsInput.setAttribute('disabled', true);
        rightwardProbabilityInput.setAttribute('disabled', true);

        const dropBallPromises = [];
        for (let i = 0; i < numBallsInput.value; i++) {
            const ballDropPromise = dropBall();
            await pause(Math.random() * DELAY_BETWEEN_BALLS / ballsAnimationSpeed);
            dropBallPromises.push(ballDropPromise);
        }

        await Promise.all(dropBallPromises);

        dropBallsButton.removeAttribute('disabled');
        numLevelsInput.removeAttribute('disabled');
        numBallsInput.removeAttribute('disabled');
        rightwardProbabilityInput.removeAttribute('disabled');
    }

    dropBallsButton.addEventListener('click', dropBalls);
    redrawBoard();


// Function to clear the SVG board
function clearBoard() {
    while (svgElement.firstChild) {
        svgElement.removeChild(svgElement.firstChild);
    }
}

// Helper function to get the graphic location of a peg given its row and column
function getGraphicLocation(col, row) {
    const x = col * X_MOVEMENT / 2 + (NUM_LEVELS - row - 1) * X_MOVEMENT + PADDING;
    const y = row * Y_MOVEMENT + PADDING;
    return { x, y };
}

// Helper function to create a circle SVG element
function createCircle(cx, cy, r, fill, stroke, parent) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', fill);
    circle.setAttribute('stroke', stroke);
    parent.appendChild(circle);
    return circle;
}

// Helper function to create a rectangle SVG element
function createRect(x, y, width, height, fill, stroke, parent) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    rect.setAttribute('fill', fill);
    rect.setAttribute('stroke', stroke);
    parent.appendChild(rect);
    return rect;
}

// Helper function to move a circle SVG element to a new position
function moveCircleTo(circle, x, y, duration) {
    return new Promise((resolve) => {
        const startX = parseFloat(circle.getAttribute('cx'));
        const startY = parseFloat(circle.getAttribute('cy'));
        const dx = x - startX;
        const dy = y - startY;
        const startTime = performance.now();

        function animate(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = easeOutQuad(progress);
            const newX = startX + dx * easeProgress;
            const newY = startY + dy * easeProgress;
            circle.setAttribute('cx', newX);
            circle.setAttribute('cy', newY);
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }

        requestAnimationFrame(animate);
    });
}

// Helper function to change the height of a rectangle SVG element
function changeHeightTo(rect, newHeight, duration) {
    return new Promise((resolve) => {
        const startHeight = parseFloat(rect.getAttribute('height'));
        const dy = newHeight - startHeight;
        const startTime = performance.now();

        function animate(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = easeInQuad(progress);
            const newHeight = startHeight + dy * easeProgress;
            rect.setAttribute('height', newHeight);
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }

        requestAnimationFrame(animate);
    });
}

// Easing functions
function easeInQuad(t) { return t * t; }
function easeOutQuad(t) { return t * (2 - t); }

// Function to pause execution for a given amount of time
function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Redraw the board
function redrawBoard() {
    drawBoard();
}

// Initialize the board on page load
window.onload = function () {
    drawBoard();
};
