// Inicialização do mapa usando Leaflet.js
function initMap() {
    // Coordenadas de Maringá
    const maringa = [-23.4273, -51.9375];

    // Criar o mapa
    const map = L.map('bike-map').setView(maringa, 13);

    // Adicionar camada do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Exemplo de pontos de bicicletas (simulados)
    const bikePoints = [
        { lat: -23.4273, lng: -51.9375, bikes: 5 },
        { lat: -23.4200, lng: -51.9300, bikes: 3 },
        { lat: -23.4350, lng: -51.9400, bikes: 8 },
        { lat: -23.4150, lng: -51.9450, bikes: 4 }
    ];

    // Adicionar marcadores para cada ponto
    bikePoints.forEach(point => {
        const marker = L.marker([point.lat, point.lng])
            .bindPopup(`Bicicletas disponíveis: ${point.bikes}`)
            .addTo(map);
    });
}

// Animação suave do scroll
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

// Formulário de contato
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulação de envio do formulário
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        // Aqui seria a integração com um backend real
        console.log('Dados do formulário:', data);
        
        // Feedback para o usuário
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        this.reset();
    });
}

// Animação de elementos ao scroll
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

// Sistema de aluguel de bicicletas
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
        // Simulação do processo de aluguel
        const plan = button.parentElement.querySelector('h3').textContent;
        
        if (!this.rentedBikes.has(plan)) {
            this.rentedBikes.set(plan, new Date());
            button.textContent = 'Ativo';
            button.style.backgroundColor = '#27ae60';
            
            // Simulação de confirmação
            alert(`Plano ${plan} ativado com sucesso! Você já pode retirar sua bicicleta em qualquer estação.`);
        } else {
            alert('Você já possui um plano ativo!');
        }
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Carregar o mapa se o elemento existir
    const mapElement = document.getElementById('bike-map');
    if (mapElement) {
        // Verificar se o Leaflet está carregado
        if (typeof L !== 'undefined') {
            initMap();
        } else {
            console.error('Leaflet não está carregado. Adicione o script do Leaflet ao HTML.');
        }
    }

    // Inicializar sistema de aluguel
    const bikeRental = new BikeRental();

    // Adicionar listener para animações no scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Verificar elementos visíveis no carregamento inicial
});

// Adicionar classe para navegação fixa
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 0);
    }
});