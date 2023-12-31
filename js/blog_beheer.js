// De script inladen nadat de pagina volledig ingeladen is.
$(document).ready(() => {
    // De zelfgekozen datumkiezer instellen.
    $('#datum').datepicker();

    // De laadpictogram verbergen bij het laden van de pagina.
    $('#laadpictogram').hide();

    // De functie koppelen aan het formulier met "blogartikel" als id.
    $('#blogartikel').on('submit', (e) => {
        // Het standaardgedrag van het formulier voorkomen.
        e.preventDefault();

        // De gegevens van het formulier verzamelen.
        const titel = $('#titel').val();
        const inhoud = $('#tekst').val();
        const datum = $('#datum').val();

        // De formuliervalidatie uitvoeren om te voorkomen dat één of meerdere velden leeg zijn.
        if (!titel || !inhoud || !datum) {
            // Aan de gebruiker laten weten dat alles ingevuld moet worden.
            openDialoog(
                '#dialoog',
                'Attentie!',
                $('#dialoog').html(
                    'Alle velden moeten ingevuld zijn voordat het nieuwe blogartikel opgeslagen kan worden.'
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

        // De laadpictogram laten zien wanneer de AJAX-oproep begint.
        $('#laadpictogram').show();

        // De succesvolle AJAX-oproep simuleren zonder dat er daadwerkelijk de gegevens naar een server verstuurd worden.
        setTimeout(() => {
            simulerenAJAXSucces();
        }, 2000);
    });

    // De functie opstellen om de succesvolle AJAX-oproep te kunnen simuleren.
    const simulerenAJAXSucces = () => {
        // De succesmelding als bericht laten zien aan de gebruiker.
        openDialoog(
            '#dialoog',
            'Attentie!',
            $('#dialoog').html(
                'Het is goed gegaan met het opslaan van een nieuw blogartikel.'
            ),
            {
                my: "center",
                at: "center",
                of: window
            }
        );

        // Het formulier resetten na succesvolle verwerking.
        $('#blogartikel')[0].reset();

        // De laadpictogram verbergen wanneer de AJAX-oproep stopt (ongeacht of het succesvol is of fout gaat).
        $('#laadpictogram').hide();        
    };
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