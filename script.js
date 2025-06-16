// Inicialização do mapa usando Leaflet.js
function initMap() {
    const maringa = [-23.4273, -51.9375];

    const map = L.map('bike-map').setView(maringa, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const bikePoints = [
        { lat: -23.4273, lng: -51.9375, bikes: 5 },
        { lat: -23.4200, lng: -51.9300, bikes: 3 },
        { lat: -23.4350, lng: -51.9400, bikes: 8 },
        { lat: -23.4150, lng: -51.9450, bikes: 4 }
    ];

    bikePoints.forEach(point => {
        const marker = L.marker([point.lat, point.lng])
            .bindPopup(`Bicicletas disponíveis: ${point.bikes}`)
            .addTo(map);
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        console.log('Dados do formulário:', data);
        
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        this.reset();
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .price-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

class BikeRental {
    constructor() {
        this.rentedBikes = new Map();
        this.initializeButtons();
    }

    initializeButtons() {
        const rentButtons = document.querySelectorAll('.select-plan');
        rentButtons.forEach(button => {
            button.addEventListener('click', () => this.startRental(button));
        });
    }

    startRental(button) {
        const plan = button.parentElement.querySelector('h3').textContent;
        
        if (!this.rentedBikes.has(plan)) {
            this.rentedBikes.set(plan, new Date());
            button.textContent = 'Ativo';
            button.style.backgroundColor = '#27ae60';
            
            alert(`Plano ${plan} ativado com sucesso! Você já pode retirar sua bicicleta em qualquer estação.`);
        } else {
            alert('Você já possui um plano ativo!');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mapElement = document.getElementById('bike-map');
    if (mapElement) {
        if (typeof L !== 'undefined') {
            initMap();
        } else {
            console.error('Leaflet não está carregado. Adicione o script do Leaflet ao HTML.');
        }
    }

    const bikeRental = new BikeRental();

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 0);
    }
});