
        document.addEventListener('DOMContentLoaded', function () {
            // Mobile Menu
            const menuBtn = document.getElementById('menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            document.querySelectorAll('#mobile-menu a').forEach(link => {
                link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
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

            // Chart.js - Donut Chart with Center Text Plugin
            const centerTextPlugin = {
                id: 'centerText',
                beforeDraw: function(chart) {
                    if (chart.config.options.plugins.centerText.display) {
                        const ctx = chart.ctx;
                        const chartArea = chart.chartArea;
                        const centerX = (chartArea.left + chartArea.right) / 2;
                        const centerY = (chartArea.top + chartArea.bottom) / 2;

                        const data = chart.data.datasets[0].data;
                        const total = data.reduce((a, b) => a + b, 0);
                        const yesVotes = data[0];
                        const percentage = ((yesVotes / total) * 100).toFixed(1) + '%';

                        ctx.save();
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';

                        // Percentage Text
                        ctx.font = 'bold 2.5rem Inter, sans-serif';
                        ctx.fillStyle = '#2C2C2C';
                        ctx.fillText(percentage, centerX, centerY - 15);

                        // Label Text
                        ctx.font = 'normal 1rem Inter, sans-serif';
                        ctx.fillStyle = '#3D3D3D';
                        ctx.fillText('Votó SÍ', centerX, centerY + 20);

                        ctx.restore();
                    }
                }
            };
            Chart.register(centerTextPlugin);

            const ctx = document.getElementById('resultsChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Sí a la Paz', 'No'],
                    datasets: [{
                        data: [10000, 42],
                        backgroundColor: ['#5E8B7E', '#EAEAEA'],
                        borderColor: ['var(--card-bg)'],
                        borderWidth: 5,
                        hoverOffset: 15
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '75%',
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                        duration: 1500
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: '#2C2C2C',
                            titleFont: { size: 14, weight: 'bold' },
                            bodyFont: { size: 12 },
                            padding: 12,
                            cornerRadius: 8,
                            callbacks: {
                                label: function(context) {
                                    let label = context.label || '';
                                    if (label) { label += ': '; }
                                    if (context.parsed !== null) {
                                        label += new Intl.NumberFormat('es-CO').format(context.parsed) + ' votos';
                                    }
                                    return label;
                                }
                            }
                        },
                        centerText: {
                            display: true
                        }
                    }
                }
            });

            // Timeline Data and Logic
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
            
            const timelineContentContainer = document.getElementById('timeline-content');
            const timelineNavButtons = document.querySelectorAll('.timeline-nav-btn');
            
            function updateTimeline(year) {
                const data = timelineData[year];
                timelineContentContainer.innerHTML = `
                    <div class="card rounded-xl p-8">
                        <div class="flex items-start space-x-6">
                            <div class="text-4xl text-accent-color mt-1">${data.icon}</div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 mb-4">${data.title}</h3>
                                <p class="text-lg leading-relaxed font-light">${data.content}</p>
                            </div>
                        </div>
                    </div>
                `;
                
                timelineNavButtons.forEach(btn => {
                    btn.classList.remove('active', 'text-gray-800');
                    btn.classList.add('text-gray-500');
                    if (btn.dataset.year === year) {
                        btn.classList.add('active', 'text-gray-800');
                        btn.classList.remove('text-gray-500');
                    }
                });
            }
            
            timelineNavButtons.forEach(button => {
                button.addEventListener('click', () => {
                    updateTimeline(button.dataset.year);
                });
            });
            
            updateTimeline('1995');

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
            
            // Fade-in animation on scroll
            const faders = document.querySelectorAll('.fade-in-section');
            const appearOptions = {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            };
            const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    } else {
                        entry.target.classList.add('is-visible');
                        appearOnScroll.unobserve(entry.target);
                    }
                });
            }, appearOptions);

            faders.forEach(fader => {
                appearOnScroll.observe(fader);
            });

            // Back to Top Button Logic
            const backToTopButton = document.getElementById('back-to-top');
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('opacity-100');
                } else {
                    backToTopButton.classList.remove('opacity-100');
                }
            });

        });
    