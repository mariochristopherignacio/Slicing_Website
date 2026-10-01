let isScrolling = false;

function smoothScrollTo(target) {

    if (isScrolling) return;

    isScrolling = true;

    const start = window.scrollY;

    const end =
        target.getBoundingClientRect().top +
        window.scrollY -
        80;

    const distance = end - start;

    const duration = Math.max(
        1200,
        Math.min(2000, Math.abs(distance) * 0.7)
    );

    let startTime = null;

    function animate(currentTime) {

        if (startTime === null) {
            startTime = currentTime;
        }

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        const easing =
            progress < 0.5
                ? 4 * progress * progress * progress
                : 1 -
                  Math.pow(
                      -2 * progress + 2,
                      3
                  ) / 2;

        window.scrollTo(
            0,
            start + distance * easing
        );

        if (progress < 1) {

            requestAnimationFrame(animate);

        } else {

            isScrolling = false;

        }
    }

    requestAnimationFrame(animate);
}

document.addEventListener("click", function (event) {

    const link =
        event.target.closest('a[href^="#"]');

    if (!link) return;

    const id =
        link.getAttribute("href");

    if (!id || id === "#") return;

    const target =
        document.querySelector(id);

    if (!target) return;

    event.preventDefault();

    smoothScrollTo(target);

});

const wallpapers = [

    "https://i.pinimg.com/736x/c0/7d/c4/c07dc4576d17854a7264c36fad87f2df.jpg",

    "https://i.pinimg.com/1200x/f9/1d/17/f91d174963099dd04722c98c93089333.jpg",

    "https://i.pinimg.com/736x/55/09/1d/55091da707c94306f1f68757d32878d0.jpg",

    "https://i.pinimg.com/736x/81/44/be/8144be61ef53ea38c116c7401acaa0ac.jpg"

];

const backgroundImage =
    document.querySelector(".background-image");

let currentWallpaper = 0;

backgroundImage.style.backgroundImage =
    `url("${wallpapers[currentWallpaper]}")`;

setInterval(function () {

    currentWallpaper++;

    if (currentWallpaper >= wallpapers.length) {

        currentWallpaper = 0;

    }

    backgroundImage.style.opacity = "0";

    setTimeout(function () {

        backgroundImage.style.backgroundImage =
            `url("${wallpapers[currentWallpaper]}")`;

        backgroundImage.style.opacity = "1";

    }, 700);

}, 8000);

const playlist = [
    {
        title: "Harvey",
        artist: "Her's",
        album: "Invitation to Her's",
        file: "harvey.mp3",
        cover: "https://cdn-images.dzcdn.net/images/cover/7b311a9b9476b2e847e37843919bd383/1900x1900-000000-80-0-0.jpg"
    },

    {
        title: "Save Your Tears",
        artist: "The Weeknd",
        album: "After Hours",
        file: "save_your_tears.mp3",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXkE1q1qpd4wBXtvlnrlkAXTDfeSJyYvmVvETRlI84-A&s=10"
    },

    {
        title: "The Less I Know The Better",
        artist: "Tame Impala",
        album: "Currents",
        file: "the_less_i_know_the_better.mp3",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Hpu6cO0gV51Hxtd-OxzHGVJJtLh888nh3oI_KHqtBQdt47q5D-EW7qY&s=103"
    },

    {
        title: "Oh Yeah?",
        artist: "Steve Lacy",
        album: "Gemini Rights",
        file: "oh_yeah.mp3",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSeoNiV_Eo5Z-oc3gGhUShu637lDBKzdn9PCqSK_qxyIeLllc59XNFKmFE&s=10"
    },

    {
        title: "Loser",
        artist: "Tame Impala",
        album: "Currents",
        file: "loser.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b273e2aa48290b3cd1040be92345"
    }
];

let currentSong = 0;

const audio = document.getElementById("audioPlayer");

const playButton = document.getElementById("playMusic");

const prevButton = document.getElementById("prevMusic");

const nextButton = document.getElementById("nextMusic");

const progressBar = document.getElementById("progressBar");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const musicDisc = document.getElementById("musicDisc");

const musicTitle = document.getElementById("musicTitle");

const musicArtist = document.getElementById("musicArtist");

const musicAlbum = document.getElementById("musicAlbum");

const musicCover = document.getElementById("musicCover");

const musicPlayer = document.getElementById("musicPlayer");

const minimizeButton = document.getElementById("minimizeMusic");

function loadSong(index) {

    const song = playlist[index];

    audio.src = song.file;

    musicTitle.textContent = song.title;

    musicArtist.textContent = song.artist;

    musicAlbum.textContent = song.album;

    musicCover.src = song.cover;

    progressBar.value = 0;

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";
}

playButton.addEventListener("click", function () {

    if (audio.paused) {

        audio.play();

    } else {

        audio.pause();

    }

});

audio.addEventListener("play", function () {

    playButton.textContent = "❚❚";

    musicDisc.classList.add("playing");

});

audio.addEventListener("pause", function () {

    playButton.textContent = "▶";

    musicDisc.classList.remove("playing");

});

audio.addEventListener("ended", function () {

    currentSong++;

    if (currentSong >= playlist.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    audio.play();

});

prevButton.addEventListener("click", function () {

    currentSong--;

    if (currentSong < 0) {

        currentSong = playlist.length - 1;

    }

    loadSong(currentSong);

    audio.play();

});

nextButton.addEventListener("click", function () {

    currentSong++;

    if (currentSong >= playlist.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    audio.play();

});

audio.addEventListener("loadedmetadata", function () {

    duration.textContent = formatTime(audio.duration);

});

audio.addEventListener("timeupdate", function () {

    if (!audio.duration) return;

    const progress =
        (audio.currentTime / audio.duration) * 100;

    progressBar.value = progress;

    currentTime.textContent =
        formatTime(audio.currentTime);

});

progressBar.addEventListener("input", function () {

    if (!audio.duration) return;

    audio.currentTime =
        (progressBar.value / 100) *
        audio.duration;

});

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "0:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const secondsRemaining =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        secondsRemaining
            .toString()
            .padStart(2, "0")
    );

}

minimizeButton.addEventListener("click", function () {

    musicPlayer.classList.toggle("minimized");

    if (musicPlayer.classList.contains("minimized")) {

        minimizeButton.textContent = "+";

    } else {

        minimizeButton.textContent = "−";

    }

});

loadSong(currentSong);

const projectModal =
    document.getElementById("projectModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");

const modalTitle =
    document.getElementById("modalTitle");

const modalCategory =
    document.getElementById("modalCategory");

const modalDescription =
    document.getElementById("modalDescription");
const modalGithub =
    document.getElementById("modalGithub");

const projects = {

    "Sistem Distribusi Bahan Makan Bergizi Gratis (MBG)": {
        title: "Sistem Distribusi Bahan Makan Bergizi Gratis (MBG)",
        category: "Python · Agroindustri",
        description:
            "Sistem sederhana untuk mendukung proses distribusi bahan dalam program Makan Bergizi Gratis (MBG).",
        github: "https://github.com/azrilganteng/sistem-sederhana-MBG"
    },

    "Sistem Toko": {
        title: "Sistem Toko",
        category: "Desktop Application · C#",
        description:
            "Aplikasi desktop untuk membantu proses operasional toko, mulai dari pengelolaan produk dan stok, transaksi kasir, pembayaran, hingga pengelolaan dan pemantauan pengiriman.",
        github: "https://github.com/azrilganteng/Sistem_Toko/tree/master"
    }
};

document.querySelectorAll(".project-card")
    .forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                const project =
                    projects[
                        card.dataset.project
                    ];

                if (!project) return;

                modalTitle.textContent =
                    project.title;

                modalCategory.textContent =
                    project.category;

                modalDescription.textContent =
                    project.description;

                modalGithub.href =
                    project.github;

                projectModal.classList.add(
                    "active"
                );

            }
        );

    });

function closeModal() {

    projectModal.classList.remove(
        "active"
    );

}

modalClose.addEventListener(
    "click",
    closeModal
);

modalOverlay.addEventListener(
    "click",
    closeModal
);

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {
            closeModal();
        }

    }
);

let isDragging = false;
let offsetX = 0;
let offsetY = 0;


musicPlayer.addEventListener("pointerdown", function (event) {

    if (event.target.closest("button, input, a")) {
        return;
    }

    isDragging = true;

    const rect =
        musicPlayer.getBoundingClientRect();

    offsetX =
        event.clientX - rect.left;

    offsetY =
        event.clientY - rect.top;

    musicPlayer.classList.add("dragging");

    musicPlayer.style.right = "auto";
    musicPlayer.style.bottom = "auto";

    musicPlayer.style.left =
        `${rect.left}px`;

    musicPlayer.style.top =
        `${rect.top}px`;

    musicPlayer.setPointerCapture(
        event.pointerId
    );
});

musicPlayer.addEventListener("pointermove", function (event) {

    if (!isDragging) return;

    const width =
        musicPlayer.offsetWidth;

    const height =
        musicPlayer.offsetHeight;

    let x =
        event.clientX - offsetX;

    let y =
        event.clientY - offsetY;

    x = Math.max(
        0,
        Math.min(
            x,
            window.innerWidth - width
        )
    );

    y = Math.max(
        0,
        Math.min(
            y,
            window.innerHeight - height
        )
    );

    musicPlayer.style.left =
        `${x}px`;

    musicPlayer.style.top =
        `${y}px`;
});

musicPlayer.addEventListener("pointerup", function (event) {

    if (!isDragging) return;

    isDragging = false;

    musicPlayer.classList.remove("dragging");

    const rect =
        musicPlayer.getBoundingClientRect();

    const playerWidth =
        musicPlayer.offsetWidth;

    const distanceLeft =
        event.clientX;

    const distanceRight =
        window.innerWidth -
        event.clientX;

    let finalX;

    if (distanceLeft < distanceRight) {

        finalX = 20;

    } else {

        finalX =
            window.innerWidth -
            playerWidth -
            20;
    }

    const finalY = Math.max(
        0,
        Math.min(
            rect.top,
            window.innerHeight -
            musicPlayer.offsetHeight -
            20
        )
    );

    musicPlayer.style.right =
        "auto";

    musicPlayer.style.bottom =
        "auto";

    musicPlayer.style.left =
        `${finalX}px`;

    musicPlayer.style.top =
        `${finalY}px`;

    musicPlayer.releasePointerCapture(
        event.pointerId
    );
});

musicPlayer.addEventListener(
    "pointercancel",
    function () {

        isDragging = false;

        musicPlayer.classList.remove(
            "dragging"
        );

    }
);