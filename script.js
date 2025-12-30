// Tab Switching
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Favorite Buttons
function initFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            button.classList.toggle('active');
            
            // Change icon color or style when favorited
            const icon = button.querySelector('.favorite-icon');
            if (button.classList.contains('active')) {
                icon.style.filter = 'brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(7482%) hue-rotate(347deg) brightness(96%) contrast(101%)';
            } else {
                icon.style.filter = '';
            }
        });
    });
}

// Gallery Image Switching
function initGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');

    if (!mainImage) return;

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const imagePath = thumbnail.getAttribute('data-image');
            
            if (imagePath) {
                mainImage.src = imagePath;
                
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            }
        });
    });
}

// Search Functionality
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInputs = document.querySelectorAll('.search-input, .search-select');

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchData = {
                area: searchInputs[0]?.value || '',
                keyword: searchInputs[1]?.value || '',
                time: searchInputs[2]?.value || '',
                date: searchInputs[3]?.value || '',
                people: searchInputs[4]?.value || ''
            };
            
            console.log('検索条件:', searchData);
            // Here you would typically make an API call or navigate to search results
            alert('検索機能: ' + JSON.stringify(searchData, null, 2));
        });
    }

    // Allow Enter key to trigger search
    searchInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchBtn) {
                searchBtn.click();
            }
        });
    });
}

// Reservation Form
function initReservationForm() {
    const reservationBtn = document.querySelector('.reservation-submit-btn');
    
    if (reservationBtn) {
        reservationBtn.addEventListener('click', () => {
            const people = document.querySelector('.form-select')?.value || '';
            const time = document.querySelectorAll('.form-select')[1]?.value || '';
            const selectedDate = document.querySelector('.calendar-day.selected')?.textContent || '';
            
            console.log('予約情報:', { people, time, date: selectedDate });
            alert('予約へ進む: 人数=' + people + ', 時間=' + time + ', 日付=' + selectedDate);
        });
    }
}

// Calendar
function initCalendar() {
    const calendarDays = document.getElementById('calendar-days');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const calendarMonth = document.querySelector('.calendar-month');

    if (!calendarDays) return;

    let currentDate = new Date(2026, 1, 1); // February 2026
    const availableDates = [14, 15, 16, 17, 21, 22, 23, 24, 28, 29]; // Available dates in February

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();

        if (calendarMonth) {
            calendarMonth.textContent = `${year}年 ${month + 1}月`;
        }

        calendarDays.innerHTML = '';

        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = document.createElement('div');
            day.className = 'calendar-day other-month';
            day.textContent = prevMonthDays - i;
            calendarDays.appendChild(day);
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day';
            day.textContent = i;

            if (availableDates.includes(i)) {
                day.classList.add('available');
            }

            day.addEventListener('click', () => {
                document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                day.classList.add('selected');
            });

            calendarDays.appendChild(day);
        }

        // Next month days (fill remaining cells)
        const remainingCells = 42 - (firstDay + daysInMonth);
        for (let i = 1; i <= remainingCells && i <= 7; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day other-month';
            day.textContent = i;
            calendarDays.appendChild(day);
        }
    }

    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }

    // Set initial selected date (February 15)
    renderCalendar();
    setTimeout(() => {
        const day15 = Array.from(calendarDays.querySelectorAll('.calendar-day')).find(day => 
            day.textContent === '15' && !day.classList.contains('other-month')
        );
        if (day15) {
            day15.classList.add('selected');
        }
    }, 100);
}

// Chatbot Widget
function initChatbot() {
    const chatbotWidget = document.querySelector('.chatbot-widget');
    
    if (chatbotWidget) {
        chatbotWidget.addEventListener('click', () => {
            alert('AI飲食店検索チャットボットを開きます');
            // Here you would typically open a chat interface
        });
    }
}

// Restaurant Card Click
function initRestaurantCards() {
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    
    restaurantCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't navigate if clicking on favorite button
            if (e.target.closest('.favorite-btn')) {
                return;
            }
            
            // Navigate to store details page
            window.location.href = 'store-details.html';
        });
    });
}

// Banner Slider
function initBannerSlider() {
    const slides = document.querySelectorAll('.banner-slide');
    const textContents = document.querySelectorAll('.banner-text-content');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    const slideInterval = 5000; // 5秒ごとに切り替え

    function showSlide(index) {
        // Remove active class from all slides, text contents and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        textContents.forEach(content => content.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide, text content and indicator
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (textContents[index]) {
            textContents[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto slide
    let slideTimer = setInterval(nextSlide, slideInterval);

    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            // Reset timer when manually switching
            clearInterval(slideTimer);
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    });

    // Pause on hover (optional)
    const heroBanner = document.querySelector('.hero-banner');
    if (heroBanner) {
        heroBanner.addEventListener('mouseenter', () => {
            clearInterval(slideTimer);
        });
        heroBanner.addEventListener('mouseleave', () => {
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initFavoriteButtons();
    initGallery();
    initSearch();
    initReservationForm();
    initCalendar();
    initChatbot();
    initRestaurantCards();
    initBannerSlider();
});


