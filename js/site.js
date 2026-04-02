(() => {
    const consultForm = document.querySelector('[data-consult-form]');

    if (!consultForm) {
        return;
    }

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
})();
