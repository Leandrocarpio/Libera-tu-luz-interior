// ===== TIMER DE CUENTA REGRESIVA =====
function updateCountdown() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const diff = endOfDay - now;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const countdown1 = document.getElementById('countdown');
    const countdown2 = document.getElementById('countdown2');
    const countdownBonos = document.getElementById('countdown-bonos');
    
    if (countdown1) countdown1.textContent = timeString;
    if (countdown2) countdown2.textContent = timeString;
    if (countdownBonos) countdownBonos.textContent = timeString;
}

// Actualizar cada segundo
setInterval(updateCountdown, 1000);
updateCountdown();

// ===== FAQ ACORDEÓN =====
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Cerrar todos los FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abrir el clickeado si no estaba activo
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ===== ANIMACIONES AL SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos los elementos con clase fade-in
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== FORMULARIO DE CONTACTO CORREGIDO =====
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-form-submit');
        const originalText = submitBtn.innerHTML;
        
        // Deshabilitar botón y mostrar loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';
        
        // Limpiar mensaje anterior si existe
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        
        try {
            // Enviar formulario a Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            // Restaurar botón primero
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            if (response.ok) {
                // ÉXITO - Mensaje enviado correctamente
                formMessage.className = 'form-message success';
                formMessage.innerHTML = '<i class="bi bi-check-circle-fill"></i> ¡Mensaje enviado con éxito! Te responderemos pronto.';
                formMessage.style.display = 'block';
                
                // Limpiar formulario
                contactForm.reset();
                
                // Ocultar mensaje después de 8 segundos
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 8000);
                
                // Log para verificar (puedes removerlo en producción)
                console.log('✅ Formulario enviado correctamente a:', contactForm.action);
                
            } else {
                // ERROR en la respuesta del servidor
                const data = await response.json();
                
                if (data.errors) {
                    // Mostrar errores específicos de Formspree
                    formMessage.className = 'form-message error';
                    formMessage.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i> ' + 
                                           data.errors.map(error => error.message).join(', ');
                } else {
                    throw new Error('Error en el envío');
                }
                
                formMessage.style.display = 'block';
            }
            
        } catch (error) {
            // ERROR de red o conexión
            console.error('Error al enviar formulario:', error);
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            formMessage.className = 'form-message error';
            formMessage.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i> Hubo un error al enviar. Por favor, intenta de nuevo o escríbenos directamente a: Liberatuluzinterior.guia@gmail.com';
            formMessage.style.display = 'block';
        }
    });
}

// ===== EFECTO HOVER EN BOTONES =====
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== LOG DE CARGA =====
console.log('✨ Landing "Libera tu Luz Interior" cargada correctamente');
console.log('🚀 Timer activado - Se resetea diariamente a las 23:59:59');
console.log('💫 Animaciones de scroll activadas');
console.log('📧 Formulario de contacto con Formspree configurado');
console.log('🔍 SEO optimizado para: desarrollo personal, transformación, espiritualidad');