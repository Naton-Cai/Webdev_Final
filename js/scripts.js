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

//toggles the text and icon for each collapsing text button
[...document.getElementsByClassName('infoCollapse')].forEach(function(element){
    element.addEventListener('click', function(){
        if (element && element.getAttribute('aria-expanded') === 'true') {
            element.getElementsByClassName('collapse-bt-text')[0].innerText= 'Show Less'
            element.children[1].classList.add("bi-chevron-up");
            element.children[1].classList.remove("bi-chevron-down");
        }
        else{
        element.getElementsByClassName('collapse-bt-text')[0].innerText= 'Show More';
        element.children[1].classList.add("bi-chevron-down");
        element.children[1].classList.remove("bi-chevron-up");
        }
    });

});


//manages our contact form
const form = document.getElementById('contactForm');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    //provide our public access key
    const formData = new FormData(form);
    formData.append("access_key", "9fd1d1bb-8444-4f38-9bef-e91d61d85cf0");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});