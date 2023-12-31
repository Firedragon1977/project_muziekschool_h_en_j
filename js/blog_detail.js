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

                // Bij de succesvolle AJAX-oproep wordt de ontvangen json-inhoud verwerkt en getoond in het div-element met "blog_detail" als id.
                success: (data) => {
                    // De meegestuurde id van het gekozen blogartikel als variabele vastleggen.
                    const blogartikelID = localStorage.getItem('blogartikelID');

                    // Het blogartikel met de juiste id opzoeken.
                    const zoekBlogartikel = data.blogartikelen.find(
                        artikel => artikel.id === parseInt(blogartikelID)
                    );

                    if (zoekBlogartikel) {
                        // De gegevens van gevonden blogartikel meegeven.
                        toonArtikel(zoekBlogartikel);
                    } else {
                        // Bij de afwezigheid van dat blogartikel wordt de melding als bericht getoond aan de gebruiker.
                        $('#blog_detail').html('Het gekozen blogartikel is niet gevonden in de database.');
                    };
                },

                // Bij de mislukte AJAX-oproep wordt de foutmelding als bericht getoond aan de gebruiker.
                error: () => {
                    $('#blog_detail').html('Er is een fout opgetreden bij het ophalen van de drie laatste blogartikelen.');
                },
            });
        }, 2000);

        // De functie opstellen speciaal voor het tonen van de drie laatste blogartikelen die opgeslagen zijn in het bestand "blog.json".
        const toonArtikel = (artikel) => {
            const blog = $('#blog_detail');
            // Het div-element met "blog_detail" als id alvast opschonen voor de onderstaande procedure.
            blog.empty();

            // De variabele alvast klaarmaken.
            const tabel = $('<table class="blog_detail"></table>');

            // De titel als een rij aanmaken.
            $(`
                <tr>
                    <td>
                        <center>
                            <strong>
                                ${artikel.titel}
                            </strong>
                        </center>
                    </td>
                </tr>
            `).appendTo(tabel);
    
            // De inhoud als een rij aanmaken. Alleen de eerste 100 letters van tekst wordt hier getoond.
            $(`
                <tr>
                    <td>
                        ${artikel.inhoud}
                    </td>
                </tr>
            `).appendTo(tabel);
    
            // De datum als een rij aanmaken.
            $(`
                <tr>
                    <td>
                        <center>
                            <em>
                                ${new Date(artikel.datum).toLocaleDateString('nl-NL', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}                        
                            </em>
                        </center>
                    </td>
                </tr>
            `).appendTo(tabel);

            // De tabel toevoegen aan het div-element met "blog_detail" als id.
            tabel.appendTo(blog);
    
            // Aan de gebruiker laten zien hoe de tabel opgebouwd is.
            // console.log(tabel.html());
        };
    });