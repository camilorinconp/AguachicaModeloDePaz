document.addEventListener('DOMContentLoaded', function () {

    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease-in-out', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
    });

    // Off-Canvas Menu Logic
    const menuOpenBtn = document.getElementById('menu-open-btn');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const offcanvasMenu = document.getElementById('offcanvas-menu');
    const offcanvasOverlay = document.getElementById('offcanvas-overlay');
    const offcanvasLinks = document.querySelectorAll('.offcanvas-link');

    const openMenu = () => {
        offcanvasMenu.classList.remove('translate-x-full');
        offcanvasOverlay.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    };

    const closeMenu = () => {
        offcanvasMenu.classList.add('translate-x-full');
        offcanvasOverlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    };

    menuOpenBtn.addEventListener('click', openMenu);
    menuCloseBtn.addEventListener('click', closeMenu);
    offcanvasOverlay.addEventListener('click', closeMenu);
    offcanvasLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.getElementById('header').offsetHeight;
    
    const activateNavLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', activateNavLink);

    // Timeline Tabs Logic
    const timelineTabs = document.querySelectorAll('.timeline-tab');
    const timelineContentContainer = document.getElementById('timeline-content');

    const timelineData = {
        '1995': {
            title: '1995-1996: Un Año de Esperanza',
            content: 'Tras la consulta, la violencia disminuyó notablemente. La iniciativa atrajo atención nacional e internacional, y llegaron recursos que se tradujeron en obras como el barrio Ciudadela de la Paz. Fue un período de optimismo y reconstrucción comunitaria.',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>' // Shield Icon
        },
        '1996': {
            title: '1996-2000: La Persecución Sistemática',
            content: 'La consulta desnudó la falta de legitimidad de los grupos armados, y la venganza no tardó. A partir de 1996, se desató una cacería brutal contra los líderes de la iniciativa. Álvaro Payares, César Paso, Edinson Duarte y muchos otros fueron asesinados. La violencia culminó con el asesinato del exalcalde Luis Fernando Rincón en el año 2000.',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>' // Alert Circle Icon
        },
        '1997': {
            title: '1997: El \'Memoricidio\': La Venganza Contra la Historia',
            content: 'A la violencia física le siguió la simbólica. La administración siguiente, influenciada por paramilitares, quemó archivos y fotos en un acto deliberado para erradicar el ejemplo de resistencia cívica de la memoria colectiva.',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>' // Trash Icon
        },
        '2000': {
            title: 'Hoy: La Resiliencia de la Memoria',
            content: 'El fuego no pudo borrar la historia. La comunidad preservó su memoria a través de la tradición oral y actos simbólicos, como la siembra de una Ceiba de la Paz. La Corporación Aguachica Modelo de Paz fue reactivada y nuevas generaciones, inspiradas por este legado, continúan trabajando por la paz a través del arte y la cultura.',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10"><polyline points="23 6-132 13.39-132 13.39-132 13.39 19 12 12 5 5 12 2 6"></polyline><path d="M2 12h20"></path></svg>' // Trending Up Icon
        }
    };

    function updateTimelineContent(year) {
        const data = timelineData[year];
        timelineContentContainer.innerHTML = `
            <div class="card rounded-xl p-8" data-aos="fade-in">
                <div class="flex items-start space-x-6">
                    <div class="text-4xl text-accent-color mt-1">${data.icon}</div>
                    <div>
                        <h3 class="text-3xl font-bold text-gray-800 mb-4">${data.title}</h3>
                        <p class="text-lg leading-relaxed font-light">${data.content}</p>
                    </div>
                </div>
            </div>
        `;
    }

    timelineTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Deactivate all tabs
            timelineTabs.forEach(t => {
                t.classList.remove('active-tab', 'text-gray-800');
                t.classList.add('text-gray-500');
            });
            // Activate clicked tab
            tab.classList.add('active-tab', 'text-gray-800');
            tab.classList.remove('text-gray-500');
            
            updateTimelineContent(tab.dataset.year);
        });
    });

    // Initial content load
    updateTimelineContent('1995');

    // Accordion Data and Logic
    const accordionData = [
        { title: 'Pertinencia', content: 'La consulta y sus conmemoraciones son un "uso social y ritual cívico" que reafirma la identidad colectiva y un pacto por la paz.' },
        { title: 'Representatividad', content: 'Es un referente de identidad para Aguachica y el Cesar, posicionando al municipio como pionero en la construcción de paz desde lo local.' },
        { title: 'Relevancia', content: 'Es valorada por la comunidad como un acto de máxima dignidad que encarna la aspiración a una vida sin violencia.' },
        { title: 'Naturaleza e Identidad Colectiva', content: 'Fue un acto colectivo cuya memoria se ha transmitido entre generaciones, formando parte de la historia local.' },
        { title: 'Vigencia', content: 'La manifestación está viva a través de conmemoraciones anuales, organizaciones cívicas y expresiones culturales que mantienen su legado.' },
        { title: 'Equidad', content: 'Fue un ejercicio de democracia radicalmente equitativo. Su memoria es un bien común que fortalece a toda la comunidad.' },
        { title: 'Responsabilidad', content: 'Promueve los derechos humanos fundamentales a la vida y a la paz, siendo un ejemplo de responsabilidad cívica.' }
    ];

    const accordionContainer = document.getElementById('accordion-container');
    accordionData.forEach((item) => {
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('card', 'rounded-xl', 'overflow-hidden');
        accordionItem.innerHTML = `
            <div class="accordion-header flex justify-between items-center p-6">
                <h4 class="font-semibold text-xl text-gray-800">${item.title}</h4>
                <svg class="accordion-icon w-6 h-6 text-accent-color transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            <div class="accordion-content">
                <div class="px-6 pb-6 text-gray-600 font-light border-t border-gray-200 pt-4">
                    ${item.content}
                </div>
            </div>
        `;
        accordionContainer.appendChild(accordionItem);
    });

    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.classList.remove('rotate-180');
            } else {
                document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
                document.querySelectorAll('.accordion-icon').forEach(i => i.classList.remove('rotate-180'));
                content.style.maxHeight = content.scrollHeight + "px";
                icon.classList.add('rotate-180');
            }
        });
    });

    // Back to Top Button Logic
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor click behavior
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});