// De script inladen nadat de pagina volledig ingeladen is.
$(document).ready(() => {
    // De functie koppelen aan het formulier met "contactformulier" als id.
    $('#contactformulier').on('submit', (e) => {
        // Het standaardgedrag van het formulier voorkomen.
        e.preventDefault();

        // De gegevens van het formulier verzamelen.
        const voornaam = $('#voornaam').val();
        const achternaam = $('#achternaam').val();
        const emailadres = $('#emailadres').val();
        const land = $('#land').val();
        const bericht = $('#bericht').val();

        // De formuliervalidatie uitvoeren om te voorkomen dat één of meerdere velden leeg zijn.
        if (!voornaam || !achternaam || !emailadres || !land || !bericht) {
            // Aan de gebruiker laten weten dat alles ingevuld moet worden.
            openDialoog(
                '#dialoog',
                'Attentie!',
                $('#dialoog').html(
                    'Alle velden moeten ingevuld zijn voordat het contactformulier verstuurd kan worden.'
                ),
                {
                    my: "center",
                    at: "center",
                    of: window
                }
            );

            // De verdere procedure wordt stopgezet als de validatie mislukt is.
            return;
        };

        // De succesmelding als bericht laten zien aan de gebruiker.
        openDialoog(
            '#dialoog',
            'Attentie!',
            $('#dialoog').html(
                'Het is goed gegaan met het versturen van een contactformulier.'
            ),
            {
                my: "center",
                at: "center",
                of: window
            }
        );

        // De verdere procedure wordt met een aantal seconden vertraagd om de gebruiker de tijd te geven de succesmelding te lezen.
        setTimeout(() => {
            // Het standaardgedrag van het formulier verder voortzetten.
            e.currentTarget.submit();
        }, 3000);
    });
});

// De functie opstellen speciaal voor een alert-functie.
const openDialoog = (id, titel, inhoud, positie, callback) => {
    $(id).dialog({
        // Titel.
        title: titel,
    
        // Inhoud.
        content: inhoud,
    
        // Modaal dialoogvenster instellen. Hierdoor is het niet mogelijk om de andere handelingen te kunnen doen in een venster (o.a. drukken op een button) tot het dialoogvenster weggeklikt wordt.
        modal: true,
    
        // Het dialoogvenster versleepbaar maken.
        draggable: true,
    
        // Het dialoogvenster oriënteren in de rechterbovenhoek van het venster.
        position: positie,
    
        // De afmetingen van dialoogvenster aanpasbaar maken.
        resizable: true,
    
        // Effect. Zie de website https://api.jqueryui.com/easings voor verscheidene soorten effecten.
        show: {
            easing: 'easeOutSine',
            duration: 1000
        },
    
        // Verdwijneffect.
        hide: {
            easing: 'easeOutSine',
            duration: 1000
        },
    
        // Als de dialoogvenster gesloten is, dan gaat de volgende procedure van start.
        close: () => {if (callback) {callback();};}
    });

    $(id).dialog('open');
};