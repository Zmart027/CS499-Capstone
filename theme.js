
const themeToggle = document.getElementById('theme-toggle');

function getPreferredTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    if (themeToggle) {
        const isDark = theme === 'dark';

        themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        themeToggle.setAttribute('aria-pressed', String(isDark));
    }
}

applyTheme(getPreferredTheme());

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme =
            document.documentElement.getAttribute('data-theme');

        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

        localStorage.setItem('portfolio-theme', nextTheme);
        applyTheme(nextTheme);
    });
}
