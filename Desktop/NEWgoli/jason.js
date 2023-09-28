document.addEventListener('DOMContentLoaded', function () {
    const morningCheckbox = document.getElementById('morningMedication');
    const nightCheckbox = document.getElementById('nightMedication');
    const submitButton = document.getElementById('submit');
    const statusElement = document.getElementById('status');
    const morningTimestamp = document.getElementById('morningTimestamp');
    const nightTimestamp = document.getElementById('nightTimestamp');

    // Function to update the timestamp and display it
    function updateTimestamp(checkbox, timestampElement) {
        const now = new Date();
        const timestamp = checkbox.checked ? `Taken at ${now.toLocaleTimeString()}` : '';
        timestampElement.textContent = timestamp;

        // Save the timestamp to Local Storage
        localStorage.setItem(`${checkbox.id}Timestamp`, timestamp);
    }

    // Function to reset timestamps and checkboxes at 11:59 PM
    function resetAtMidnight() {
        const now = new Date();
        if (now.getHours() === 23 && now.getMinutes() === 59) {
            morningCheckbox.checked = false;
            nightCheckbox.checked = false;
            updateTimestamp(morningCheckbox, morningTimestamp);
            updateTimestamp(nightCheckbox, nightTimestamp);
        }
    }

    // Check for midnight reset every second
    setInterval(resetAtMidnight, 1000);

    // Load checkbox states and timestamps from Local Storage
    morningCheckbox.checked = JSON.parse(localStorage.getItem('morningCheckboxState')) || false;
    nightCheckbox.checked = JSON.parse(localStorage.getItem('nightCheckboxState')) || false;
    morningTimestamp.textContent = localStorage.getItem('morningMedicationTimestamp') || '';
    nightTimestamp.textContent = localStorage.getItem('nightMedicationTimestamp') || '';

    // Event listener for morning checkbox
    morningCheckbox.addEventListener('change', function () {
        updateTimestamp(morningCheckbox, morningTimestamp);
        // Save morning checkbox state to Local Storage
        localStorage.setItem('morningCheckboxState', JSON.stringify(morningCheckbox.checked));
    });

    // Event listener for night checkbox
    nightCheckbox.addEventListener('change', function () {
        updateTimestamp(nightCheckbox, nightTimestamp);
        // Save night checkbox state to Local Storage
        localStorage.setItem('nightCheckboxState', JSON.stringify(nightCheckbox.checked));
    });

    submitButton.addEventListener('click', function () {
        // The medication status text is updated when the checkboxes change state.
    });
});


   





