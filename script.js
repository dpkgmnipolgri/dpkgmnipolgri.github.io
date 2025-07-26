document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
    });

    // --- 2. Inisialisasi AOS (Animate On Scroll) ---
    AOS.init({
        duration: 1000,
        once: true,
        offset: 50,
    });

    // --- 3. Inisialisasi Swiper Banner ---
    new Swiper('.banner-slider', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.banner-slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.banner-slider .swiper-button-next',
            prevEl: '.banner-slider .swiper-button-prev',
        },
    });

    // --- 4. Menu Burger ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');
    });

    // --- 5. Memuat Galeri & Inisialisasi Lightbox ---
    const galeriGrid = document.querySelector('.galeri-grid');
    if (galeriGrid) {
        fetch('kegiatan.json')
            .then(response => response.json())
            .then(data => {
                let galeriHTML = '';
                data.forEach(kegiatan => {
                    galeriHTML += `
                        <div class="galeri-item">
                            <a href="${kegiatan.gambar}" data-fancybox="gallery" data-caption="<h3>${kegiatan.judul}</h3><p>${kegiatan.deskripsi}</p>">
                                <img src="${kegiatan.gambar}" alt="${kegiatan.judul}" loading="lazy">
                            </a>
                            <div class="galeri-info">
                                <h3>${kegiatan.judul}</h3>
                                <span><i class="fas fa-calendar-alt"></i> ${kegiatan.tanggal}</span>
                            </div>
                        </div>`;
                });
                galeriGrid.innerHTML = galeriHTML;

                Fancybox.bind("[data-fancybox]", {
                    Thumbs: false,
                    Toolbar: {
                        display: {
                            left: ["infobar"],
                            middle: [],
                            right: ["close"],
                        },
                    },
                });
            })
            .catch(error => console.error('Error memuat data kegiatan:', error));
    }

    // --- 6. Data dan Slider Kepengurusan ---
    const dataKepengurusan = [{
            nama: "Bung Hannan",
            jabatan: "Ketua",
            instagram: "https://instagram.com/akun1",
            gambar: "image/PPLK.jpg"
        },
        {
            nama: "Sarinah Fatimah",
            jabatan: "Sekretaris",
            instagram: "https://instagram.com/akun2",
            gambar: "image/PPPH.jpg"
        },
        {
            nama: "Sarinah Ainun",
            jabatan: "Bendahara",
            instagram: "https://instagram.com/akun3",
            gambar: "image/PPPH.jpg"
        },
        {
            nama: "Sarinah Eulis",
            jabatan: "Bid.Kaderisasi",
            instagram: "https://instagram.com/akun3",
            gambar: "image/PPPH.jpg"
        },
        {
            nama: "Sarinah Vanya",
            jabatan: "Bid.Kaderisasi",
            instagram: "https://instagram.com/akun3",
            gambar: "image/PPPH.jpg"
        },
        {
            nama: "Bung Fahri",
            jabatan: "Bid.Kaderisasi",
            instagram: "https://instagram.com/akun3",
            gambar: "image/PPLK.jpg"
        },
        {
            nama: "Sarinah Dela",
            jabatan: "Bid.Idiopol",
            instagram: "https://instagram.com/akun3",
            gambar: "image/PPPH.jpg"
        },
        {
            nama: "Sarinah Anggi",
            jabatan: "Bid.Idiopol",
            instagram: "https://instagram.com/akun3",
            gambar: "image/PPPH.jpg"
        },
        {
            nama: "Sarinah Eve",
            jabatan: "Bid.Kaderisasi",
            instagram: "https://instagram.com/akun3",
            gambar: "image/PPPT.jpg"
        },
        {
            nama: "Bung Azis",
            jabatan: "Bid.Idiopol",
            instagram: "https://instagram.com/akun3",
            gambar: "image/PPLK.jpg"
        },
        {
            nama: "Bung Arul",
            jabatan: "Bid.Idiopol",
            instagram: "https://instagram.com/akun3",
            gambar: "image/PPLK.jpg"
        },
        {
            nama: "Sarinah Latifah",
            jabatan: "Bid.Idiopol",
            instagram: "https://instagram.com/akun3",
            gambar: "image/PPPH.jpg"
        },
        {
            nama: "Sarinah Angel",
            jabatan: "Bid.Kesarinahan",
            instagram: "https://instagram.com/akun3",
            gambar: "image/PPPT.jpg"
        },
        {
            nama: "Sarinah Vani",
            jabatan: "Bid.Kesarinahan",
            instagram: "https://instagram.com/akun3",
            gambar: "image/PPPH.jpg"
        },
        {
            nama: "Sarinah Levi",
            jabatan: "Bid.Kesarinahan",
            instagram: "https://instagram.com/akun3",
            gambar: "image/PPPH.jpg"
        }
    ];
    const pengurusList = document.getElementById('pengurus-list');
    if (pengurusList) {
        let pengurusHTML = '';
        dataKepengurusan.forEach(p => {
            pengurusHTML += `
                <div class="swiper-slide">
                    <img src="${p.gambar}" alt="${p.nama}" loading="lazy">
                    <h3>${p.nama}</h3>
                    <p>${p.jabatan}</p>
                    <a href="${p.instagram}" target="_blank"><i class="fab fa-instagram"></i> Instagram</a>
                </div>`;
        });
        pengurusList.innerHTML = pengurusHTML;

        const kepengurusanSwiper = new Swiper('.kepengurusan-slider', {
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },
            pagination: {
                el: '.kepengurusan-slider .swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.kepengurusan-slider .swiper-button-next',
                prevEl: '.kepengurusan-slider .swiper-button-prev'
            },
            spaceBetween: 30,
            grabCursor: true,
        });
        setupAutoplayToggle(kepengurusanSwiper, '.kepengurusan-slider .swiper-autoplay-toggle');
    }

    // --- 7. Data dan Slider Pemberitahuan ---
    const dataPemberitahuan = [{
            gambar: "image/Anggota.jpg"
        },
        {
            gambar: "image/Anggota.jpg"
        },
        {
            gambar: "image/Anggota.jpg"
        }
    ];
    const pemberitahuanList = document.getElementById('pemberitahuan-list');
    if (pemberitahuanList) {
        let pemberitahuanHTML = '';
        dataPemberitahuan.forEach(p => {
            pemberitahuanHTML += `
                <div class="swiper-slide">
                    <img src="${p.gambar}" alt="Pemberitahuan" loading="lazy">
                </div>`;
        });
        pemberitahuanList.innerHTML = pemberitahuanHTML;

        const pemberitahuanSwiper = new Swiper('.pemberitahuan-slider', {
            loop: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false
            },
            pagination: {
                el: '.pemberitahuan-slider .swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.pemberitahuan-slider .swiper-button-next',
                prevEl: '.pemberitahuan-slider .swiper-button-prev'
            },
            spaceBetween: 30,
            grabCursor: true,
        });
        setupAutoplayToggle(pemberitahuanSwiper, '.pemberitahuan-slider .swiper-autoplay-toggle');
    }

    // --- 8. Logika Pengganti Tema Siklus ---
    const cycleThemeBtn = document.getElementById('cycle-theme-btn');
    const themes = ['default', 'dark', 'light'];
    let currentThemeIndex = 0;
    cycleThemeBtn.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        document.body.setAttribute('data-theme', themes[currentThemeIndex]);
    });

    // --- 9. Logika Pemutar Musik ---
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const musicIcon = musicToggle.querySelector('i');
    let isPlaying = false;

    function toggleMusic() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            backgroundMusic.play();
            musicIcon.classList.replace('fa-volume-mute', 'fa-volume-high');
        } else {
            backgroundMusic.pause();
            musicIcon.classList.replace('fa-volume-high', 'fa-volume-mute');
        }
    }
    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMusic();
    });

    function attemptPlayMusic() {
        backgroundMusic.play().then(() => {
            isPlaying = true;
            musicIcon.classList.replace('fa-volume-mute', 'fa-volume-high');
        }).catch(() => {
            isPlaying = false;
            musicIcon.classList.replace('fa-volume-high', 'fa-volume-mute');
        });
        document.body.removeEventListener('click', attemptPlayMusic);
    }
    document.body.addEventListener('click', attemptPlayMusic, {
        once: true
    });

    // --- Fungsi Bantuan ---
    // Fungsi untuk tombol pause/play slider
    function setupAutoplayToggle(swiperInstance, buttonSelector) {
        const toggleBtn = document.querySelector(buttonSelector);
        if (!toggleBtn) return;
        const icon = toggleBtn.querySelector('i');

        toggleBtn.addEventListener('click', () => {
            if (swiperInstance.autoplay.running) {
                swiperInstance.autoplay.stop();
                icon.classList.replace('fa-pause', 'fa-play');
            } else {
                swiperInstance.autoplay.start();
                icon.classList.replace('fa-play', 'fa-pause');
            }
        });
    }
});

// Keyframes untuk animasi menu burger
const style = document.createElement('style');
style.innerHTML = `@keyframes navLinkFade { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0px); } }`;
document.head.appendChild(style);