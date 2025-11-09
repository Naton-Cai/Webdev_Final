function changeTheme(theme) {
    const htmlElement = document.documentElement;
    const icon = document.querySelector('#dark_mode_icon');
    const toggle = document.getElementById('theme-toggle');

    htmlElement.setAttribute('data-bs-theme', theme);

    // update the icon and then enforce toggle state
    if (theme === 'dark') {
        icon.classList.add('bi-moon-stars');
        icon.classList.remove('bi-brightness-high');
        toggle.checked= true;
        
    } else {
        icon.classList.add('bi-brightness-high');
        icon.classList.remove('bi-moon-stars');
        toggle.checked= false;
    }
}

//load saved theme from localStorage on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    changeTheme(savedTheme);
} else {
    //detect system preference if no saved theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    changeTheme(prefersDark ? 'dark' : 'light');
}

//toggle theme on button click
document.getElementById('theme-toggle').addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    changeTheme(newTheme);

    //save preference to localStorage
    localStorage.setItem('theme', newTheme); 
});
