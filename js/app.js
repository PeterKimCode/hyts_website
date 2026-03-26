class App {
    constructor() {
        this.appRoot = document.getElementById('app-root');
        this.tmplHome = document.getElementById('tmpl-home').content;
        this.tmplPage = document.getElementById('tmpl-page').content;

        // Listen for hash changes to simulate routing
        window.addEventListener('hashchange', () => this.handleRoute());

        // Initial render
        this.handleRoute();

        // Reveal effect for smooth transition between views
        this.appRoot.addEventListener('animationend', (e) => {
            if (e.animationName === 'fadeIn') {
                this.appRoot.classList.remove('fade-in');
            }
        });
    }

    navigate(path) {
        window.location.hash = '#' + path;
    }

    handleRoute() {
        // Trigger reveal animation
        this.appRoot.classList.remove('fade-in');
        void this.appRoot.offsetWidth; // trigger reflow
        this.appRoot.classList.add('fade-in');

        const hash = window.location.hash.substring(1) || 'home';
        
        // Scroll to top when routing
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.appRoot.innerHTML = ''; // clear current

        if (hash === 'home') {
            const clone = document.importNode(this.tmplHome, true);
            this.appRoot.appendChild(clone);
        } else if (siteData[hash]) {
            const clone = document.importNode(this.tmplPage, true);
            
            // Populate dynamic content
            clone.getElementById('page-title').textContent = siteData[hash].title;
            clone.getElementById('page-content').innerHTML = siteData[hash].html;
            
            this.appRoot.appendChild(clone);
        } else {
            // 404 / Missing Content or just #empty links
            const clone = document.importNode(this.tmplPage, true);
            clone.getElementById('page-title').textContent = '준비 중입니다';
            clone.getElementById('page-content').innerHTML = '<div class="content-body"><p>해당 내용은 현재 준비 중입니다.</p><a href="#home" style="color:var(--primary-blue); font-weight:600;">홈으로 돌아가기</a></div>';
            this.appRoot.appendChild(clone);
        }
        
    }
}

// Global expose for inline onclick handlers if needed
window.app = new App();
