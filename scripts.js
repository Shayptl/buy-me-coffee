// Support button functionality
document.getElementById('supportBtn').addEventListener('click', function (e) {
    e.preventDefault();
    window.open('https://payboxapp.page.link/i2SHpW8eaVouHeLo8', '_blank');
});

// Floating support button functionality
const floatingBtn = document.getElementById('floatingSupportBtn');
const mainSupportBtn = document.getElementById('supportBtn');

floatingBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.open('https://payboxapp.page.link/i2SHpW8eaVouHeLo8', '_blank');
});

window.addEventListener('scroll', function () {
    const mainBtnRect = mainSupportBtn.getBoundingClientRect();
    if (mainBtnRect.top <= window.innerHeight && mainBtnRect.bottom >= 0) {
        floatingBtn.style.opacity = '0';
        floatingBtn.style.pointerEvents = 'none';
    } else {
        floatingBtn.style.opacity = '1';
        floatingBtn.style.pointerEvents = 'auto';
    }
});

// קרוסלת פידבקים

// קריאת לגוגל סקריפט לקבלת נתונים מאיירטייבל
async function fetchTestimonials() {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw83DMuYXyTuCsBnH0s_uOiiRvn1UnqOYMUny-z2gJ8vWN0Egq3rNz_YN5vNAssLxSQ/exec';
    const SECRET_KEY = '162bbasdkovj3432432!!@csc';

    const url = `${SCRIPT_URL}?key=${SECRET_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
        console.error('Error fetching testimonials:', data.error);
        return [];
    }

    return data;
}

let currentTestimonial = 0;
let testimonialContainer;
let intervalId;

function createTestimonialElement(testimonial) {
    const element = document.createElement('div');
    element.className = 'testimonial';
    const defaultProfilePic = 'https://i.ibb.co/ByssB3y/image.png';
    const profilePicSrc = testimonial.profilePic || defaultProfilePic;
    element.innerHTML = `
        <p class="testimonial-text">${testimonial.text}</p>
        <div class="testimonial-author-container">
            <img src="${profilePicSrc}" alt="תמונת פרופיל של ${testimonial.author.split(',')[0]}" class="profile-pic">
            <p class="testimonial-author">${testimonial.author}, ${testimonial.description}</p>
        </div>
    `;
    return element;
}

async function initializeTestimonials() {
    testimonialContainer = document.querySelector('.testimonial-container');
    const loadingContainer = document.querySelector('.loading-container');
    let testimonials;

    try {
        testimonials = await fetchTestimonials();
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        testimonials = []; // Use an empty array if fetch fails
    }

    if (testimonials.length === 0) {
        // אם אין נתונים מהסקריפט, השתמש בנתונים הסטטיים
        testimonials = testimonialsData;
    }

    testimonials.forEach(testimonial => {
        testimonialContainer.appendChild(createTestimonialElement(testimonial));
    });

    // Hide loading spinner and show testimonials
    loadingContainer.style.display = 'none';
    testimonialContainer.style.display = 'flex';

    showTestimonial(0);

    // התחלת הקרוסלה האוטומטית
    intervalId = setInterval(() => changeTestimonial(1), 5000);
}

function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
    testimonialContainer.style.transform = `translateX(${index * 100}%)`;
}

function changeTestimonial(direction) {
    const testimonials = document.querySelectorAll('.testimonial');
    currentTestimonial = (currentTestimonial + direction + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTestimonials();

    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    prevBtn.addEventListener('click', () => {
        clearInterval(intervalId);
        changeTestimonial(1);
        intervalId = setInterval(() => changeTestimonial(1), 5000);
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(intervalId);
        changeTestimonial(-1);
        intervalId = setInterval(() => changeTestimonial(-1), 5000);
    });
});


// Social media links
document.getElementById('facebookLink').addEventListener('click', function (e) {
    e.preventDefault();
    window.open('https://www.facebook.com/ShayDigitalServices', '_blank');
});

document.getElementById('whatsappShare').addEventListener('click', function (e) {
    e.preventDefault();
    const shareText = 'היי, אני כבר פרגנתי לשי על העזרה שלו לקהילה שלנו, מזמין גם אותך לפרגן בשיטת Buy me coffee ' + 'https://shayptl.github.io/buy-me-coffee';
    const whatsappUrl = 'https://wa.me/?text=' + encodeURIComponent(shareText);
    window.open(whatsappUrl, '_blank');
});

// Feedback form submission
document.getElementById('feedbackForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const profession = document.getElementById('profession').value;
    const feedback = document.getElementById('feedback').value;

    const formData = {
        name: name,
        phone: phone,
        profession: profession,
        feedback: feedback
    };

    fetch('https://hook.integrator.boost.space/zd1hat1kl46d46kf03fgqs2a3jarx8wq', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                this.reset();
                alert('תודה על הפירגון!');
            } else {
                throw new Error('בעיה בשליחת הטופס');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('אירעה שגיאה בשליחת הטופס. נא נסה שוב מאוחר יותר.');
        });
});
