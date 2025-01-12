if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('ServiceWorker registration successful');
        })
        .catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const loadAccessibilityFeatures = () => {
        const accessibilityToggle = document.getElementById('accessibilityToggle');
        const accessibilityMenu = document.getElementById('accessibilityMenu');
        const root = document.documentElement;
        let fontSize = 16;

        const initializeMenu = () => {
            accessibilityToggle.addEventListener('click', () => {
                const isHidden = accessibilityMenu.hidden;
                accessibilityMenu.hidden = !isHidden;
                accessibilityToggle.setAttribute('aria-expanded', !isHidden);
            });
        };

        const handleButtonState = (clickedButton) => {
            const groupButtons = clickedButton.closest('.setting-group').querySelectorAll('.control-btn');
            groupButtons.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
            clickedButton.setAttribute('aria-pressed', 'true');
        };

        const handleFontSize = (action) => {
            const actions = {
                increase: () => fontSize += 2,
                decrease: () => Math.max(12, fontSize - 2),
                reset: () => 16
            };
            fontSize = actions[action]();
            document.body.style.fontSize = `${fontSize}px`;
        };

        const handleContrast = (isHigh) => {
            document.body.classList.toggle('high-contrast', isHigh);
        };

        const handleFont = (isDyslexic) => {
            document.body.classList.toggle('dyslexic-font', isDyslexic);
        };

        const colorFilters = {
            protanopia: 'grayscale(100%)',
            deuteranopia: 'sepia(100%)',
            tritanopia: 'hue-rotate(180deg)',
            normalColor: 'none',
            normal: 'none'
        };

        const applyColorFilter = (type) => {
            document.body.style.filter = colorFilters[type] || 'none';
        };

        document.querySelectorAll('.control-btn').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                handleButtonState(button);

                switch(action) {
                    case 'increaseFont':
                        handleFontSize('increase');
                        break;
                    case 'decreaseFont':
                        handleFontSize('decrease');
                        break;
                    case 'resetFont':
                        handleFontSize('reset');
                        break;
                    case 'highContrast':
                        handleContrast(true);
                        break;
                    case 'normalContrast':
                        handleContrast(false);
                        break;
                    case 'dyslexicFont':
                        handleFont(true);
                        break;
                    case 'normalFont':
                        handleFont(false);
                        break;
                    default:
                        if (action in colorFilters) {
                            applyColorFilter(action);
                        }
                }
            });
        });

        initializeMenu();
    };

    if (document.readyState === 'complete') {
        loadAccessibilityFeatures();
    } else {
        window.addEventListener('load', loadAccessibilityFeatures);
    }
});
