// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Toggle Elements
    const toggleIngredientsBtn = document.getElementById('toggle-ingredients');
    const ingredientsList = document.querySelector('.ingredients');

    const toggleStepsBtn = document.getElementById('toggle-steps');
    const stepsList = document.querySelector('.steps');

    // Cooking Steps Elements
    const startCookingBtn = document.getElementById('start-cooking');
    const nextStepBtn = document.getElementById('next-step');
    const steps = document.querySelectorAll('.steps li');
    const progressBar = document.getElementById('progress-bar');

    // Timer Elements
    const timerContainer = document.getElementById('timer-container');
    const timerDisplay = document.getElementById('timer');
    let timerInterval;
    let totalTime = 3600; // Total preparation time in seconds (1 hour)

    // Current Step Tracker
    let currentStep = -1;

    /**
     * Function to Toggle Visibility of Ingredients
     */
    toggleIngredientsBtn.addEventListener('click', () => {
        ingredientsList.classList.toggle('show');
        toggleIngredientsBtn.textContent = ingredientsList.classList.contains('show') ? 'Hide Ingredients' : 'Show Ingredients';
    });

    /**
     * Function to Toggle Visibility of Steps
     */
    toggleStepsBtn.addEventListener('click', () => {
        stepsList.classList.toggle('show');
        toggleStepsBtn.textContent = stepsList.classList.contains('show') ? 'Hide Steps' : 'Show Steps';
    });

    /**
     * Function to Start Cooking Process
     */
    startCookingBtn.addEventListener('click', () => {
        // Prevent multiple intervals
        if (timerInterval) clearInterval(timerInterval);

        // Reset previous steps
        resetSteps();

        // Initialize current step
        currentStep = 0;
        highlightStep(currentStep);
        nextStepBtn.classList.remove('hidden');

        // Start Timer
        startTimer(totalTime);
    });

    /**
     * Function to Handle Next Step Action
     */
    nextStepBtn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            // Remove highlight from current step
            removeHighlight(currentStep);
            // Move to next step
            currentStep++;
            highlightStep(currentStep);
        } else {
            // All steps completed
            alert('Congratulations! You have completed all the steps.');
            nextStepBtn.classList.add('hidden');
            // Optionally, stop the timer if it's still running
            if (timerInterval) clearInterval(timerInterval);
        }
    });

    /**
     * Function to Highlight a Specific Step
     * @param {number} step - The index of the step to highlight
     */
    function highlightStep(step) {
        steps[step].classList.add('current-step');
        // Update Progress Bar
        const progress = ((step + 1) / steps.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    /**
     * Function to Remove Highlight from a Specific Step
     * @param {number} step - The index of the step to remove highlight from
     */
    function removeHighlight(step) {
        steps[step].classList.remove('current-step');
    }

    /**
     * Function to Reset All Steps and Progress
     */
    function resetSteps() {
        steps.forEach(step => step.classList.remove('current-step'));
        progressBar.style.width = '0%';
    }

    /**
     * Function to Start the Countdown Timer
     * @param {number} duration - Total time in seconds
     */
    function startTimer(duration) {
        let time = duration;
        timerContainer.classList.remove('hidden');
        updateTimerDisplay(time);

        timerInterval = setInterval(() => {
            time--;
            updateTimerDisplay(time);

            if (time <= 0) {
                clearInterval(timerInterval);
                alert('Time is up! Your recipe is ready.');
            }
        }, 1000);
    }

    /**
     * Function to Update the Timer Display
     * @param {number} time - Remaining time in seconds
     */
    function updateTimerDisplay(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`;
    }

    /**
     * Helper Function to Pad Single Digit Numbers with Leading Zero
     * @param {number} num - The number to pad
     * @returns {string} - Padded number as a string
     */
    function pad(num) {
        return num < 10 ? '0' + num : num.toString();
    }

    /**
     * Optional: Reset Timer and Steps When Page Loads or Reloads
     */
    // Uncomment the following lines if you want to reset everything on page load
     resetSteps();
     timerContainer.classList.add('hidden');
     nextStepBtn.classList.add('hidden');
});
