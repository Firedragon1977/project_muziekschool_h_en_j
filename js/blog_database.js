$(document)
    // De laadpictogram laten zien wanneer de AJAX-oproep begint.    
    .ajaxStart(() => {$('#laadpictogram').show();})

    // De laadpictogram verbergen wanneer de AJAX-oproep stopt (ongeacht of het succesvol is of fout gaat).
    .ajaxStop(() => {$('#laadpictogram').hide();})

    // De script inladen nadat de pagina volledig ingeladen is.
    .ready(() => {
        // De AJAX-oproep uitvoeren met een vertraging van 2 seconden (2000 milliseconden). Dit siert ook de website.
        setTimeout(() => {
            $.ajax({
                url: '../json/blog.json',
                method: 'GET',
                dataType: 'json',

                // Bij de succesvolle AJAX-oproep wordt de ontvangen json-inhoud verwerkt en getoond in het div-element met "blog_database" als id.
                success: (data) => {
                    // Het aanroepen van de onderstaande functie waarbij de blogartikelen als gegevens vanuit het bestand "blog.json" meegegeven worden.
                    toonArtikelen(data.blogartikelen);
                },

                // Bij de mislukte AJAX-oproep wordt de foutmelding als bericht getoond aan de gebruiker.
                error: () => {
                    $('#blog_database').html('Er is een fout opgetreden bij het ophalen van alle blogartikelen.');
                },
            });
        }, 2000);

        // De functie opstellen speciaal voor het tonen van alle blogartikelen die opgeslagen zijn in het bestand "blog.json".
        const toonArtikelen = (artikelen) => {
            const blog = $('#blog_database');
            
            // Het div-element met "blog_database" als id alvast opschonen voor de onderstaande procedure.
            blog.empty();

            // De tabel opstellen met daarin de records van alle blogartikelen.
            const tabel = $(`
                <table class="blog_database">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Titel</th>
                            <th>Inhoud</th>
                            <th>Datum</th>
                        </tr>
                    </thead>
                </table>
            `);

            // De "table body" aanmaken.
            const tabel_lichaam = $('<tbody></tbody>');

            // Van elk blogartikel wordt er een record aangemaakt.
            artikelen.forEach((artikel) => {
                // De rij aanmaken.
                const rij = $('<tr></tr>');

                // De ID als een cel aanmaken.
                $(`<td>${artikel.id}</td>`).appendTo(rij);

                // De titel als een cel aanmaken.
                $(`<td>${artikel.titel}</td>`).appendTo(rij);
        
                // De inhoud als een cel aanmaken.
                $(`<td>${artikel.inhoud}</td>`).appendTo(rij);
        
                // De datum als een cel aanmaken.
                $(`<td>${artikel.datum}</td>`).appendTo(rij);

                // De aangemaakte rij wordt toegevoegd aan "table body".
                rij.appendTo(tabel_lichaam);
            });
            // De "table body" wordt toegevoegd aan tabel.
            tabel_lichaam.appendTo(tabel);

            // De tabel toevoegen aan het div-element met "blog_overzicht" als id.
            tabel.appendTo(blog);
        
            // Aan de gebruiker laten zien hoe de tabel opgebouwd is.
            // console.log(tabel.html());
        };
    });