[INSTRUCTIONS.md](https://github.com/fdnd-task/the-web-is-for-everyone-interactive-functionality/blob/main/docs/INSTRUCTIONS.md)

<h2> Beschrijving </h2>
 
**Wie is Bieb in Bloei?**
<p>Bieb in Bloei is een sociaal groenproject dat is bedacht en uitgevoerd door studenten van Living Lab Buurtcampus Oost in samenwerking met de Openbare Bibliotheek Amsterdam (OBA). Het project heeft als doel de buurtbewoners van Amsterdam Oost te verbinden door middel van duurzame en groene initiatieven. Bieb in Bloei biedt een platform voor het ruilen van stekjes, zaden en boeken, en informeert bezoekers over lokale groene projecten die bijdragen aan een duurzamere en gezondere omgeving. Het project benadrukt niet alleen het belang van natuur en groen, maar ook sociale cohesie en lokale betrokkenheid.</p>

**Over de website**
<p>Voor Bieb in Bloei heb ik een dynamische website ontwikkeld die een interactieve en gebruiksvriendelijke ervaring biedt voor bezoekers van de bibliotheek. De website biedt een overzicht van de duurzame projecten in de buurt en introduceert een online prikbord waar gebruikers hun ideeën en suggesties kunnen delen voor toekomstige projecten.

Bezoekers kunnen via het prikbord hun gedachten en plannen delen over wat zij graag zouden willen zien in hun buurt, waardoor de sociale betrokkenheid wordt vergroot en nieuwe ideeën ontstaan voor de ontwikkeling van groene initiatieven. De website is gebouwd met Node.js, Express, en Liquid, waarbij de data dynamisch wordt geladen via een CMS (Directus).

Deze aanpak maakt de website niet alleen informatief, maar ook een platform voor samenwerking en creatie van nieuwe ideeën, waarbij iedereen een stem heeft in de toekomst van het project</p>

**VISUALS**

<img width="900" alt="Scherm­afbeelding 2025-04-08 om 12 31 55" src="https://github.com/user-attachments/assets/99a4903a-c45b-42dc-9008-89e9f84640c3" />

<h2> Kenmerken </h2>

Voor dit project heb ik gebruik gemaakt van verschillende technologieën om de website dynamisch en interactief te maken. Hieronder leg ik kort uit welke tools ik heb gebruikt en laat ik wat codevoorbeelden zien zodat je beter begrijpt hoe alles werkt.

###  Gebruik van **Node.js** en **Express**

De website draait op **Node.js**, Express die aan de serverkant wordt gebruikt. Hiermee kan ik de website draaien en dynamische routes aanmaken. **Express.js** is een framework dat ik heb gebruikt om de routes te beheren en ervoor te zorgen dat alles soepel werkt.

Hier is een simpel voorbeeld van hoe een route eruit ziet die de projecten op de website weergeeft:

```
// route voor het weergeven van de projecten
app.get('/projecten', (req, res) => {
  // Haal de data op van de database of API
  const projecten = getProjectenData();
  
  // Render de pagina met de dynamisch opgehaalde data
  res.render('projecten', { projecten: projecten });
});

app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
```

### Gebruik van **Liquid** voor dynamische pagina’s

Voor de dynamische weergave van de inhoud op de website gebruik ik **Liquid**. Dit is een template engine waarmee je variabelen, loops en voorwaarden in je HTML kunt gebruiken. Het is super handig voor het ophalen van data en die te tonen op de juiste plekken op de pagina.

Een voorbeeld van hoe ik een **succes- of foutmelding** toon als iemand een project heeft gepost:

```liquid
{% if uiState == "success" %}
  <section class="alert alert-success">
    Je project is succesvol gepost!
  </section>
{% endif %}

{% if uiState == "error" %}
  <section class="alert alert-error">
    Er is een fout opgetreden bij het posten van je project.
  </section>
{% endif %}
```

Daarnaast gebruik ik Liquid om een lijst van projecten weer te geven, zoals hieronder:

```liquid
<section class="projecten">
  <section class="project-cards">
    {% if projecten %}
      {% for stekje in projecten %}
        <div class="project-card">
          <h3>{{ stekje.naam }}</h3>
          <p>{{ stekje.beschrijving }}</p>
        </div>
      {% endfor %}
    {% else %}
      <p>Er zijn geen projecten gevonden.</p>
    {% endif %}
  </section>
</section>
```

### Dynamische Routes

Met **dynamische routes** kan ik de inhoud van de website veranderen afhankelijk van welke pagina je bezoekt. Dit maakt het mogelijk om specifieke projecten of stekjes te tonen zonder dat ik elke keer handmatig een nieuwe pagina hoef te maken.

Bijvoorbeeld, hier wordt een dynamische route gemaakt om een specifieke projectpagina weer te geven:

```
app.get('/projecten/:id', (req, res) => {
  const projectId = req.params.id;
  const projectData = getProjectById(projectId);  // Haal data op voor dit specifieke project
  
  res.render('project-detail', { project: projectData });
});
```

Hier haal ik de gegevens op voor een specifiek project en toon die op een detailpagina.
<img width="455" alt="Scherm­afbeelding 2025-04-08 om 12 02 40" src="https://github.com/user-attachments/assets/3d5354c9-378c-4352-9f42-02091aa6bdc5" />

