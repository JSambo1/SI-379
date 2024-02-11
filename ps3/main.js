document.addEventListener('DOMContentLoaded', function () {
    let events = [];
    let selectedIndex = 0;
    let timerId;

    function setSelectedIndex(index) {
        selectedIndex = index;
        updateDetails();
        updateThumbnails();
        resetTimer(selectedIndex);
    }

    function updateDetails() {
        const selectedEvent = events[selectedIndex];
        document.getElementById('selected-title').textContent = selectedEvent.event_title;
        document.getElementById('selected-title').href = selectedEvent.permalink;
        document.getElementById('selected-image').src = selectedEvent.image_url;
        document.getElementById('selected-date').textContent = getReadableTime(selectedEvent.datetime_start);
        document.getElementById('selected-description').textContent = selectedEvent.description;
    }

    function updateThumbnails() {
        const thumbnailsContainer = document.getElementById('thumbnails');
        thumbnailsContainer.innerHTML = ''; // Clear previous thumbnails
        events.forEach((event, index) => {
            const img = document.createElement('img');
            img.src = event.styled_images.event_thumb;
            img.addEventListener('click', () => setSelectedIndex(index));
            if (index === selectedIndex) {
                img.classList.add('selected');
            }
            thumbnailsContainer.appendChild(img);
        });
    }
    
    function resetTimer(index) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            setSelectedIndex((selectedIndex + 1) % events.length);
        }, 10000); // 10 seconds
    }

    function getUMEventsWithImages(callback) {
        getUMEvents(function (eventData) {
            const eventsWithImages = eventData.filter(event => event.image_url);
            callback(eventsWithImages);
        });
    }

    getUMEventsWithImages(function (data) {
        events = data;
        setSelectedIndex(0); // Initialize with the first event
    });
});

