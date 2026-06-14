// ============================================
// GALLERY MANAGEMENT
// ============================================

const galleries = {
    'coffret-pompe': {
        images: [
            { src: 'images/coffret-pompe-1.jpg', caption: 'Afficheurs JM CONCEPT - Sondes de niveau BW25 et Optiflex' },
            { src: 'images/coffret-pompe-2.jpg', caption: 'Capteur KROHNE - Mesure de niveau 520,2 mm' },
            { src: 'images/coffret-pompe-3.jpg', caption: 'Coffret de commande pompes - Centrale EDF Guyane' }
        ]
    },
    'fanuc': {
        images: [
            { src: 'images/fanuc-1.jpg', caption: 'Équipe aux Olympiades FANUC - Programmation du robot' },
            { src: 'images/fanuc-2.jpg', caption: 'Contrôle et programmation du robot FANUC' }
        ]
    },
    'test-circuit': {
        images: [
            { src: 'images/test-circuit-1.jpg', caption: 'Circuit électrique avec composants de test' },
            { src: 'images/test-circuit-2.jpg', caption: 'Schéma électrique complet avec points de test (TP1-TP9)' }
        ]
    },
    'armoire-clim': {
        images: [
            { src: 'images/armoire-clim-1.jpg', caption: 'Armoire de climatisation complète - Panneaux modulaires' },
            { src: 'images/armoire-clim-2.jpg', caption: 'Panneau de contrôle - Marche/Défaut climatisation et ventilo' },
            { src: 'images/armoire-clim-3.jpg', caption: 'Schéma de commande EDF Petit-Saut' }
        ]
    },
    'pont-roulant': {
        images: [
            { src: 'images/pont-roulant-1.jpg', caption: 'Mécanisme de transmission - Poulies et chaîne du pont' },
            { src: 'images/pont-roulant-2.jpg', caption: 'Système de levage - Contacteur et blocage' },
            { src: 'images/pont-roulant-3.jpg', caption: 'Chariot DEMAG - Système de déplacement' }
        ]
    }
};

let currentGallery = null;
let currentImageIndex = 0;

function openGallery(galleryName) {
    currentGallery = galleryName;
    currentImageIndex = 0;
    const modal = document.getElementById('galleryModal');
    modal.classList.add('show');
    showImage(0);
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function changeGalleryImage(direction) {
    const gallery = galleries[currentGallery];
    currentImageIndex += direction;
    
    if (currentImageIndex >= gallery.images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = gallery.images.length - 1;
    }
    
    showImage(currentImageIndex);
}

function showImage(index) {
    const gallery = galleries[currentGallery];
    const image = gallery.images[index];
    
    document.getElementById('galleryImage').src = image.src;
    document.getElementById('galleryCaption').textContent = image.caption;
    document.getElementById('galleryCounter').textContent = `${index + 1} / ${gallery.images.length}`;
    
    // Update thumbnails
    const thumbnailsContainer = document.getElementById('galleryThumbnails');
    thumbnailsContainer.innerHTML = '';
    
    gallery.images.forEach((img, i) => {
        const thumb = document.createElement('div');
        thumb.className = `gallery-thumbnail ${i === index ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${img.src}" alt="Thumbnail ${i + 1}">`;
        thumb.onclick = () => {
            currentImageIndex = i;
            showImage(i);
        };
        thumbnailsContainer.appendChild(thumb);
    });
}

// Close gallery on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeGallery();
    }
});

// Close gallery on background click
document.getElementById('galleryModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeGallery();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (document.getElementById('galleryModal').classList.contains('show')) {
        if (event.key === 'ArrowLeft') {
            changeGalleryImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeGalleryImage(1);
        }
    }
});