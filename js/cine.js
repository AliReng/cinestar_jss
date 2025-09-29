const getCine = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    const data = await fetch(`http://localhost/cinestar_sweb_php/cines/${id}`);
    
    if (data.status == 200) {
        const cines = await data.json();
        const cine = cines.data;
        const peliculas = cine.peliculas || [];
        const tarifas = cine.tarifas || [];
        
        let html = `<h2>${cine.RazonSocial}</h2> <!-- TAREA -->`; 
        
        html += `
        <div class="cine-info">
            <div class="cine-info datos">
                <p>${cine.Direccion} - ${cine.Detalle}</p>
                <p>Teléfono: ${cine.Telefonos}</p>
                <br/>
                <div class="tabla">
                    <div class="fila">
                        <div class="celda-titulo">Día</div>
                        <div class="celda">Precio</div>
                    </div>`;
        
        tarifas.forEach((tarifa, index) => {
            const clase = index % 2 === 0 ? 'fila' : 'fila impar';
            html += `
                    <div class="${clase}">
                        <div class="celda-titulo">${tarifa.DiaEspanol}</div>
                        <div class="celda">S/. ${tarifa.Precio}</div>
                    </div>`;
        });
        
        html += `
                </div>
                <div class="aviso">
                    <p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya.</p>
                </div>
            </div>
            <img src="img/cine/${cine.id}.2.jpg"/>
            <br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
            <div class="cine-info peliculas">
                <div class="tabla">
                    <div class="fila">
                        <div class="celda-cabecera">Películas</div>
                        <div class="celda-cabecera">Horarios</div>
                    </div>`;
        
        peliculas.forEach((pelicula, index) => {
            const clase = index % 2 === 0 ? 'fila' : 'fila impar';
            html += `
                    <div class="${clase}">
                        <div class="celda-titulo">${pelicula.Titulo}</div>
                        <div class="celda">${pelicula.Horarios}</div>
                    </div>`;
        });
        
        html += `
                </div>
            </div>
        </div>
        <div>
            <img style="float:left;" src="img/cine/${cine.id}.3.jpg" alt="Imagen del cine"/>
            <span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
                Horario de atención de juegos es de 12:00 m hasta las 10:30 pm. 
                <br/><br/>
                Visítanos y diviértete con nosotros. 
                <br/><br/>
                <b>CINESTAR</b>, siempre pensando en ti. 
            </span>		
        </div>`;
        
        document.getElementById('contenido-interno').innerHTML = html;
    }
}

getCine();