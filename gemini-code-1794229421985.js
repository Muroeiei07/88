document.addEventListener('DOMContentLoaded', () => {
    // 1. ปี ค.ศ. ท้ายเว็บ
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 2. เอฟเฟกต์พิมพ์ดีด
    const typeWriterElement = document.querySelector('.typewriter-text');
    const introText = "您好，我是清越，我对写代码很感兴趣。";
    let index = 0;

    const typeWriter = () => {
        if (index < introText.length) {
            typeWriterElement.textContent += introText.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    };
    setTimeout(typeWriter, 500);

    // 3. เลื่อนหน้าจอแล้วองค์ประกอบค่อยๆ โผล่ขึ้นมา
    const revealElements = document.querySelectorAll('.reveal');
    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 60) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // 4. แอนิเมชันหลอดความก้าวหน้า (Progress Bar)
    const progressBar = document.getElementById('skill-progress');
    const skillsSection = document.getElementById('skills');
    let animated = false;

    const checkProgressAnimation = () => {
        if (skillsSection && progressBar && !animated) {
            const rect = skillsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                progressBar.style.width = '35%';
                animated = true;
            }
        }
    };
    window.addEventListener('scroll', checkProgressAnimation);
    checkProgressAnimation();

    // 5. อนุภาคดาวน้ำเงินลอยเป็นพื้นหลัง (Canvas)
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const count = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4
            });
        }

        const renderCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#38bdf8';

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(renderCanvas);
        };
        renderCanvas();
    }
});