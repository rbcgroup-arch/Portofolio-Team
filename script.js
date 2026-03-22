document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(track.children);
    const nextBtn = document.querySelector('.nav-btn.next');
    const prevBtn = document.querySelector('.nav-btn.prev');

    const modal = document.getElementById('teamModal');
    const closeBtn = document.querySelector('.close-btn');
    
    let currentIndex = 0;
    let autoPlayInterval;

    const teamData = {
        "Muhamad Arga Reksapati": {
            desc: "Sebagai Project Leader, Arga bertanggung jawab mengoordinasi seluruh anggota tim dan memastikan visi proyek tetap terjaga dari awal hingga akhir.",
            img: "img/arga.png"
        },
        "Ariq Naufal Rabani": {
            desc: "Ariq fokus pada pengembangan sisi server (Backend), mengelola alur data, dan memastikan keamanan logika sistem aplikasi.",
            img: "img/ariq.png"
        },
        "Dhenia Putri Nuraini": {
            desc: "Dhenia bertanggung jawab merancang antarmuka pengguna (UI Designer) agar aplikasi terlihat menarik dan mudah digunakan oleh publik.",
            img: "img/dhenia.png"
        },
        "Davin Darmawan": {
            desc: "Davin bertugas menganalisis kebutuhan sistem (System Analyst) dan memastikan setiap fitur berjalan sesuai standar fungsionalitas.",
            img: "img/davin.png"
        }
    };

    function updateCarousel() {
        cards.forEach((card, index) => {
            card.classList.remove('active');

            let offset = index - currentIndex;

            if (offset > cards.length / 2) offset -= cards.length;
            if (offset < -cards.length / 2) offset += cards.length;

            if (index === currentIndex) {

                card.classList.add('active');
                card.style.transform = "translateX(0) scale(1.1) rotateY(0deg)";
                card.style.opacity = "1";
                card.style.zIndex = "10";
                card.style.filter = "blur(0)";
            } else {

                const xOffset = offset * 250; 
                const rotation = offset * -20;
                
                card.style.transform = `translateX(${xOffset}px) scale(0.8) rotateY(${rotation}deg)`;
                card.style.opacity = "0.4";
                card.style.filter = "blur(4px)";
                card.style.zIndex = 5 - Math.abs(offset);
            }
        });
    }

    function typeWriterEffect(element, text, speed, callback) {
        const fullText = text || '';
        let renderedText = '';
        let i = 0;
        element.textContent = '';

        const timer = setInterval(() => {
            if (i < fullText.length) {
                renderedText += fullText.charAt(i);
                element.textContent = renderedText;
                i++;
            } else {
                clearInterval(timer);
                if (callback) callback(); 
            }
        }, speed);
    }

    function openModal(card, data) {
        const elName = document.getElementById('modalName');
        const elRole = document.getElementById('modalRole');
        const elNim = document.getElementById('modalNim');
        const elDesc = document.getElementById('modalDesc');
        const modalImg = document.getElementById('modalImg');
        const memberImage = card.querySelector('.card-img');

        [elName, elRole, elNim, elDesc].forEach(el => {
            el.textContent = '';
        });
        modalImg.src = data.img || memberImage?.src || '';
        modalImg.alt = memberImage?.alt || card.querySelector('h3')?.textContent.trim() || 'Member';

        modal.classList.add('active');

        typeWriterEffect(elName, card.querySelector('h3').textContent.trim(), 40, () => {
            typeWriterEffect(elRole, card.querySelector('.role').textContent, 30, () => {
                typeWriterEffect(elNim, card.querySelector('.nim').textContent, 20, () => {
                    typeWriterEffect(elDesc, data.desc, 15);
                });
            });
        });

        document.body.style.overflow = 'hidden';
        clearInterval(autoPlayInterval);
    }

    cards.forEach(card => {
        card.addEventListener('click', function() {
            const nameFromCard = this.querySelector('h3').textContent.trim();
            const data = teamData[nameFromCard];

            if (data) {
                openModal(this, data);
            }
        });
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex === 0) ? cards.length - 1 : currentIndex - 1;
        updateCarousel();
        resetAutoPlay();
    });


    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        startAutoPlay();
    }

    closeBtn.onclick = closeModal;
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };

    
    function startAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function nextSlide() {
        currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    updateCarousel();
    startAutoPlay();
});
