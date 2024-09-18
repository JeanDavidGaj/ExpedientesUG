    document.addEventListener("DOMContentLoaded", function () {
        const searchButton = document.querySelector(".search-button");
        const prueba = document.querySelector(".menu-button");
        const nuaInput = document.getElementById("nua");
    
        // Campos a rellenar con los resultados
        const apellidoPaternoInput = document.getElementById("apellidoPaterno");
        const apellidoMaternoInput = document.getElementById("apellidoMaterno");
        const nombreInput = document.getElementById("nombre");
        const carreraInput = document.getElementById("carrera");
        const conceptoInput = document.getElementById("concepto");
        const anioInput = document.getElementById("anio");
    
        // Función para realizar la solicitud al backend y rellenar los campos
        function buscarAlumnoPorNUA(nua) {
            const url = `http://localhost:6010/get-AlumnoByNUA/${nua}`; // Ruta del backend
    
            // Realizar la solicitud GET
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.alumno) {
                        // Rellenar los campos del formulario con los datos recibidos
                        apellidoPaternoInput.value = data.alumno.apellidoPaterno || "";
                        apellidoMaternoInput.value = data.alumno.apellidoMaterno || "";
                        nombreInput.value = data.alumno.nombre || "";
                        carreraInput.value = data.alumno.carrera || "";
                        conceptoInput.value = data.alumno.concepto || "";
                        anioInput.value = data.alumno.anio || "";
                    } else {
                        alert("Alumno no encontrado");
                    }
                })
                .catch(error => {
                    console.error("Error al buscar el alumno:", error);
                    alert("Hubo un problema al buscar el alumno.");
                });
        }
    
        // Añadir el evento de clic al botón de la lupa
        searchButton.addEventListener("click", function (event) {
            console.log('prueba')
            event.preventDefault(); // Evita el comportamiento predeterminado del botón
            const nua = nuaInput.value.trim();
    
            if (nua) {
                // Llamar a la función de búsqueda si hay un NUA ingresado
                buscarAlumnoPorNUA(nua);
            } else {
                alert("Por favor, ingrese un NUA.");
            }
        });
    });
    

    document.addEventListener('DOMContentLoaded', function () {
        const tipoAsesoria = document.getElementById("tipoAsesoria");
        const modalidadPresencial = document.getElementById("modalidadPresencial");
        const modalidadVirtual = document.getElementById("modalidadVirtual");
        const modalidadHibrido = document.getElementById("modalidadHibrido");
    
        // Deshabilitar opciones del mismo grupo cuando se selecciona una
        tipoAsesoria.addEventListener('change', function () {
            const value = tipoAsesoria.value;
    
            if (value === "Asesoria") {
                modalidadPresencial.disabled = false;
                modalidadVirtual.disabled = false;
                modalidadHibrido.disabled = false;
            } else if (value === "Capacitacion") {
                modalidadPresencial.disabled = false;
                modalidadVirtual.disabled = false;
                modalidadHibrido.disabled = false;
            }
        });
    
        modalidadPresencial.addEventListener('change', function () {
            modalidadVirtual.disabled = modalidadPresencial.value !== "";
            modalidadHibrido.disabled = modalidadPresencial.value !== "";
        });
    
        modalidadVirtual.addEventListener('change', function () {
            modalidadPresencial.disabled = modalidadVirtual.value !== "";
            modalidadHibrido.disabled = modalidadVirtual.value !== "";
        });
    
        modalidadHibrido.addEventListener('change', function () {
            modalidadPresencial.disabled = modalidadHibrido.value !== "";
            modalidadVirtual.disabled = modalidadHibrido.value !== "";
        });
    });

    
    //correojs

    document.addEventListener('DOMContentLoaded', function () {
        const enviarButton = document.querySelector('.menu-button:nth-child(2)'); // Botón "Enviar"
    
        enviarButton.addEventListener('click', function (event) {
            event.preventDefault(); // Evita el comportamiento predeterminado del botón
    
            // Recopilar los valores del formulario
            const comunidadUG = document.getElementById("comunidadUG").value;
            const nombreSolicitante = document.getElementById("nombreSolicitante").value;
            const dependencia = document.getElementById("dependencia").value;
            const correo = document.getElementById("correo").value;
            const telefono = document.getElementById("telefono").value;
            const cargo = document.getElementById("cargo").value;
            const tipoAsesoria = document.getElementById("tipoAsesoria").value;
            const tema = document.getElementById("tema").value;
            const modalidad = document.getElementById("modalidad").value;
    
            // Validar los campos antes de enviar
            if (!nombreSolicitante || !correo || !telefono || !tema || !modalidad || !tipoAsesoria) {
                alert("Por favor, complete todos los campos antes de enviar.");
                return;
            }
    
            // Configurar los parámetros del correo
            const templateParams = {
                comunidad_ug: comunidadUG,
                nombre_solicitante: nombreSolicitante,
                dependencia: dependencia,
                correo: correo,
                telefono: telefono,
                cargo: cargo,
                tipo_servicio: tipoAsesoria,
                tema_asesoria: tema,
                modalidad: modalidad
            };
    
            // Enviar el correo electrónico usando EmailJS
            emailjs.send("service_86zl0qv", "template_1cg8aod", templateParams) // Reemplaza con tu service_id y template_id
                .then(function(response) {
                    alert("Correo enviado exitosamente!");
                }, function(error) {
                    console.error("Error al enviar el correo:", error);
                    alert("Hubo un problema al enviar el correo.");
                });
        });
    });
    