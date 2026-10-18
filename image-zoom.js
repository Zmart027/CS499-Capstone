
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".testing-figure img");

    if (images.length === 0) return;

    const lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";

    lightbox.innerHTML = `
        <div class="lightbox-toolbar">
            <button type="button" id="zoom-out" aria-label="Zoom out">−</button>
            <span id="zoom-level">100%</span>
            <button type="button" id="zoom-in" aria-label="Zoom in">+</button>
            <button type="button" id="zoom-reset">Reset</button>
            <button type="button" id="zoom-close" aria-label="Close image">×</button>
        </div>

        <div class="lightbox-image-area">
            <img id="lightbox-image" alt="">
        </div>
    `;

    document.body.appendChild(lightbox);

    const enlargedImage = document.getElementById("lightbox-image");
    const zoomLevel = document.getElementById("zoom-level");
    const imageArea = lightbox.querySelector(".lightbox-image-area");

    let scale = 1;
    let previousFocus = null;

    function updateZoom() {
        enlargedImage.style.transform = `scale(${scale})`;
        zoomLevel.textContent = `${Math.round(scale * 100)}%`;
    }

    function closeLightbox() {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
        previousFocus?.focus();
    }

    images.forEach((image) => {
        image.setAttribute("tabindex", "0");
        image.setAttribute("role", "button");
        image.setAttribute("aria-label", `Enlarge: ${image.alt}`);

        function openImage() {
            previousFocus = document.activeElement;
            enlargedImage.src = image.currentSrc || image.src;
            enlargedImage.alt = image.alt;
            scale = 1;
            updateZoom();

            lightbox.classList.add("open");
            document.body.style.overflow = "hidden";
            document.getElementById("zoom-close").focus();
        }

        image.addEventListener("click", openImage);

        image.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openImage();
            }
        });
    });

    document.getElementById("zoom-in").addEventListener("click", () => {
        scale = Math.min(scale + 0.25, 3);
        updateZoom();
    });

    document.getElementById("zoom-out").addEventListener("click", () => {
        scale = Math.max(scale - 0.25, 0.5);
        updateZoom();
    });

    document.getElementById("zoom-reset").addEventListener("click", () => {
        scale = 1;
        updateZoom();
    });

    document.getElementById("zoom-close").addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox || event.target === imageArea) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("open")) {
            closeLightbox();
        }
    });
});
