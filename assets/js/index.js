const listaDeTareas = document.querySelector('#tareas');
        const tareaInput = document.querySelector('#nuevaTarea');
        const btnAgregar = document.querySelector('#agregarTarea');
        const cuentaTareas = document.querySelector('#total');
        const cuentaCompletadas = document.querySelector('#completadas');
        const tareas = [
            { id: 1, tarea: "Lavar la loza", numero: 1, completado: false },
            { id: 2, tarea: "Bañar a los gatos", numero: 2, completado: false },
            { id: 3, tarea: "Barrer el patio", numero: 3, completado: false }
        ];
        let contador = tareas.length + 1;
        let tareasCompletadas = tareas.filter(t => t.completado).length;

        btnAgregar.addEventListener("click", () => {
            agregarTarea();
        });

        tareaInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                agregarTarea();
            }
        });

        function agregarTarea() {
            const tareaTexto = tareaInput.value;
            if (tareaTexto.trim() === "") {
                alert("La tarea no puede estar vacía.");
                return;
            }
            const nuevoId = Date.now();
            tareas.push({ id: nuevoId, tarea: tareaTexto, numero: contador, completado: false });
            contador++;
            tareaInput.value = "";
            actualizarLista();
        }

        function borrar(id) {
            const index = tareas.findIndex((ele) => ele.id === id);
            if (index !== -1) {
                if (tareas[index].completado) {
                    tareasCompletadas--;
                }
                tareas.splice(index, 1);
                actualizarLista();
            }
        }

        function marcarCompletado(id) {
            const tarea = tareas.find((ele) => ele.id === id);
            if (tarea) {
                tarea.completado = !tarea.completado;
                if (tarea.completado) {
                    tareasCompletadas++;
                } else {
                    tareasCompletadas--;
                }
                actualizarLista();
            }
        }

        function actualizarLista() {
            listaDeTareas.innerHTML = "";
            tareas.forEach((tarea) => {
                const li = document.createElement("li");
                li.classList.add("listita");

                const numero = document.createElement("p");
                numero.textContent = tarea.numero;
                numero.classList.toggle("completada", tarea.completado);

                const descripcion = document.createElement("p");
                descripcion.textContent = tarea.tarea;
                descripcion.classList.toggle("completada", tarea.completado);

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.classList.add("check");
                checkbox.checked = tarea.completado;
                checkbox.addEventListener("click", () => marcarCompletado(tarea.id));

                const botonEliminar = document.createElement("button");
                botonEliminar.textContent = "Eliminar";
                botonEliminar.classList.add("eliminar");
                botonEliminar.addEventListener("click", () => borrar(tarea.id));

                li.append(numero, descripcion, checkbox, botonEliminar);
                listaDeTareas.appendChild(li);
            });

            cuentaTareas.textContent = tareas.length;
            cuentaCompletadas.textContent = tareasCompletadas;
        }
        actualizarLista();