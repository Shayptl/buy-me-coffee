// Groups page functionality

// Same configuration as main page
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw83DMuYXyTuCsBnH0s_uOiiRvn1UnqOYMUny-z2gJ8vWN0Egq3rNz_YN5vNAssLxSQ/exec';
const SECRET_KEY = '162bbasdkovj3432432!!@csc';

// Fetch groups from Google Script
async function fetchGroups() {
    try {
        const url = `${SCRIPT_URL}?key=${SECRET_KEY}&endpoint=groups`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error('Error fetching groups:', data.error);
            return [];
        }

        return data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        return [];
    }
}

// Check honeypot field for bot detection
function isBot() {
    const honeypot = document.getElementById('website');
    return honeypot && honeypot.value.trim() !== '';
}

// Create group card element
function createGroupCard(group) {
    const defaultLogo = 'https://i.ibb.co/f8XrnHj/image.png'; // Same as site favicon
    const logoSrc = group.logoUrl || defaultLogo;

    const card = document.createElement('div');
    card.className = 'group-card fadeInUp';

    card.innerHTML = `
        <div class="group-header">
            <img src="${logoSrc}" alt="לוגו ${group.name}" class="group-logo" onerror="this.src='${defaultLogo}'">
            <div class="group-title-container">
                <h3 class="group-name">${group.name} <span class="group-description-inline">${group.description}</span></h3>
            </div>
        </div>
        ${group.category ? `<div class="group-category">${group.category}</div>` : ''}
        <button class="group-join-btn" data-whatsapp-link="${group.whatsappLink}" data-group-name="${group.name}">
            <i class="fab fa-whatsapp"></i>
            הצטרפות לקבוצה
        </button>
    `;

    return card;
}

// Handle group join with bot detection
function joinGroup(whatsappLink, groupName) {
    // Check if user is a bot using honeypot
    if (isBot()) {
        console.log('Bot detected, blocking access');
        alert('אירעה שגיאה. אנא נסה שוב מאוחר יותר.');
        return;
    }

    // Log the join attempt (optional)
    console.log(`User joining group: ${groupName}`);

    // Add small delay to make it feel more natural
    setTimeout(() => {
        window.open(whatsappLink, '_blank');
    }, 100);
}

// Initialize groups page
async function initializeGroupsPage() {
    const loadingContainer = document.querySelector('.loading-container');
    const groupsContainer = document.querySelector('.groups-container');
    const noGroupsContainer = document.querySelector('.no-groups');

    try {
        const groups = await fetchGroups();

        // Hide loading spinner
        loadingContainer.style.display = 'none';

        if (groups.length === 0) {
            // Show no groups message
            noGroupsContainer.style.display = 'block';
            return;
        }

        // Create and append group cards
        groups.forEach((group, index) => {
            const card = createGroupCard(group);
            // Add staggered animation delay
            card.style.animationDelay = `${(index * 0.1) + 0.2}s`;
            groupsContainer.appendChild(card);
        });

        // Show groups container
        groupsContainer.style.display = 'grid';

    } catch (error) {
        console.error('Error initializing groups page:', error);
        loadingContainer.style.display = 'none';
        noGroupsContainer.style.display = 'block';
    }
}

// Enhanced error handling for images
function handleImageError(img) {
    const defaultLogo = 'https://i.ibb.co/f8XrnHj/image.png';
    if (img.src !== defaultLogo) {
        img.src = defaultLogo;
    }
}

// Add global error handler for group logos
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the groups page
    initializeGroupsPage();

    // Add click tracking for analytics and handle group join clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('group-join-btn') || e.target.closest('.group-join-btn')) {
            const button = e.target.classList.contains('group-join-btn') ? e.target : e.target.closest('.group-join-btn');
            const whatsappLink = button.getAttribute('data-whatsapp-link');
            const groupName = button.getAttribute('data-group-name');

            if (whatsappLink && groupName) {
                console.log(`Group join button clicked: ${groupName}`);
                joinGroup(whatsappLink, groupName);
            }
        }
    });

    // Social media links functionality
    const facebookLink = document.getElementById('facebookLink');
    const whatsappShare = document.getElementById('whatsappShare');

    if (facebookLink) {
        facebookLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.open('https://www.facebook.com/ShayDigitalServices', '_blank');
        });
    }

    const youtubeLink = document.getElementById('youtubeLink');
    if (youtubeLink) {
        youtubeLink.addEventListener('click', function (e) {
            e.preventDefault();
            // TODO: Replace with actual YouTube channel link when provided
            window.open('https://www.youtube.com/@shaydigitalservices', '_blank');
        });
    }

    if (whatsappShare) {
        whatsappShare.addEventListener('click', function (e) {
            e.preventDefault();
            const shareText = 'היי, אני בקבוצות הווצאפ של שי ומקבל עזרה מעולה! מזמין גם אותך להצטרף ' + 'https://shayptl.github.io/buy-me-coffee/groups';
            const whatsappUrl = 'https://wa.me/?text=' + encodeURIComponent(shareText);
            window.open(whatsappUrl, '_blank');
        });
    }

    // Channel join functionality
    const joinChannelBtn = document.getElementById('joinChannelBtn');
    if (joinChannelBtn) {
        joinChannelBtn.addEventListener('click', function (e) {
            e.preventDefault();
            // TODO: Replace with actual channel link when provided
            const channelLink = 'https://whatsapp.com/channel/0029VaN1jLe6wZQ9C2U3dU16';
            window.open(channelLink, '_blank');
        });
    }

    // Floating home button functionality
    const floatingBtn = document.querySelector('.btn-floating-home');
    
    // Show/hide floating button based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            floatingBtn.style.opacity = '1';
            floatingBtn.style.pointerEvents = 'auto';
        } else {
            floatingBtn.style.opacity = '0.7';
            floatingBtn.style.pointerEvents = 'auto';
        }
    });
});


// Share group functionality (optional for future)
function shareGroup(groupName, groupLink) {
    const shareText = `הצטרפו אליי לקבוצת ${groupName} של שי!`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + groupLink)}`;
    window.open(shareUrl, '_blank');
}

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Allow Enter key to trigger group join
    if (e.key === 'Enter' && e.target.classList.contains('group-join-btn')) {
        e.target.click();
    }
});
