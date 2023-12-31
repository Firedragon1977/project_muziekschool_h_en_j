// De script inladen nadat de pagina volledig ingeladen is.
$(document).ready(() => {
    // De laadpictogram laten zien wanneer de AJAX-oproep begint.
    $(document).ajaxStart(() => {
        $('#laadpictogram').show();
    });

    // De laadpictogram verbergen wanneer de AJAX-oproep stopt (ongeacht of het succesvol is of fout gaat).
    $(document).ajaxStop(() => {
        $('#laadpictogram').hide();
    });

    // De AJAX-oproep uitvoeren met een vertraging van 2 seconden (2000 milliseconden). Dit siert ook de website.
    setTimeout(() => {
        $.ajax({
            url: 'https://dennisveldhuizen.eu.pythonanywhere.com/',
            method: 'GET',
            dataType: 'html',

            // Bij de succesvolle AJAX-oproep wordt de ontvangen HTML-inhoud in het div-element met "agenda" als id geplaatst.
            success: (data) => {
                $('#agenda').html(data);
            },

            // Bij de mislukte AJAX-oproep wordt de foutmelding als bericht getoond aan aan de gebruiker.
            error: () => {
                $('#agenda').html('Er is een fout opgetreden bij het ophalen van de activiteiten.');
            },
        });
    }, 2000);
});
