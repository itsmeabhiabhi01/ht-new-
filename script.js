const navbarToggle = document.getElementById('navbar-toggle');
const sidebar = document.getElementById('sidebar');
const closeSidebarBtn = document.getElementById('close-sidebar-btn');
const mainContent = document.getElementById('main-content');
const feedContent = document.getElementById('feed-content');
const darkModeBtn = document.getElementById('dark-mode-btn');
const lightModeBtn = document.getElementById('light-mode-btn');
const realModeBtn = document.getElementById('real-mode-btn');
const stopAnimationBtn = document.getElementById('stop-animation-btn');
const colorPickerBtn = document.getElementById('color-picker-btn');
const colorPicker = document.getElementById('color-picker');
const allButton = document.getElementById('all-button');
const categoryButtons = document.getElementById('category-buttons');
const createRoomBtn = document.getElementById('create-room-btn');
const createRoomModal = document.getElementById('create-room-modal');
const modalOverlay = document.getElementById('modal-overlay');
const createButton = document.getElementById('create-button');
const roomMaxPeople = document.getElementById('room-max-people');
const customMax = document.getElementById('custom-max');
const searchInput = document.getElementById('search-input');
const roomGrid = document.getElementById('room-grid');
const plusButton = document.getElementById('plus-button');
const privacyBtn = document.getElementById('privacy-btn');
const homeBtn = document.getElementById('home-btn');
const feedBtn = document.getElementById('feed-btn');
const backHomeBtn = document.getElementById('back-home-btn');

const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Japanese', 'Chinese', 'Korean', 'Russian', 'Arabic',
    'Portuguese', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Punjabi', 'Urdu', 'Kannada',
    'Malayalam', 'Odia', 'Assamese', 'Vietnamese', 'Thai', 'Dutch', 'Swedish', 'Turkish', 'Polish', 'Hebrew'
];

const profileImages = [
    'https://randomuser.me/api/portraits/women/65.jpg',
    'https://randomuser.me/api/portraits/women/45.jpg',
    'https://randomuser.me/api/portraits/women/35.jpg',
    'https://randomuser.me/api/portraits/women/15.jpg',
    'https://randomuser.me/api/portraits/men/75.jpg',
    'https://randomuser.me/api/portraits/men/85.jpg',
    'https://randomuser.me/api/portraits/women/70.jpg',
    'https://randomuser.me/api/portraits/women/60.jpg',
    'https://randomuser.me/api/portraits/men/80.jpg',
    'https://randomuser.me/api/portraits/men/90.jpg'
];

let animationStopped = false;

// Initialize language buttons
function initLanguageButtons() {
    categoryButtons.innerHTML = '';
    for (let i = 0; i < languages.length; i += 10) {
        const row = document.createElement('div');
        row.className = 'language-row';
        const rowLanguages = languages.slice(i, i + 10);
        rowLanguages.forEach(lang => {
            const button = document.createElement('button');
            button.textContent = lang;
            button.addEventListener('click', () => {
                categoryButtons.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterRoomsByLanguage(lang);
            });
            row.appendChild(button);
        });
        categoryButtons.appendChild(row);
    }
}

// Filter rooms by language
function filterRoomsByLanguage(language) {
    const rooms = document.querySelectorAll('.room-card');
    rooms.forEach(room => {
        const title = room.querySelector('.room-title').textContent.toLowerCase();
        if (title === language.toLowerCase()) {
            room.style.display = 'flex';
        } else {
            room.style.display = 'none';
        }
    });
}

// Randomly assign profile pictures to rooms
function assignRandomProfiles() {
    const rooms = ['english', 'spanish', 'french', 'german', 'japanese', 'korean', 'hindi', 'arabic', 'portuguese'];
    rooms.forEach(room => {
        const peopleRow = document.getElementById(`${room}-people`);
        peopleRow.innerHTML = '<div></div><div></div>';
        const firstRow = peopleRow.children[0];
        const secondRow = peopleRow.children[1];
        const numPeople = Math.floor(Math.random() * 7) + 4;
        const shuffledImages = profileImages.sort(() => 0.5 - Math.random());
        for (let i = 0; i < numPeople; i++) {
            const img = document.createElement('img');
            img.className = 'profile-pic';
            if (Math.random() < 0.2) img.classList.add('premium');
            img.src = shuffledImages[i];
            if (i < 5) {
                firstRow.appendChild(img);
            } else {
                secondRow.appendChild(img);
            }
        }
    });
}

// Toggle sidebar
function toggleSidebar() {
    sidebar.classList.toggle('active');
    if (window.innerWidth > 768) {
        mainContent.classList.toggle('shifted');
        feedContent.classList.toggle('shifted');
    }
}

// Show feed
function showFeed() {
    mainContent.classList.add('hidden');
    feedContent.classList.add('active');
    toggleSidebar();
}

// Show home
function showHome() {
    mainContent.classList.remove('hidden');
    feedContent.classList.remove('active');
    document.querySelectorAll('.room-card').forEach(room => {
        room.style.display = 'flex';
    });
    categoryButtons.classList.remove('active');
    allButton.classList.remove('active');
    toggleSidebar();
}

navbarToggle.addEventListener('click', toggleSidebar);
closeSidebarBtn.addEventListener('click', toggleSidebar);

document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('active') && 
        !sidebar.contains(e.target) && 
        !navbarToggle.contains(e.target) && 
        window.innerWidth <= 768) {
        toggleSidebar();
    }
});

darkModeBtn.addEventListener('click', () => {
    document.body.classList.remove('light-mode', 'real-mode');
    document.body.classList.add('dark-mode');
});

lightModeBtn.addEventListener('click', () => {
    document.body.classList.remove('dark-mode', 'real-mode');
    document.body.classList.add('light-mode');
});

realModeBtn.addEventListener('click', () => {
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add('real-mode');
});

stopAnimationBtn.addEventListener('click', () => {
    animationStopped = !animationStopped;
    document.body.classList.toggle('no-animation');
    stopAnimationBtn.innerHTML = animationStopped
        ? '<i class="fas fa-play"></i> Start Animation'
        : '<i class="fas fa-pause"></i> Stop Animation';
    document.querySelectorAll('.pulsing-star, .comet').forEach(el => el.remove());
    if (!animationStopped) {
        createGalaxyEffects();
    }
});

colorPickerBtn.addEventListener('click', () => {
    colorPicker.click();
});

colorPicker.addEventListener('input', (e) => {
    document.body.style.background = e.target.value;
    document.body.classList.remove('dark-mode', 'light-mode', 'real-mode');
});

allButton.addEventListener('click', function() {
    if (categoryButtons.classList.contains('active')) {
        categoryButtons.classList.remove('active');
        allButton.classList.remove('active');
        const rooms = document.querySelectorAll('.room-card');
        rooms.forEach(room => {
            room.style.display = 'flex';
        });
    } else {
        categoryButtons.classList.add('active');
        allButton.classList.add('active');
        const rooms = document.querySelectorAll('.room-card');
        rooms.forEach(room => {
            room.style.display = 'flex';
        });
    }
});

document.querySelectorAll('.nav-buttons button:not(#all-button)').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.nav-buttons button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const rooms = document.querySelectorAll('.room-card');
        rooms.forEach(room => {
            room.style.display = 'flex';
        });
        categoryButtons.classList.remove('active');
        allButton.classList.remove('active');
    });
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const rooms = Array.from(roomGrid.children);
    rooms.forEach(room => {
        const title = room.querySelector('.room-title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            room.style.display = 'flex';
        } else {
            room.style.display = 'none';
        }
    });
});

createRoomBtn.addEventListener('click', () => {
    createRoomModal.classList.add('active');
    modalOverlay.classList.add('active');
});

plusButton.addEventListener('click', () => {
    createRoomModal.classList.add('active');
    modalOverlay.classList.add('active');
});

modalOverlay.addEventListener('click', () => {
    createRoomModal.classList.remove('active');
    modalOverlay.classList.remove('active');
});

createButton.addEventListener('click', () => {
    createRoomModal.classList.remove('active');
    modalOverlay.classList.remove('active');
});

roomMaxPeople.addEventListener('change', () => {
    customMax.classList.toggle('active', roomMaxPeople.value === 'Custom');
});

privacyBtn.addEventListener('click', () => {
    window.open('privacy.html', '_blank');
});

homeBtn.addEventListener('click', showHome);

feedBtn.addEventListener('click', showFeed);

backHomeBtn.addEventListener('click', showHome);

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.95)';
    });
    button.addEventListener('mouseup', () => {
        button.style.transform = '';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// Post button enable/disable
const textarea = document.querySelector('.feed-input textarea');
const postButton = document.querySelector('.feed-input .post-button');
textarea.addEventListener('input', () => {
    postButton.disabled = textarea.value.trim().length === 0;
});

function createGalaxyEffects() {
    if (animationStopped) return;
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'pulsing-star';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(star);
    }

    for (let i = 0; i < 5; i++) {
        const comet = document.createElement('div');
        comet.className = 'comet';
        comet.style.top = Math.random() * 50 + 'vh';
        comet.style.left = Math.random() * 50 + 'vw';
        comet.style.animationDelay = Math.random() * 10 + 's';
        document.body.appendChild(comet);
    }
}

initLanguageButtons();
createGalaxyEffects();
assignRandomProfiles();
