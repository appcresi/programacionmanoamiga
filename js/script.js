// Datos de ejemplo - Aquí puedes cargar tus datos reales
        const coursesData = {
            "5to-grado": {
                name: "5to Grado",
                subtitle: "Primeros pasos en programación",
                icon: "🌟",
                students: [
                    {
                        name: "Arzamendia Santino",
                        project: "Mi Primera Página Web",
                        url: "5tosantinoarzamendia/index.html"
                    },
                    {
                        name: "Bonini Ortiz Mateo",
                        project: "Mi Primera Página Web",
                        url: "5tomateobonini/index.html"
                    },
                    {
                        name: "Cisnero Clara",
                        project: "Mi Primera Página Web",
                        url: "5toclaracisneros/index.html"
                    },
                    {
                        name: "Cufré Milo",
                        project: "Mi Primera Página Web",
                        url: "5tomilocufre/index.html"
                    },
                    {
                        name: "Deantoni Thiago",
                        project: "Mi Primera Página Web",
                        url: "5tothiagodeantoni/index.html"
                    },
                    {
                        name: "Galeano Manrrique Keira",
                        project: "Mi Primera Página Web",
                        url: "5tokeiramanrrique/index.html"
                    },
                    {
                        name: "Gauna Facundo",
                        project: "Mi Primera Página Web",
                        url: "5tofacundogauna/index.html"
                    },
                    {
                        name: "Gimenez Faustina",
                        project: "Mi Primera Página Web",
                        url: "5tofaustinagimenez/index.html"
                    },
                    {
                        name: "Gomez Sofia",
                        project: "Mi Primera Página Web",
                        url: "5tosofiagomez/index.html"
                    },
                    {
                        name: "Gonzalez Bruno",
                        project: "Mi Primera Página Web",
                        url: "5tobrunogonzalez/index.html"
                    },
                    {
                        name: "Izquierdo Francisco",
                        project: "Mi Primera Página Web",
                        url: "5tofranciscoizquierdo/index.html"
                    },
                    {
                        name: "Maiokas Sol",
                        project: "Mi Primera Página Web",
                        url: "5tosolmaiokas/index.html"
                    },
                    {
                        name: "Sanabria Luana",
                        project: "Mi Primera Página Web",
                        url: "5toluanasanabria/index.html"
                    }
                ]
            },
            "6to-grado": {
                name: "6to Grado",
                subtitle: "Explorando CSS y diseño",
                icon: "🎨",
                students: [
                    {
                        name: "Codaro Mercedes",
                        project: "Mi Primera Página Web",
                        url: "6to/6tocodaromercedes/index.html"
                    },
                    {
                        name: "Dellepiane Renata",
                        project: "Mi Primera Página Web",
                        url: "6to/6todelleianerenata/index.html"
                    },
                    {
                        name: "Lescano Máxima",
                        project: "Mi Primera Página Web",
                        url: "6to/6tolescanomaxima/index.html"
                    },
                ]
            },
            "5to-año": {
                name: "5to Año - Secundaria",
                subtitle: "JavaScript y interactividad",
                icon: "⚡",
                students: [
                ]
            },
            "6to-año": {
                name: "6to Año - Secundaria",
                subtitle: "Proyectos web avanzados",
                icon: "🚀",
                students: [
                    
                ]
            }
        };

        let currentView = 'courses';
        let currentCourse = null;
        let allStudents = [];

        // Elementos del DOM
        const coursesGrid = document.getElementById('coursesGrid');
        const studentsGrid = document.getElementById('studentsGrid');
        const coursesView = document.getElementById('coursesView');
        const studentsView = document.getElementById('studentsView');
        const backBtn = document.getElementById('backBtn');
        const searchInput = document.getElementById('searchInput');
        const modal = document.getElementById('projectModal');
        const modalTitle = document.getElementById('modalTitle');
        const projectFrame = document.getElementById('projectFrame');
        const closeModal = document.getElementById('closeModal');

        // Preparar datos de todos los estudiantes para búsqueda
        function prepareStudentsData() {
            allStudents = [];
            Object.keys(coursesData).forEach(courseId => {
                const course = coursesData[courseId];
                course.students.forEach(student => {
                    allStudents.push({
                        ...student,
                        courseId: courseId,
                        courseName: course.name
                    });
                });
            });
        }

        // Generar cursos
        function generateCourses() {
            coursesGrid.innerHTML = '';
            Object.keys(coursesData).forEach(courseId => {
                const course = coursesData[courseId];
                const courseCard = document.createElement('div');
                courseCard.className = 'course-card';
                courseCard.onclick = () => showStudents(courseId);
                
                courseCard.innerHTML = `
                    <div class="course-header">
                        <div class="course-icon">${course.icon}</div>
                        <div>
                            <div class="course-title">${course.name}</div>
                            <div class="course-subtitle">${course.subtitle}</div>
                        </div>
                    </div>
                    <div class="students-count">
                        👥 ${course.students.length} estudiantes
                    </div>
                `;
                
                coursesGrid.appendChild(courseCard);
            });
        }

        // Mostrar estudiantes de un curso
        function showStudents(courseId) {
            currentCourse = courseId;
            currentView = 'students';
            const course = coursesData[courseId];
            
            coursesView.style.display = 'none';
            studentsView.style.display = 'block';
            backBtn.classList.add('active');
            
            generateStudents(course.students);
        }

        // Generar tarjetas de estudiantes
        function generateStudents(students) {
            studentsGrid.innerHTML = '';
            studentsGrid.classList.add('active');
            
            students.forEach(student => {
                const studentCard = document.createElement('div');
                studentCard.className = 'student-card';
                
                const initials = student.name.split(' ').map(n => n[0]).join('');
                
                studentCard.innerHTML = `
                    <div class="student-avatar">${initials}</div>
                    <div class="student-name">${student.name}</div>
                    <div class="project-title">"${student.project}"</div>
                    <button class="view-project-btn" onclick="openProject('${student.name}', '${student.project}', '${student.url}')">
                        Ver Proyecto 🔗
                    </button>
                `;
                
                studentsGrid.appendChild(studentCard);
            });
        }

        // Volver a la vista de cursos
        function showCourses() {
            currentView = 'courses';
            currentCourse = null;
            
            coursesView.style.display = 'block';
            studentsView.style.display = 'none';
            backBtn.classList.remove('active');
            studentsGrid.classList.remove('active');
            
            searchInput.value = '';
        }

        // Abrir proyecto en modal
        function openProject(studentName, projectTitle, url) {
            modalTitle.textContent = `${projectTitle} - ${studentName}`;
            projectFrame.src = url;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        // Cerrar modal
        function closeProjectModal() {
            modal.style.display = 'none';
            projectFrame.src = '';
            document.body.style.overflow = 'auto';
        }

        // Búsqueda de estudiantes
        function searchStudents(query) {
            if (!query.trim()) {
                if (currentView === 'courses') {
                    generateCourses();
                } else if (currentCourse) {
                    generateStudents(coursesData[currentCourse].students);
                }
                return;
            }

            const filteredStudents = allStudents.filter(student => 
                student.name.toLowerCase().includes(query.toLowerCase()) ||
                student.project.toLowerCase().includes(query.toLowerCase())
            );

            if (filteredStudents.length > 0) {
                // Cambiar a vista de estudiantes si estamos en cursos
                if (currentView === 'courses') {
                    coursesView.style.display = 'none';
                    studentsView.style.display = 'block';
                    backBtn.classList.add('active');
                }
                
                // Mostrar estudiantes filtrados con información del curso
                studentsGrid.innerHTML = '';
                studentsGrid.classList.add('active');
                
                filteredStudents.forEach(student => {
                    const studentCard = document.createElement('div');
                    studentCard.className = 'student-card';
                    
                    const initials = student.name.split(' ').map(n => n[0]).join('');
                    
                    studentCard.innerHTML = `
                        <div class="student-avatar">${initials}</div>
                        <div class="student-name">${student.name}</div>
                        <div class="project-title">"${student.project}"</div>
                        <div style="color: #888; font-size: 0.9rem; margin-bottom: 10px;">
                            📚 ${student.courseName}
                        </div>
                        <button class="view-project-btn" onclick="openProject('${student.name}', '${student.project}', '${student.url}')">
                            Ver Proyecto 🔗
                        </button>
                    `;
                    
                    studentsGrid.appendChild(studentCard);
                });
            } else {
                studentsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: white; font-size: 1.2rem;">No se encontraron estudiantes 😔</p>';
            }
        }

        // Event listeners
        backBtn.addEventListener('click', showCourses);
        closeModal.addEventListener('click', closeProjectModal);
        searchInput.addEventListener('input', (e) => searchStudents(e.target.value));

        // Cerrar modal al hacer clic fuera
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProjectModal();
            }
        });

        // Inicialización
        window.addEventListener('DOMContentLoaded', () => {
            prepareStudentsData();
            generateCourses();
        });

        // Función para animar contadores
function animateCounter(element, finalValue, duration = 2000, suffix = '') {
    let startValue = 0;
    let startTime = null;
    
    // Extraer solo el número del texto
    const numericValue = parseInt(finalValue.toString().replace(/\D/g, ''));
    
    function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Función de easing para una animación más suave
        const easedProgress = easeOutCubic(progress);
        
        const currentValue = Math.floor(easedProgress * numericValue);
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Asegurar que el valor final sea exacto
            element.textContent = finalValue;
        }
    }
    
    requestAnimationFrame(animate);
}

// Función de easing para una animación más suave
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Función para detectar cuando un elemento entra en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función principal para inicializar las animaciones
function initCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const animatedElements = new Set();
    
    function checkAndAnimate() {
        statNumbers.forEach(element => {
            if (isInViewport(element) && !animatedElements.has(element)) {
                animatedElements.add(element);
                
                const originalText = element.textContent;
                const hasPlus = originalText.includes('+');
                const suffix = hasPlus ? '+' : '';
                
                // Iniciar la animación
                animateCounter(element, originalText, 2000, suffix);
            }
        });
    }
    
    // Verificar al cargar la página
    checkAndAnimate();
    
    // Verificar al hacer scroll
    window.addEventListener('scroll', checkAndAnimate);
    
    // Verificar al redimensionar la ventana
    window.addEventListener('resize', checkAndAnimate);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initCounterAnimations);

// También funciona si el script se carga después del DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounterAnimations);
} else {
    initCounterAnimations();
}