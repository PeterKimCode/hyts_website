(() => {
    const consultForm = document.querySelector('[data-consult-form]');
    const langToggle = document.querySelector('[data-lang-toggle]');
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    const STORAGE_KEY = 'hyts_lang';

    if (consultForm) {
        consultForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(consultForm);
            const name = String(formData.get('name') || '').trim();
            const phone = String(formData.get('phone') || '').trim();
            const email = String(formData.get('email') || '').trim();
            const message = String(formData.get('message') || '').trim();

            const subject = encodeURIComponent('[입학 상담 요청] 홈페이지 문의');
            const body = encodeURIComponent(
                `이름: ${name}\n연락처: ${phone}\n이메일 주소: ${email}\n문의사항:\n${message}`
            );

            window.location.href = `mailto:yjisc@naver.com?subject=${subject}&body=${body}`;
        });
    }

    dropdowns.forEach((dropdown) => {
        const summary = dropdown.querySelector('summary');
        if (!summary) return;

        summary.addEventListener('click', (event) => {
            if (window.innerWidth >= 769) {
                event.preventDefault();
            }
        });
    });

    function loadGoogleTranslate() {
        if (window.google && window.google.translate) return;
        if (document.querySelector('script[data-google-translate]')) return;

        window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'ko',
                    includedLanguages: 'en,ko',
                    autoDisplay: false,
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
                },
                'google_translate_element'
            );
        };

        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        script.dataset.googleTranslate = 'true';
        document.head.appendChild(script);
    }

    function waitForTranslateCombo(callback, attempts = 0) {
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            callback(combo);
            return;
        }
        if (attempts > 40) return;
        window.setTimeout(() => waitForTranslateCombo(callback, attempts + 1), 250);
    }

    function applyLanguage(lang) {
        loadGoogleTranslate();
        waitForTranslateCombo((combo) => {
            if (combo.value !== lang) {
                combo.value = lang;
                combo.dispatchEvent(new Event('change'));
            }
            localStorage.setItem(STORAGE_KEY, lang);
            updateToggleLabel(lang);
        });
    }

    function updateToggleLabel(lang) {
        if (!langToggle) return;
        langToggle.textContent = lang === 'en' ? 'KOR' : 'ENG';
    }

    const savedLang = localStorage.getItem(STORAGE_KEY) || 'ko';
    updateToggleLabel(savedLang);
    if (savedLang === 'en') {
        window.addEventListener('load', () => {
            window.setTimeout(() => applyLanguage('en'), 400);
        });
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const nextLang = (localStorage.getItem(STORAGE_KEY) || 'ko') === 'en' ? 'ko' : 'en';
            applyLanguage(nextLang);
        });
    }
})();
