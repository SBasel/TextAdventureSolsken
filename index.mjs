import fsBase from 'fs';
import { promises as fs } from 'fs';
import readlineSync from 'readline-sync';
import { getAsciiArt } from './image.js';


const asciiArt = getAsciiArt();

let name = "";
let charWeapon = "";
let charClass = "";
let indexClass = "";
let indexWeapon = "";

if (readlineSync.keyInYN('Möchtest du dein Abenteuer starten? ')) {
  console.log('Spiel wird gestartet ...');
  if (readlineSync.keyInYN('Hast du einen Charakter? ')) {
    const filePath = 'datei.json';

    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);

      name = data.name;
      charClass = data.class;
      charWeapon = data.weapon;
    } catch (error) {
      console.log('Es gab einen Fehler beim Laden der Charakterdaten.');
      console.error(error);
      process.exit(1);
    }

    console.log('Du erwachst an der dir bekannten Kreuzung.');
    askDirection();
  } else {
    newChar();
    console.log('Spiel endet...');
    // Do something...
  }

function showNextStep() {
  const text = "Du stehst an einer idyllischen Kreuzung an einem strahlend sonnigen Tag. Die warmen Sonnenstrahlen streicheln dein Gesicht und erfüllen die Luft mit einer erfrischenden Leichtigkeit.\n\nBeim Blick nach Süden erblickst du eine geschäftige Stadt, die mit pulsierendem Leben und faszinierenden Möglichkeiten lockt. Die Skyline erhebt sich majestätisch, und das Summen der Menschen und die Rufe der Markthändler dringen zu dir herüber.\n\nIm Westen erstrecken sich endlose Felder bis zum Horizont, deren goldenen Halme im sanften Wind wiegen. Ein malerisches kleines Dorf schmiegt sich zwischen den Feldern, und aus der Ferne hörst du das fröhliche Lachen der Dorfbewohner und das Klappern der Pferdewagen, die ihre Ernte nach Hause bringen.\n\nDein Blick nach Norden fällt auf einen geheimnisvollen Wald, der dich mit seinem dichten Blätterdach und den sanft schimmernden Sonnenstrahlen, die durch die Baumkronen dringen, fasziniert. Die Stille wird nur von den Klängen der Vögel und dem leisen Rascheln der Tiere unterbrochen. Du spürst die verborgene Magie des Waldes und das Versprechen von Abenteuern, die darauf warten, entdeckt zu werden.\n\nIm Osten erstrecken sich majestätische Gebirgsketten, deren schroffen Gipfel den Himmel zu berühren scheinen. Ihre imposante Präsenz erfüllt dich mit Ehrfurcht, während du die schroffen Klippen und die glitzernden Wasserfälle bewunderst, die ihren Weg hinabstürzen. Der Anblick der majestätischen Berge erinnert dich an die Grenzen der Welt und weckt das Verlangen nach epischen Entdeckungen und mutigen Expeditionen.\n\nStehend an dieser malerischen Kreuzung fühlst du das Kribbeln der Abenteuerlust in deinen Adern. Es liegt an dir, welchen Weg du einschlagen wirst und welche Geheimnisse und Erlebnisse dich auf deiner Reise erwarten.";

  function typeText(text, delay) {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index === text.length) {
        clearInterval(intervalId);
        console.log();
        askDirection();
      } else if (text[index] === '\n') {
        console.log();
      } else {
        process.stdout.write(text[index]);
      }
      index++;
    }, delay);
  }

  typeText(text, 25);
}

function askDirection() {
  let richtung = ['Norden', 'Osten', 'Süden', 'Westen'];
  let indexrichtung = readlineSync.keyInSelect(richtung, 'In welche Richtung möchtest du reisen? ');

  if (indexrichtung === 0) {
    console.log('Du begibst dich in Richtung Norden zum großen Wald.\n\nDer Wald präsentiert sich als ein erhabenes und mystisches Labyrinth aus uralten Bäumen, deren mächtige Wipfel ein grünes Dach bilden und das Sonnenlicht in ein weiches, schattiges Schimmern verwandeln. Der Untergrund ist ein Teppich aus jahrzehntealtem Laub, das unter deinen Füßen knistert, während du dich vorsichtig auf dem verwucherten Pfad fortbewegst. Es ist so dicht hier, dass du kaum den Weg erkennen kannst, und die dichten Dornenbüsche zu beiden Seiten des Pfads scheinen den Fortschritt unmöglich zu machen.\n\n Rechts vom Pfad bemerkst du einen seltsamen Stein, der sich von der natürlichen Umgebung abhebt. Er ist sorgfältig behauen und in seinem Zentrum befindet sich ein merkwürdiges, sechseckiges Loch. Die Form des Loches lässt vermuten, dass es für einen Smaragd von genau dieser Form gemacht wurde. Du betrachtest es und fragst dich, was wohl passieren könnte, wenn du den passenden Stein findest und einsetzt. Das Geheimnis dieses Ortes scheint sich hinter diesem rätselhaften Stein zu verbergen.');

    waldEingangActions();

  } else if (indexrichtung === 1) {
    console.log('Du begibst dich in Richtung Osten zum Gebirge.\n');

    gebirgeEingangActions()

  } else if (indexrichtung === 2) {
    console.log(`Du begibst dich in Richtung Süden zur großen Stadt.\n\nDas Tor zur Stadt ist verschlossen. Rechts uns Links neben den Tor stehen Wachen. \n\n${asciiArt}`);

    stadtEingangActions()

  } else if (indexrichtung === 3) {
    console.log('Du begibst dich in Richtung Westen zum Dorf.\n');

    dorfEingangActions()

  } else {
    console.log('Spiel endet...');
    // Do something...
  }
}

///Norden
function waldEingangActions() {
  let waldEingang = ['Waffe benutzen', 'Item benutzen', 'umkehren'];
  let indexwaldEingang = readlineSync.keyInSelect(waldEingang, 'Was möchtest du tun? ');

  if (indexwaldEingang === 0) {
    console.log(`Deine ${charWeapon} hat keinen Effekt.\n`);
    while (indexwaldEingang === 0 || indexwaldEingang === 1 || indexwaldEingang === 2) {
      indexwaldEingang = readlineSync.keyInSelect(waldEingang, 'Was möchtest du tun? ');
    }
  } else if (indexwaldEingang === 1) {
    openInventoryWald()

  } else if (indexwaldEingang === 2) {
    askDirection();
  }
}

function waldTempel() {
  let waldTempel = ['Tempel betreten', 'umkehren'];
  let indexwaldTempel = readlineSync.keyInSelect(waldTempel, 'Was möchtest du tun? ');

  if (indexwaldTempel === 0) {
    schwertRätsel();
  } else if (indexwaldTempel === 1) {
    askDirection();

  }
}

function openInventoryWald() {
  const inventoryFilePath = 'inventar.json';

  try {
    const inventoryContent = fsBase.readFileSync(inventoryFilePath, 'utf8');
    const inventoryData = JSON.parse(inventoryContent);

    if (inventoryData.length === 0) {
      console.log('Das Inventar ist leer.');
      waldEingangActions();
    } else {
      console.log('Inventar:');
      for (const item of inventoryData) {
        console.log(`- ${item}`);
      }

      const index = readlineSync.keyInSelect(inventoryData, 'Welchen Gegenstand möchten Sie auswählen?');
      if (index === -1) {
        console.log('Sie haben abgebrochen. Sie werden zur letzten Funktion zurückgebracht.\n');
        return waldEingangActions();
      } else {
      console.log(`Sie haben den Gegenstand "${inventoryData[index]}" ausgewählt.\n`);

      if(inventoryData[index] === 'Smaragd') {
      waldTempel();
      } else {
      console.log('Dieser Gegenstand passt hier nicht.');
      openInventoryWald();
      }
}
    }
    console.log();
  } catch (error) {
    console.log('Es gab einen Fehler beim Laden des Inventars.');
    console.error(error);
  }
}

async function schwertRätsel() {
  console.log("Du betritts den Tempel und siehst ein reich verziertes Schwert in einem Stein stecken." );
  let waldSchwert = ['Schwert raus ziehen', 'umkehren'];
  let indexSchwert = readlineSync.keyInSelect(waldSchwert, 'Was möchtest du tun? ');

  let indeximStein = 0;  // Initiale Position des Schwerts
  let correctCount = 0;  // Zähler für korrekte Antworten

if (indexSchwert === 0) {
  for (let i = 0; i < 5; i++) {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);

    const correctAnswer = num1 + num2;

    const userAnswer = readlineSync.question(`Was ist ${num1} + ${num2}? `);

    if (parseInt(userAnswer) === correctAnswer) {
      console.log('Richtig!');
      correctCount++;
    } else {
      console.log(`Falsch. Die richtige Antwort ist ${correctAnswer}.`);
    }
  }
  
  if (correctCount === 5) {
    await addInventoryWald("Verziertes Schwert");
    console.log("Du hast das Schwert aus dem Stein gezogen. Du hörst ein Rumpeln und der Tempel fängt an zu beben. Du schnappst dir das Schwert und rennst...");
    askDirection();
  }
}else if (indexwaldEingang === 1) {
    askDirection();

  }
  
}

async function addInventoryWald(item) {
  try {
    // Inventar laden
    const content = await fs.readFile('inventar.json', 'utf8');
    let inventory = JSON.parse(content);

    // Überprüfen, ob der "Smaragd" im Inventar ist
    const smaragdIndex = inventory.indexOf("Smaragd");
    if(smaragdIndex !== -1) {
      // Wenn ja, entfernen Sie es
      inventory.splice(smaragdIndex, 1);
    }

    // Neues Item zum Inventar hinzufügen
    inventory.push(item);

    // Inventar speichern
    const updatedContent = JSON.stringify(inventory);
    await fs.writeFile('inventar.json', updatedContent, 'utf8');

    console.log(`"${item}" wurde zum Inventar hinzugefügt.`);
  } catch (error) {
    console.error(`Es gab einen Fehler beim Hinzufügen des Gegenstandes zum Inventar: ${error}`);
  }
}

//Gebirge
function gebirgeEingangActions() {
  let gebirgeEingang = ['Gebirgspass folgen', 'umkehren'];
  let indexGebirgeEingang = readlineSync.keyInSelect(gebirgeEingang, 'Was möchtest du tun? ');

  if (indexGebirgeEingang === 0) {
    console.log(`Du siehst einen gewunden gebirgsfahrt vor dir`);
    textBasedJumpAndRun();
  } else if (indexGebirgeEingang === 1) {
    askDirection();
  } else if (indexGebirgeEingang === -1) {
    askDirection();
  }
}

async function textBasedJumpAndRun() {
  const obstacles = ['niederer Ast', 'großer Stein', 'breite Lücke', 'schlammiges Gebiet'];
  let score = 0;
  
  for (let i = 0; i < 10; i++) {
    const obstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
    
    console.log(`Ein Hindernis taucht vor dir auf: ${obstacle}`);
    
    let options;
    
    if (obstacle === 'niederer Ast') options = ['ducken', 'springen'];
    else if (obstacle === 'großer Stein') options = ['springen', 'umgehen'];
    else if (obstacle === 'breite Lücke') options = ['weitsprung', 'umgehen'];
    else if (obstacle === 'schlammiges Gebiet') options = ['langsamer werden', 'beschleunigen'];

    const index = readlineSync.keyInSelect(options, 'Was möchtest du tun?');
    
    if ((obstacle === 'niederer Ast' && options[index] === 'ducken') ||
        (obstacle === 'großer Stein' && options[index] === 'umgehen') ||
        (obstacle === 'breite Lücke' && options[index] === 'weitsprung') ||
        (obstacle === 'schlammiges Gebiet' && options[index] === 'langsamer werden')) {
          score++;
          console.log(`Du hast das Hindernis erfolgreich überwunden! Bisherige überwundene Hindernisse: ${score}/10`);
    } else {
      console.log('Du bist auf ein Hindernis gestoßen und wurdest zurück zum Gebirgseingang gebracht.');
      gebirgeEingangActions();
      return;
    }
  }
  
  console.log(`Du hast das Ende des Laufs erreicht und hast insgesamt ${score} Hindernisse überwunden.`);
  imGebirge();
}

function imGebirge(){
  console.log("Du stehst vor einer dunklen Höle ein grollen ist daraus zu hören")
  let imGebirge = ['Hinein gehen', 'umkehren'];
  let indexImGebirge = readlineSync.keyInSelect(imGebirge, 'Was möchtest du tun? ');

  if (indexImGebirge === 0) {
    drachenHöhle()
  } else if (indexImGebirge === 1) {
    gebirgeEingangActions();
  } else if (indexImGebirge === -1) {
    gebirgeEingangActions();
  }
}

function drachenHöhle() {
    console.log(`Mit jedem Schritt, den du tiefer in die dunkle Höhle wagst, wirgt du das Grollen lauter und bedrohlicher. Deine Sinne sind geschärft, jedes Geräusch lässt dich zusammenzucken. Es riecht nach Schwefel und verbranntem Fleisch, und die stickige, heiße Luft lässt dich fast ersticken. Du fühlst die Wärme von dem Feuer, das in der Tiefe der Höhle brennt und die Wände in ein unheimliches, flackerndes Licht taucht.\n\nPlötzlich trittst du in eine riesige Höhle, und dort vor dir, auf einem gewaltigen Haufen von Gold und Edelsteinen, liegt der Drache. Seine riesigen Flügel sind zusammengeklappt, seine Augen sind geschlossen, er ist schlafend.`);

    const optionen = ['Waffe benutzen', 'Item benutzen', 'umkehren'];
    const index = readlineSync.keyInSelect(optionen, 'Was möchtest du tun?');

    switch (index) {
        case 0:
            console.log(`Du greifst die Drachen mit deinem ${charWeapon} an. Der Drache erwacht dein ${charWeapon} scheint keinerlei Wirkung zu haben.\n\n Der Drache brüllt und lässt dabei einen mächtigen Feuerstoß auf dich nieder brasseln.\n\n»»————-　☠　————-««\n»»————-　☠　————-««\n»»————-　☠　————-««\n»»————-　☠　————-««\n`);
            console.log('Du erwachst an der dir bekannten Kreuzung.');
            askDirection();
            break;
        case 1:
            openInventoryHöhle();
            break;
        case 2:
            askDirection();
            break;
        case -1:
            askDirection();
            break;
    }
}


function openInventoryHöhle(){
const inventoryFilePath = 'inventar.json';

  try {
    const inventoryContent = fsBase.readFileSync(inventoryFilePath, 'utf8');
    const inventoryData = JSON.parse(inventoryContent);

    if (inventoryData.length === 0) {
      console.log('Das Inventar ist leer.');
      drachenHöhle();
    } else {
      console.log('Inventar:');
      for (const item of inventoryData) {
        console.log(`- ${item}`);
      }

      const index = readlineSync.keyInSelect(inventoryData, 'Welchen Gegenstand möchten Sie auswählen?');
      if (index === -1) {
        console.log('Sie haben abgebrochen. Sie werden zur letzten Funktion zurückgebracht.\n');
        return drachenHöhle();
      } else {
      console.log(`Sie haben den Gegenstand "${inventoryData[index]}" ausgewählt.\n`);

      if(inventoryData[index] === 'Verziertes Schwert') {
      drachenKampf();
      } else {
      console.log('Dieser Gegenstand passt hier nicht.');
      openInventoryHöhle();
      }
}
    }
    console.log();
  } catch (error) {
    console.log('Es gab einen Fehler beim Laden des Inventars.');
    console.error(error);
  }
}

async function drachenKampf() {
    console.log("Der Drache liegt schlafend vor dir. Du spürst die Hitze seines Atems bei jedem grollenden Schnarchen. Du musst den perfekten Moment abpassen, um ihn dreimal anzutacken.");

    let successfulHits = 0; // Anzahl der erfolgreichen Angriffe

    while (successfulHits < 3) {
        const maxTime = 5000; // max 5 Sekunden warten
        const minTime = 2000; // min 2 Sekunden warten
        const idealTime = Math.floor(Math.random() * (maxTime - minTime) + minTime);

        console.log("Du musst genau " + idealTime / 1000 + " Sekunden warten, bevor du den Drachen angreifst.");
        
        const startTime = Date.now();

        readlineSync.question("Drücke ENTER, um den Drachen anzugreifen...");

        const endTime = Date.now();
        const reactionTime = endTime - startTime;

        if (Math.abs(reactionTime - idealTime) <= 1000) {
            console.log("Perfekt! Du hast den Drachen getroffen!");
            successfulHits++;
        } else {
            console.log("Du hast den Drachen zu früh oder zu spät getroffen und er ist aufgewacht. Du musst schnell fliehen!");
            drachenKampf();
            return; // Funktion sofort beenden, da der Drachen aufgewacht ist
        }
    }

    console.log("Fantastisch! Du hast den Drachen besiegt!");
    siegerParade();
}

function siegerParade(){
    const text = `Der Drache wurde bezwungen.\n\nDas königreich wurde von seinem dunklen Fluch befreit der wie ein damoglis Schwert über ihm lag\n\nDer Held ${name} eine ${charClass} hat das Land befreit.\n\nUnser ganzer Dank gebührt ihm\n\n»»————————————————««\nCredits\n\nCreater:Solsken\nCo-Creater: ChatGPT\n\n»»————————————————««\nEnde`;

  function typeText(text, delay) {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index === text.length) {
        clearInterval(intervalId);
        console.log();
      } else if (text[index] === '\n') {
        console.log();
      } else {
        process.stdout.write(text[index]);
      }
      index++;
    }, delay);
  }

  typeText(text, 25)
}

//Stadt
function stadtEingangActions() {
  let stadtEingang = ['Waffe benutzen', 'Item benutzen', 'umkehren'];
  let indexStadtEingang = readlineSync.keyInSelect(stadtEingang, 'Was möchtest du tun? ');

  if (indexStadtEingang === 0) {
    console.log(`Du greifst die Wachen mit deinem ${charWeapon} an. Die erste Wache fällt zu boden.\n\n Die andere Wache reagiert jedoch so schnell und streckt dich nieder.\n\n»»————-　☠　————-««\n»»————-　☠　————-««\n»»————-　☠　————-««\n»»————-　☠　————-««\n`);
    console.log('Du erwachst an der dir bekannten Kreuzung.');
    askDirection();
  } else if (indexStadtEingang === 1) {
    openInventoryStadt();
  } else if (indexStadtEingang === 2) {
    askDirection();
  }else if (indexStadtEingang === -1) {
    askDirection();
  }
}

async function stadtMarktplatz() {
  // Laden Sie das Inventar, um den Smaragd-Status zu überprüfen
  const content = await fs.readFile('inventar.json', 'utf8');
  let inventory = JSON.parse(content);

  console.log("Du betrittst den zentralen Marktplatz der Stadt...");

  await handleStadtMarktplatzOptions(inventory);
}

async function handleStadtMarktplatzOptions(inventory) {
  let stadtMarktplatz = ['Stein betrachten', 'umkehren'];
  let indexStadtMarktplatz = readlineSync.keyInSelect(stadtMarktplatz, 'Was möchtest du tun? ');

  if (indexStadtMarktplatz === 0) {
    console.log(`Du näherst dich dem Stein und erkennst eine alte verwitterte Inschrift`);

    // Überprüfen Sie, ob der Smaragd im Inventar ist
    if (inventory.includes('Smaragd')) {
      console.log("Du hast bereits den Smaragd in deinem Besitz.");
      // Bringen Sie den Benutzer zurück zum Hauptmenü oder führen Sie eine andere Aktion durch...
      handleStadtMarktplatzOptions(inventory);
    } else {
      // Wenn der Smaragd nicht im Inventar ist, gehen Sie zum Rätsel
      stadtRätsel();
    }
    
  } else if (indexStadtMarktplatz === 1) {
    askDirection();
  } else if (indexStadtMarktplatz === -1) {
    askDirection();
  }
}



function stadtRätsel(){
  console.log("In den Schatten des Ostgebirges haust ein Schrecken, eine Bestie aus einer vergangenen Zeit. Ihr Atem ist Tod, ihre Augen sind Verderben. Nur ein wahrer Held kann das Ungeheuer bezwingen und unsere Welt vor ihrer vernichtenden Wut retten.\n\nSuche nach dem Schatz des Nordens, verborgen tief im finsteren Wald. Nur dieses Kleinod kann dir die Macht verleihen, die du brauchst, um gegen die Bestie anzutreten.\n\nUnter dieser Inschrift ruht ein Smaragd, so grün wie die Wälder im Frühling, so funkelnd wie die Sterne in der dunkelsten Nacht. Löse das Rätsel, das in den Runen verborgen liegt, und der Smaragd wird dein sein. Mit ihm wird auch die Macht sein, das Böse zu besiegen und Frieden zurück in unsere Welt zu bringen. Wähle deinen Weg weise, mutiger Held, denn das Schicksal von uns allen ruht in deinen Händen.")

  let stadtRätsel = ['Rätsel lösen', 'umkehren'];
  let indexStadtRätsel = readlineSync.keyInSelect(stadtRätsel, 'Was möchtest du tun? ');

  if (indexStadtRätsel  === 0) {
    solveRiddle1();
  } else if (indexStadtRätsel  === 1) {
    stadtMarktplatz();
  }else if (indexStadtRätsel  === -1) {
    stadtMarktplatz();
  }
}

function solveRiddle1() {
  const options = ["Zwei", "Drei", "Vier"];
  const answer = readlineSync.keyInSelect(options, "Rätsel 1: Welche Zahl ergänzt die Funktion `magischeFunktion(3, ?, 9)`, so dass sie 54 ergibt?");

  // Da keyInSelect den Index der ausgewählten Option zurückgibt (beginnend bei 0), sollte die richtige Antwort dem Index 0 entsprechen
  if (answer === 0) {
    console.log("Richtig! Der Weg zum Schatz ist einen Schritt näher.\n");
    solveRiddle2();
  } else {
    console.log("Falsch! Der Weg zum Schatz bleibt verborgen.\n");
    solveRiddle1();
  }
}


function solveRiddle2() {
  const options = ["Drei", "Vier", "Fünf"];
  const answer = readlineSync.keyInSelect(options, "Rätsel 2: Wenn `magischeFunktion(5, ?, 4)` 60 ergibt, welche Zahl ersetzt das Fragezeichen?\n");

  // Da keyInSelect den Index der ausgewählten Option zurückgibt (beginnend bei 0), sollte die richtige Antwort dem Index 1 entsprechen
  if (answer === 1) {
    console.log("Richtig! Der Weg zum Schatz ist einen Schritt näher.\n");
    solveRiddle3();
  } else {
    console.log("Falsch! Der Weg zum Schatz bleibt verborgen.\n");
    solveRiddle2();
  }
}


function solveRiddle3() {
  const options = ["Zwei", "Drei", "Vier"];
  const answer = readlineSync.keyInSelect(options, "Rätsel 3: Wenn `magischeFunktion(7, ?, 2)` 28 ergibt, welche Zahl ersetzt das Fragezeichen?");

  // Da keyInSelect den Index der ausgewählten Option zurückgibt (beginnend bei 0), sollte die richtige Antwort dem Index 0 entsprechen
  if (answer === 0) {
    console.log("Richtig! Der Weg zum Schatz ist jetzt klar!\n");
    getSmaragd();
  } else {
    console.log("Falsch! Der Weg zum Schatz bleibt verborgen.\n");
    solveRiddle3();
  }
}

async function getSmaragd() {
  try {
    // Inventar laden
    const content = await fs.readFile('inventar.json', 'utf8');
    let inventory = JSON.parse(content);

    // Smaragd zum Inventar hinzufügen
    inventory.push('Smaragd');

    // Inventar speichern
    const updatedContent = JSON.stringify(inventory);
    await fs.writeFile('inventar.json', updatedContent, 'utf8');

    console.log("Der Smaragd wurde zu deinem Inventar hinzugefügt.");
    stadtMarktplatz();
  } catch (error) {
    console.error(`Es gab einen Fehler beim Hinzufügen des Smaragds zum Inventar: ${error}`);
  }
}

async function openInventoryStadt() {
  const inventoryFilePath = 'inventar.json';

  try {
    const inventoryContent = fsBase.readFileSync(inventoryFilePath, 'utf8');
    const inventoryData = JSON.parse(inventoryContent);

    if (inventoryData.length === 0) {
      console.log('Das Inventar ist leer.');
      stadtEingangActions();
    } else {
      console.log('Inventar:');
      for (const item of inventoryData) {
        console.log(`- ${item}`);
      }

      const index = readlineSync.keyInSelect(inventoryData, 'Welchen Gegenstand möchten Sie auswählen?');
      if (index === -1) {
        console.log('Sie haben abgebrochen. Sie werden zur letzten Funktion zurückgebracht.\n');
        return stadtEingangActions();
      } else {
      console.log(`Sie haben den Gegenstand "${inventoryData[index]}" ausgewählt.\n`);

      if(inventoryData[index] === 'Stadt Passierschein') {
      stadtMarktplatz();
      } 
        else {
        console.log('Dieser Gegenstand passt hier nicht.');
        openInventoryStadt();
        }
      }
        }
        console.log();
        } catch (error) {
        console.log('Es gab einen Fehler beim Laden des Inventars.');
        console.error(error);
      }
}

//Dorf
async function dorfEingangActions() {
  let dorfEingang = ['Waffe benutzen', 'Item benutzen','Mit Dorf bewohner sprechen', 'umkehren'];
  let indexDorfEingang = readlineSync.keyInSelect(dorfEingang, 'Was möchtest du tun? ');

  // Inventar laden
  const content = await fs.readFile('inventar.json', 'utf8');
  let inventory = JSON.parse(content);

  if (indexDorfEingang === 0) {
    console.log(`Du greifst einen Dorfbewohner an mit deinem ${charWeapon}. Dieser fällt zu boden und schreit vor Schmerz.\n\n Die andere Dorfbewohner fliehen. Du kannst Hunde bellen hören bevor du von hinten umgeschmiessen wirst und das bewusstsein Verlierst.\n\n»»————-　☠　————-««\n»»————-　☠　————-««\n»»————-　☠　————-««\n»»————-　☠　————-««\n`);
    console.log('Du erwachst an der dir bekannten Kreuzung.');
    askDirection();
  } else if (indexDorfEingang === 1) {
    openInventoryDorf();
  } else if (indexDorfEingang === 2) {
    // Überprüfe, ob der Spieler das Item 'Dorfretter' hat
    if (inventory.includes('Dorfretter')) {
      console.log('Der Dorfbewohner gratuliert dir zu deinem neuen Item "Dorfretter" und bittet dich, es zu benutzen, um dem Dorf zu helfen.');
      dorfEingangActions();
    } else if (inventory.includes('Stadt Passierschein')) {
      console.log('Habt unseren Dank Abentuerer ihr habt unser Dorf gerettet mit dem Passierschein zur Stadt kommt ihr an den Wachen vorbei');
      dorfEingangActions();
    } else {
      console.log("Der Dorfbewohner erzählt dir von einem Problem mit dem Fluss. Er bittet dich, dich flussaufwärts umzusehen und herauszufinden, warum der Fluss so wenig Wasser führt.");
      
      const options = ['Ja, ich nehme die Quest an', 'Nein, ich möchte jetzt nicht helfen'];
      const index = readlineSync.keyInSelect(options, 'Möchten Sie die Quest annehmen?');
  
      if (index === 0) {
        console.log("Vielen Dank! Der Dorfbewohner gibt dir eine Karte vom Fluss. Bitte nutze diese, um den Weg zum Fluss zu finden.");
        await addInventoryDorf("Flusskarte");
        dorfEingangActions();
      } else if (index === 1) {
        console.log("Du lehnst die Quest ab und der Dorfbewohner ist etwas enttäuscht.");
        dorfEingangActions();
      } else if (index === -1) {
        console.log("Du hast abgebrochen. Du kehrst zur Auswahl zurück.");
        dorfEingangActions();
      }
    }
  } else if (indexDorfEingang === 3) {
    askDirection();
  }else if (indexDorfEingang === -1) {
    askDirection();
}
}



function dorfFluss() {
  console.log(`Du schaust dir die karte an und begibst dich zum fluss dort siehst du das ein umgestürzter baum den fluss staut und so nicht mehr genug wasser richtung dorf fliesst.`);

  let dorfEingang = ['Waffe benutzen', 'Stamm genauer betrachten', 'umkehren'];
  let indexDorfEingang = readlineSync.keyInSelect(dorfEingang, 'Was möchtest du tun? ');

  if (indexDorfEingang === 0) {
    console.log('Das scheint keine Wirkung zu haben.');
    dorfFluss();
  } else if (indexDorfEingang === 1) {
  console.log("Du stehst vor dem massiven Baumstamm, der den Fluss blockiert. Bei genauer Betrachtung stellst du fest, dass eine Stelle am Stamm morsch aussieht. Mit einem starken Hebel könntest du vielleicht den Stamm zerbrechen und den Fluss freigeben.");

  const options = ['Versuche es mit einem Hebel', 'Kehre zum Dorf zurück'];
  const index = readlineSync.keyInSelect(options, 'Was möchtest du tun?');

  if (index === 0) {
    console.log("Du entscheidest dich, es mit einem Hebel zu versuchen.");

    flussRätsel();
  } else if (index === 1) {
    console.log("Du möchtest es nicht mit einem Hebel Versuchen was dann.");

    dorfFluss();
  }
}else if (indexDorfEingang === 2) {
    dorfEingangActions();
  }
}

async function flussRätsel(){
  console.log(`Du siehst einen großen Stabilen Ast auf den boden liegen und setzt hin an.`);

  let flussAst = ['Hebel benutzen', 'umkehren'];
  let indexflussAst = readlineSync.keyInSelect(flussAst, 'Was möchtest du tun? ');

  if (indexflussAst === 0) {
  let correctCount = 0;

  for (let i = 0; i < 5; i++) {
    // Hier könnten die Rätsel gestellt werden. Ich verwende der Einfachheit halber einfache Additionsfragen.
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);

    const correctAnswer = num1 + num2;

    const userAnswer = readlineSync.question(`Was ist ${num1} + ${num2}? `);

    if (parseInt(userAnswer) === correctAnswer) {
      console.log('Richtig!');
      correctCount++;
    } else {
      console.log(`Falsch. Die richtige Antwort ist ${correctAnswer}.`);
    }
  }

  if (correctCount === 5) {
    console.log("Du hast alle Rätsel gelöst und den Gegenstand 'Dorfretter' erhalten!");

    // Laden des Inventars
    const inventory = JSON.parse(await fs.readFile('inventar.json', 'utf8'));

    // Füge den Gegenstand "Dorfretter" zum Inventar hinzu
    inventory.push("Dorfretter");

    // Entferne den Gegenstand "Karte zum Fluss" aus dem Inventar
    const indexKarte = inventory.indexOf("Flusskarte");
    if (indexKarte !== -1) {
      inventory.splice(indexKarte, 1);
    }

    // Speichern des aktualisierten Inventars
    await fs.writeFile('inventar.json', JSON.stringify(inventory, null, 2), 'utf8');
    dorfEingangActions();
  } else {
    console.log("Du hast nicht alle Rätsel gelöst. Versuche es erneut.");
    flussRätsel();
  }
}
  else if (indexflussAst === 1) {
    dorfFluss();
  }
}

async function openInventoryDorf() {
  const inventoryFilePath = 'inventar.json';

  try {
    const inventoryContent = fsBase.readFileSync(inventoryFilePath, 'utf8');
    const inventoryData = JSON.parse(inventoryContent);

    if (inventoryData.length === 0) {
      console.log('Das Inventar ist leer.');
      dorfEingangActions();
    } else {
      console.log('Inventar:');
      for (const item of inventoryData) {
        console.log(`- ${item}`);
      }

      const index = readlineSync.keyInSelect(inventoryData, 'Welchen Gegenstand möchten Sie auswählen?');
      if (index === -1) {
        console.log('Sie haben abgebrochen. Sie werden zur letzten Funktion zurückgebracht.\n');
        return dorfEingangActions();
      } else {
      console.log(`Sie haben den Gegenstand "${inventoryData[index]}" ausgewählt.\n`);

      if(inventoryData[index] === 'Flusskarte') {
      dorfFluss();
      } else if (inventoryData[index] === 'Dorfretter')  {

  
        const inventory = JSON.parse(await fs.readFile('inventar.json', 'utf8'));


        const indexDorfretter = inventory.indexOf("Dorfretter");
        if (indexDorfretter !== -1) {
        inventory.splice(indexDorfretter, 1);
        }

        inventory.push("Stadt Passierschein");

        await fs.writeFile('inventar.json', JSON.stringify(inventory, null, 2), 'utf8');
        
        console.log("Das Dorf wurde gerettet und als Dank bekommst du einen Passierschein zur Stadt!");
        dorfEingangActions();
        }
        else {
        console.log('Dieser Gegenstand passt hier nicht.');
        openInventoryDorf();
        }
      }
        }
        console.log();
        } catch (error) {
        console.log('Es gab einen Fehler beim Laden des Inventars.');
        console.error(error);
      }
}

async function addInventoryDorf(item) {
  try {
    // Inventar laden
    const content = await fs.readFile('inventar.json', 'utf8');
    let inventory = JSON.parse(content);

    // Neues Item zum Inventar hinzufügen
    inventory.push(item);

    // Inventar speichern
    const updatedContent = JSON.stringify(inventory);
    await fs.writeFile('inventar.json', updatedContent, 'utf8');

    console.log(`"${item}" wurde zum Inventar hinzugefügt.`);
  } catch (error) {
    console.error(`Es gab einen Fehler beim Hinzufügen des Gegenstandes zum Inventar: ${error}`);
  }
}



//newChar

function newChar() {
  let name = readlineSync.question('Wie ist dein Charakter Name? ');

  const classes = ['Magier', 'Krieger', 'Priester', 'Barde'];
  let indexClass = readlineSync.keyInSelect(classes, 'Welche Klasse möchtest du spielen? ');

  const weapons = ['Stab', 'Schwert', 'Dolch', 'Mandoline'];
  let indexWeapon = readlineSync.keyInSelect(weapons, 'Welche Waffe hat dein Charakter? ');

  let charClass = classes[indexClass];
  let charWeapon = weapons[indexWeapon];

  console.log(`Name: ${name}`);
  console.log(`Klasse: ${charClass}`);
  console.log(`Waffe: ${charWeapon}`);

  if (readlineSync.keyInYN('Stimmt deine Auswahl? ')) {
    console.log('Welt wird betreten...');
    setTimeout(function () {
      console.log(`Willkommen ${name}, dein Abenteuer als ${charClass} beginnt jetzt!`);

      // Daten, die gespeichert werden sollen
      const data = {
        name: name,
        class: charClass,
        weapon: charWeapon
      };

      // Konvertiere das Datenobjekt in JSON
      const jsonData = JSON.stringify(data);

      // Pfad zur Datei
      const filePath = 'datei.json';

      // Schreibe die Daten in die JSON-Datei
      fs.writeFileSync(filePath, jsonData);

      console.log('Charakter Daten wurden erfolgreich gespeichert.');
      console.log(`Name: ${name}`);
      console.log(`Klasse: ${charClass}`);
      console.log(`Waffe: ${charWeapon}`);

      if (indexWeapon === 0) {
        console.log('Schnapp dir deinen Stab und das Abenteuer kann starten.\n');
      } else if (indexWeapon === 1) {
        console.log('Schnapp dir dein Schwert und das Abenteuer kann starten.\n');
      } else if (indexWeapon === 2) {
        console.log('Schnapp dir deinen Dolch und das Abenteuer kann starten.\n');
      } else if (indexWeapon === 3) {
        console.log('Schnapp dir deine Mandoline und das Abenteuer kann starten.\n');
      }

      showNextStep();
    }, 3000);
  } else {
    console.log('Spiel endet...');
    // Do something...
    }
  }
}