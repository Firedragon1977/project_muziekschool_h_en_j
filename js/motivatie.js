// De lijst met inspirerende quotes ophalen.
fetch('../json/motivatie.json')
    // Als het bestand gevonden is, wordt de inhoud zichtbaar gemaakt voor de onderstaande functie "data".
    .then(reactie => reactie.json())
    
    // De procedure kan voortgezet worden.
    .then(data => {
        // De functie instellen om een willekeurig getal als index te genereren.
        const willekeurigeIndex = (max) => {
            return Math.floor(Math.random() * max);
        };

        // De willekeurige "index" als variabele alvast vastleggen.
        const index = willekeurigeIndex(data.quotes.length);
        
        // De willekeurige quote als variabele alvast vastleggen.
        const willekeurigeQuote = data.quotes[index];
        
        // De React-component opstellen voor de motivatie.
        class Motivatie extends React.Component {
            // De functie opstellen speciaal voor de onderstaande button.
            andere_quote_inladen = () => {
                window.location.reload(false);
            };

            // De Render-methode bepaalt de weergave van de component.
            render() {
                // De opgestelde html-script wordt teruggegeven.
                return (
                    <div>
                        <table class="motivatie">
                            <tr>
                                <td>
                                    <center>
                                        {willekeurigeQuote.tekst}
                                    </center>
                                </td>
                            </tr>  
                            <tr>
                                <td>
                                    <center>
                                        <em>
                                            {willekeurigeQuote.auteur}
                                        </em>
                                    </center>
                                </td>
                            </tr>                      
                        </table>
                        <center>
                            <button 
                                type="submit"
                                class="achtergrond_bruin tekst_wit"
                                onClick={this.andere_quote_inladen}>
                                    Andere quote inladen
                            </button>
                        </center>
                    </div>
                )
            }
        };

        // Het div-element met "motivatie" als id selecteren als een locatie om de React-applicatie te kunnen laten zien in het html-bestand.
        const rootElement = document.getElementById('motivatie');
        
        // De wortel (root) opstellen voor de React-applicatie met behulp van ReactDOM.createRoot.
        const root = ReactDOM.createRoot(rootElement);
        
        // Het laten zien van de React-applicatie "Motivatie" in het html-bestand.
        root.render(<Motivatie />);

    })

    // De procedure wordt stopgezet met foutmelding.
    .catch(() => {
        $('#motivatie').html('Er is fout gegaan met het inladen van de gegevens.');
    });