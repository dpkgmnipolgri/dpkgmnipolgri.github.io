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
    const bannerSwiper = new Swiper('.banner-slider', {
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
    setupAutoplayToggle(bannerSwiper, '#banner-autoplay-toggle');

    // --- 4. Menu Burger ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        nav.querySelectorAll('.nav-links li').forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // --- 5. Memuat Galeri & Inisialisasi Filter ---
    const galeriGrid = document.querySelector('.galeri-grid');
    if (galeriGrid) {
        fetch('kegiatan.json')
            .then(response => response.json())
            .then(data => {
                // Menggunakan map untuk membuat HTML dan menambahkan atribut data-kategori
                galeriGrid.innerHTML = data.map(kegiatan => `
                    <div class="galeri-item" data-kategori="${kegiatan.kategori || 'lainnya'}">
                        <a href="${kegiatan.gambar}" data-fancybox="gallery" data-caption="<h3>${kegiatan.judul}</h3><p>${kegiatan.deskripsi}</p>">
                            <img src="${kegiatan.gambar}" alt="${kegiatan.judul}" loading="lazy">
                        </a>
                        <div class="galeri-info">
                            <h3>${kegiatan.judul}</h3>
                            <span><i class="fas fa-calendar-alt"></i> ${kegiatan.tanggal}</span>
                        </div>
                    </div>`).join('');

                // Inisialisasi Fancybox setelah konten dimuat
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

                // === LOGIKA FILTER GALERI (BARU) ===
                const filterButtons = document.querySelectorAll('.filter-btn');
                const galleryItems = document.querySelectorAll('.galeri-item');

                filterButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        // Atur tombol aktif
                        filterButtons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');

                        const filter = button.getAttribute('data-filter');

                        // Loop melalui item galeri untuk menampilkan atau menyembunyikan
                        galleryItems.forEach(item => {
                            // Sembunyikan item terlebih dahulu untuk animasi
                            item.classList.add('hide');
                            // Tampilkan jika kategori cocok atau jika filter adalah "semua"
                            if (item.getAttribute('data-kategori') === filter || filter === 'all') {
                                // Gunakan setTimeout agar transisi CSS berjalan
                                setTimeout(() => {
                                    item.classList.remove('hide');
                                }, 10);
                            }
                        });
                    });
                });
            })
            .catch(error => console.error('Error memuat data kegiatan:', error));
    }

    // --- 6. Data dan Slider Kepengurusan ---
    const dataKepengurusan = [{
            nama: "Bung Hannan",
            jabatan: "Ketua",
            gambar: "image/Kepengurusan/HANNAN.jpg"
        },
        {
            nama: "Sarinah Fatim",
            jabatan: "Sekretaris",
            gambar: "image/Kepengurusan/FATIM.jpg"
        },
        {
            nama: "Sarinah Ainun",
            jabatan: "Bendahara",
            gambar: "image/Kepengurusan/AINUN.jpg"
        },
        {
            nama: "Sarinah Eulis",
            jabatan: "Bid.Kaderisasi",
            gambar: "image/Kepengurusan/EULIS.jpg"
        },
        {
            nama: "Sarinah Vanya",
            jabatan: "Bid.Kaderisasi",
            gambar: "image/PPPH.jpg"
        },
        {
            nama: "Bung Fahri",
            jabatan: "Bid.Kaderisasi",
            gambar: "image/Kepengurusan/FAHRI.jpg"
        },
        {
            nama: "Sarinah Dela",
            jabatan: "Bid.Idiopol",
            gambar: "image/Kepengurusan/DELA.jpg"
        },
        {
            nama: "Sarinah Anggi",
            jabatan: "Bid.Idiopol",
            gambar: "image/Kepengurusan/ANGGI.jpg"
        },
        {
            nama: "Sarinah Eve",
            jabatan: "Bid.Kaderisasi",
            gambar: "image/PPPT.jpg"
        },
        {
            nama: "Bung Azis",
            jabatan: "Bid.Idiopol",
            gambar: "image/PPLK.jpg"
        },
        {
            nama: "Bung Arul",
            jabatan: "Bid.Idiopol",
            gambar: "image/PPLK.jpg"
        },
        {
            nama: "Sarinah Latifah",
            jabatan: "Bid.Idiopol",
            gambar: "image/Kepengurusan/LATIFAH.jpg"
        },
        {
            nama: "Sarinah Angel",
            jabatan: "Bid.Kesarinahan",
            gambar: "image/Kepengurusan/ANGEL.jpg"
        },
        {
            nama: "Sarinah Vani",
            jabatan: "Bid.Kesarinahan",
            gambar: "image/Kepengurusan/PANI.jpg"
        },
        {
            nama: "Sarinah Levi",
            jabatan: "Bid.Kesarinahan",
            gambar: "image/Kepengurusan/LEVI.jpg"
        },
        {
            nama: "Sarinah Yuria",
            jabatan: "Anggota",
            gambar: "image/Kepengurusan/YURIA.jpg"
        }
    ];
    const pengurusList = document.getElementById('pengurus-list');
    if (pengurusList) {
        pengurusList.innerHTML = dataKepengurusan.map(p => `
            <div class="swiper-slide">
                <img src="${p.gambar}" alt="${p.nama}" loading="lazy">
                <h3>${p.nama}</h3>
                <p>${p.jabatan}</p>
                <a href="${p.instagram}" target="_blank"><i class="fab fa-instagram"></i> Instagram</a>
            </div>`).join('');

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
    }, {
        gambar: "image/Anggota.jpg"
    }, {
        gambar: "image/Anggota.jpg"
    }];
    const pemberitahuanList = document.getElementById('pemberitahuan-list');
    if (pemberitahuanList) {
        pemberitahuanList.innerHTML = dataPemberitahuan.map(p => `
            <div class="swiper-slide">
                <img src="${p.gambar}" alt="Pemberitahuan" loading="lazy">
            </div>`).join('');

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
    cycleThemeBtn.addEventListener('click', () => {
        const themes = ['default', 'dark', 'light'];
        let currentTheme = document.body.getAttribute('data-theme');
        let nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
        document.body.setAttribute('data-theme', themes[nextIndex]);
    });

    // --- 9. Logika Pemutar Musik ---
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    if (musicToggle && backgroundMusic) {
        let isPlaying = false;
        const musicIcon = musicToggle.querySelector('i');

        const toggleMusic = () => {
            isPlaying = !isPlaying;
            isPlaying ? backgroundMusic.play() : backgroundMusic.pause();
            musicIcon.className = `fas ${isPlaying ? 'fa-volume-high' : 'fa-volume-mute'}`;
        };

        musicToggle.addEventListener('click', e => {
            e.stopPropagation();
            toggleMusic();
        });

        const attemptPlayMusic = () => {
            backgroundMusic.play().then(() => {
                isPlaying = true;
                musicIcon.className = 'fas fa-volume-high';
            }).catch(() => {
                isPlaying = false;
                musicIcon.className = 'fas fa-volume-mute';
            });
        };
        document.body.addEventListener('click', attemptPlayMusic, {
            once: true
        });
    }

    // --- Fungsi Bantuan ---
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

// --- Menambahkan fungsionalitas untuk mencegah download gambar ---
document.addEventListener('contextmenu', event => {
    // Cek apakah elemen yang di-klik kanan adalah gambar (tag <img>)
    if (event.target.tagName === 'IMG') {
        // Mencegah menu default (menu klik kanan) muncul
        event.preventDefault();
    }
});