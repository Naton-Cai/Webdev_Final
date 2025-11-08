    document.getElementById('theme-toggle').addEventListener('click', function() {
        let icon = document.querySelector('#dark_mode_icon');
        const htmlElement = document.documentElement;
        if (htmlElement.getAttribute('data-bs-theme') === 'dark') {
            htmlElement.setAttribute('data-bs-theme', 'light');
            icon.classList.add('bi-brightness-high')
            icon.classList.remove('bi-moon-stars')
        } else {
            htmlElement.setAttribute('data-bs-theme', 'dark');

            icon.classList.add('bi-moon-stars')
            icon.classList.remove('bi-brightness-high')
        }
    });