// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

console.log 
// database linken
const stekjesResponse = await fetch('https://fdnd-agency.directus.app/items/bib_stekjes')
const stekjesResponseJSON = await stekjesResponse.json()

const afbeeldingenResponse = await fetch('https://fdnd-agency.directus.app/items/bib_afbeeldingen?filter={%20%22type%22:%20{%20%22_eq%22:%20%22stekjes%22%20}}')
const afbeeldingenResponseJSON = await afbeeldingenResponse.json()

const usersResponse = await fetch('https://fdnd-agency.directus.app/items/bib_users')
const usersResponseJSON = await usersResponse.json()


// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Maak een GET route voor de index (meestal doe je dit in de root, als /)
app.get('/', async function (request, response) {
  // Render index.liquid uit de Views map
  
  // Geef hier eventueel data aan mee
  response.render('index.liquid', {
   stekjes: stekjesResponseJSON.data,
   afbeeldingen: afbeeldingenResponseJSON.data,
   users: usersResponseJSON.data
  })
})

app.get('/stekjes/:id', async function (request, response) {
 const stekjeId = request.params.id;
 const stekjeResponse = await fetch(`https://fdnd-agency.directus.app/items/bib_stekjes/${stekjeId}`);
 const stekjeData = await stekjeResponse.json();


 response.render('stekjes.liquid', { stekje: stekjeData.data });
});

// Projects array voor tijdelijke opslag
let projects = [];

// GET-route voor de projectpagina
app.get('/project', async function (req, res) {
  // Variabele voor UI states (bijvoorbeeld succesbericht)
  const uiState = req.query.state || 'normal'; // Normale state als er geen state is

  res.render('project.liquid', { projects, uiState });
});

// POST-route voor het formulier (project toevoegen)
app.post('/project', (req, res) => {
  const { title, description, name } = req.body;

  // Validatie en success/error feedback
  if (!title || !description || !name) {
    return res.redirect('/project?state=error'); // Error state bij incomplete invoer
  }

  // Voeg een uniek ID toe aan elk project
  const id = Date.now();
  projects.push({ id, title, description, name });

  res.redirect('/project?state=success'); // Succes state bij succesvol indienen
});

// POST-route voor het verwijderen van een project
app.post('/delete-project', (req, res) => {
  const { id } = req.body;

  // Verwijder het project met het opgegeven ID
  projects = projects.filter(project => project.id !== parseInt(id));

  res.redirect('/project?state=deleted'); // Succesbericht voor verwijdering
});


/*
// Zie https://expressjs.com/en/5x/api.html#app.get.method over app.get()
app.get(…, async function (request, response) {
  
  // Zie https://expressjs.com/en/5x/api.html#res.render over response.render()
  response.render(…)
})
*/

/*
// Zie https://expressjs.com/en/5x/api.html#app.post.method over app.post()
app.post(…, async function (request, response) {

  // In request.body zitten alle formuliervelden die een `name` attribuut hebben in je HTML
  console.log(request.body)

  // Via een fetch() naar Directus vullen we nieuwe gegevens in

  // Zie https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch over fetch()
  // Zie https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify over JSON.stringify()
  // Zie https://docs.directus.io/reference/items.html#create-an-item over het toevoegen van gegevens in Directus
  // Zie https://docs.directus.io/reference/items.html#update-an-item over het veranderen van gegevens in Directus
  await fetch(…, {
    method: …,
    body: JSON.stringify(…),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // Redirect de gebruiker daarna naar een logische volgende stap
  // Zie https://expressjs.com/en/5x/api.html#res.redirect over response.redirect()
  response.redirect(303, …)
})
*/

 

app.use((req, res, next) => {
  res.status(404).render('404.liquid');
})


// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})