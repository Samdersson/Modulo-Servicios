document.addEventListener('DOMContentLoaded', function() {
    const serviceLinks = document.querySelectorAll('.service-link');
    const serviceSections = document.querySelectorAll('.service-section');
    const modal = document.getElementById('imagenModal');
    const modalImg = document.getElementById('imagenProducto');
    const closeModal = document.getElementsByClassName('cerrar')[0];
    const inicioLink = document.getElementById('inicio-link');
    const trabajosLink = document.getElementById('trabajos-link');

    // Mostrar la sección de bienvenida por defecto
    showServiceSection('bienvenida');

    inicioLink.addEventListener('click', function(e) {
        e.preventDefault();
        showServiceSection('bienvenida');
    });

    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const service = this.getAttribute('data-service');
            showServiceSection(service);
        });
    });

    trabajosLink.addEventListener('click', function(e) {
        e.preventDefault();
        showServiceSection('trabajos');
        loadTrabajos();
    });

    function showServiceSection(service) {
        // Ocultar todas las secciones de servicio
        serviceSections.forEach(section => {
            section.style.display = 'none';
        });

        // Mostrar la sección del servicio seleccionado
        const selectedSection = document.getElementById(service);
        if (selectedSection) {
            selectedSection.style.display = 'block';
            if (service === 'publicidad') {
                loadProducts('publicidad', 'pendones', selectedSection.querySelector('.products-container'));
                setupProductLinks(selectedSection);
            } else if (service === 'trabajos') {
                loadTrabajos();
            }
        }
    }

    function setupProductLinks(section) {
        const productLinks = section.querySelectorAll('.product-link');
        productLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const product = this.getAttribute('data-product');
                loadProducts('publicidad', product, section.querySelector('.products-container'));
            });
        });
    }

    function loadProducts(service, product, container) {
        // Aquí debemos cargar los productos reales del servicio y producto específico
        // Por ahora, mostraremos productos de ejemplo
        const products = getExampleProducts(service, product);

        let productsHTML = '';
        products.forEach(product => {
            productsHTML += `
                <div class="product">
                    <h3>${product.name}</h3>
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <p>${product.description}</p>
                    <p>Precio: $${product.price}</p>
                </div>
            `;
        });

        container.innerHTML = productsHTML;

        const productImages = container.querySelectorAll('.product-image');
        productImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = "block";
                modalImg.src = this.src;
            });
        });
    }

    function loadTrabajos() {
        const trabajosContainer = document.querySelector('.trabajos-container');
        const trabajos = getExampleTrabajos();

        let trabajosHTML = '';
        trabajos.forEach(trabajo => {
            trabajosHTML += `
                <div class="trabajo">
                    <img src="${trabajo.image}" alt="${trabajo.title}" class="trabajo-image">
                    <div class="trabajo-details">
                        <h3>${trabajo.title}</h3>
                        <p>${trabajo.description}</p>
                    </div>
                </div>
            `;
        });

        trabajosContainer.innerHTML = trabajosHTML;

        const trabajoImages = trabajosContainer.querySelectorAll('.trabajo-image');
        trabajoImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = "block";
                modalImg.src = this.src;
            });
        });
    }

    function getExampleTrabajos() {
        // Esta función simula la obtención de trabajos realizados
        // En una aplicación real, aquí harías una llamada a una API o base de datos
        return [
            { title: 'Campaña Publicitaria #1', description: 'Diseño de campaña integral para empresa XYZ', image: 'Image.gpg' },
            { title: 'Estrategia Digital #1', description: 'Implementación de estrategia de marketing digital para startup 123', image: 'path/to/trabajo3.jpg' },
            { title: 'Campaña en Redes Sociales #1', description: 'Gestión de campaña viral en redes sociales para marca GHI', image: 'path/to/trabajo5.jpg' },
        ];
    }

    function getExampleProducts(service, product) {
        // Esta función simula la obtención de productos
        // En una aplicación real, aquí harías una llamada a una API o base de datos
        const products = {
            'publicidad': {
                'pendones': [
                    { name: 'Pendón talla S', description: 'Pendón de 50 Cm x 70 Cm', price: 28000, image: 'path/to/pendon-pequeno.jpg' },
                    { name: 'Pendón talla M', description: 'Pendón de 70 Cm x 100 Cm', price: 42000, image: 'path/to/pendon-grande.jpg' }
                ],
                'tarjetas': [
                    { name: 'Tarjetas Barniz 4*1', description: '1000 Parte forntal ful color barnizda / respaldo blanco y negro', price: 80000, image: 'path/to/tarjetas-estandar.jpg' },
                    { name: 'Tarjetas Mate UV 4*1', description: '1000 parte frontal ful color mate con brillo parcial / respaldo blanco y negro', price: 120000, image: 'path/to/tarjetas-premium.jpg' },
                    { name: 'Tarjetas Mate UV 4*1', description: '1000 ambos lados ful color mate con brillo parcia', price: 150000, image: 'path/to/tarjetas-premium.jpg' }
                ],
                'volantes': [
                    { name: 'Volantes 4*0', description: '1000 volantes tamaño 1/2 Carta', price: 120 },
                    { name: 'Volantes 4*1', description: '1000 volantes tamaño 1/2', price: 160 }
                ],
                'stickers': [
                    { name: 'Stickers', description: 'Cantidad y tamaño', price: 35 },
                    { name: 'Etiquetas autoadhesivas Cuadradas', description: 'Cantidad y tamaño', price: 30 }
                ],
                'impresion-digital': [
                    { name: 'Material 1', description: 'Cantidad en cm', price: 30 },
                    { name: 'Material 2', description: 'Cantidad en cm', price: 35 }
                ]
            },
            // ... otros servicios ...
        };

        return products[service][product] || [];
    }


});