document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const navLinks = document.querySelectorAll('.sidebar nav ul li');
    const notificationsIcon = document.querySelector('.notifications-icon');
    const notificationsBadge = document.querySelector('.notification-badge');
    const profileDropdown = document.querySelector('.profile-dropdown');

    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 1024 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Navigation Active State
    navLinks.forEach((link, index) => {
        link.style.setProperty('--i', index + 1);
        
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Theme Toggle
    function toggleTheme() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        
        // Update localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // Animate theme toggle icon
        if (isDarkMode) {
            themeIcon.classList.remove('bx-sun');
            themeIcon.classList.add('bx-moon');
            themeIcon.style.animation = 'moonGlow 2s infinite alternate';
        } else {
            themeIcon.classList.remove('bx-moon');
            themeIcon.classList.add('bx-sun');
            themeIcon.style.animation = 'none';
        }
    }

    themeToggle.addEventListener('click', toggleTheme);

    // Restore theme preference with smooth transition
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
    }

    // Notifications Interaction
    notificationsIcon.addEventListener('click', () => {
        notificationsBadge.textContent = '0';
        notificationsIcon.classList.toggle('active');
    });

    // Profile Dropdown
    profileDropdown.addEventListener('click', () => {
        const profileWrapper = profileDropdown.closest('.profile-wrapper');
        profileWrapper.classList.toggle('dropdown-active');
    });

    // Responsive Handling
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            sidebar.classList.remove('active');
        }
    });

    
});