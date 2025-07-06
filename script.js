gsap.registerPlugin(ScrollTrigger);

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const navbar = document.querySelector('.navbar');

function setTheme(theme) {
    htmlElement.classList.remove('light', 'dark');
    htmlElement.classList.add(theme);
    localStorage.setItem('theme', theme);
    updateThemeToggleIcon(theme);
}

function updateThemeToggleIcon(theme) {
    themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
    setTheme(currentTheme);
});

// Set initial theme to dark
setTheme('dark');

function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        if (window.innerWidth < 768) {
            toggleMenu();
        }
    });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("text-primary");
        if (link.getAttribute("href").slice(1) === current) {
            link.classList.add("text-primary");
        }
    });
});

gsap.utils.toArray('.animate-on-scroll').forEach((elem) => {
    gsap.fromTo(elem,
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

const dynamicText = document.getElementById('dynamicText');
const phrases = ['Développeur Web', 'Concepteur UI'];
let currentPhrase = 0;

function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        dynamicText.innerHTML = text.substring(0, i + 1) + '<span class="text-primary">|</span>';
        setTimeout(function () {
            typeWriter(text, i + 1, fnCallback)
        }, 100);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}

function startTextAnimation(i) {
    if (i < phrases.length) {
        typeWriter(phrases[i], 0, function () {
            setTimeout(function () {
                startTextAnimation(i + 1);
            }, 1000);
        });
    } else {
        setTimeout(function () {
            startTextAnimation(0);
        }, 1000);
    }
}

startTextAnimation(0);

function updateColors() {
    document.documentElement.style.setProperty('--primary-color', getComputedStyle(document.documentElement).getPropertyValue('--primary-color'));
    document.documentElement.style.setProperty('--secondary-color', getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'));
    document.documentElement.style.setProperty('--background-color', getComputedStyle(document.documentElement).getPropertyValue('--background-color'));
    document.documentElement.style.setProperty('--card-background', getComputedStyle(document.documentElement).getPropertyValue('--card-background'));
    document.documentElement.style.setProperty('--text-color', getComputedStyle(document.documentElement).getPropertyValue('--text-color'));
    document.documentElement.style.setProperty('--heading-color', getComputedStyle(document.documentElement).getPropertyValue('--heading-color'));
}

themeToggle.addEventListener('click', updateColors);
updateColors();