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

                // Bij de succesvolle AJAX-oproep wordt de ontvangen json-inhoud verwerkt en getoond in het div-element met "blog_overzicht" als id.
                success: (data) => {
                    // Het aanroepen van de onderstaande functie waarbij de blogartikelen als gegevens vanuit het bestand "blog.json" meegegeven worden.
                    toonArtikelen(data.blogartikelen);
                },

                // Bij de mislukte AJAX-oproep wordt de foutmelding als bericht getoond aan de gebruiker.
                error: () => {
                    $('#blog_overzicht').html('Er is een fout opgetreden bij het ophalen van de drie laatste blogartikelen.');
                },
            });
        }, 2000);

        // De functie opstellen speciaal voor het tonen van de drie laatste blogartikelen die opgeslagen zijn in het bestand "blog.json".
        const toonArtikelen = (artikelen) => {
            const blog = $('#blog_overzicht');
            // Het div-element met "blog_overzicht" als id alvast opschonen voor de onderstaande procedure.
            blog.empty();

            // De artikelen aflopend sorteren op basis van de id van elk blogartikel.
            artikelen.sort((a, b) => {
                return b.id - a.id;
            });        

            // De laatste drie artikelen selecteren uit de lijst.
            artikelen = artikelen.slice(0, 3);

            // De tabel opstellen van elk blogartikel.
            artikelen.forEach((artikel) => {
                const tabel = $('<table class="blog_overzicht"></table>');
                // De id wordt als waarde meegestuurd bij het openen van pagina "blog_detail.html".
                const link = $(`
                    <a href="blog_detail.html" value="${artikel.id}" class="link"></a>
                `)

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
                `).appendTo(link);
        
                // De inhoud als een rij aanmaken. Alleen de eerste 100 letters van tekst wordt hier getoond.
                $(`
                    <tr>
                        <td>
                            ${artikel.inhoud.substring(0, 50).trim()}${artikel.inhoud.length > 50 ? '...' : ''}
                        </td>
                    </tr>
                `).appendTo(link);
        
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
                `).appendTo(link);

                // De tabel toevoegen aan het a-element dat als een link vormt naar "blog_detail.html".
                link.appendTo(tabel);                

                // De link toevoegen aan het div-element met "blog_overzicht" als id.
                tabel.appendTo(blog);
        
                // Aan de gebruiker laten zien hoe de tabel opgebouwd is.
                // console.log(blog.html());
            });

            // De functie wordt gekoppeld aan het gekozen a-element met klasse "link".
            $('.link').on('click', function () {
                // De variabele opstellen voor het opslaan van de id.
                const blogartikelID = $(this).attr('value');
                
                // De id wordt lokaal opgeslagen voor de pagina "blog_detail.html".
                localStorage.setItem('blogartikelID', blogartikelID);
            });
        };
    });