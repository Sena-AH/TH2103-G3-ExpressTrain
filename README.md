# TH2103-G3

## Teknik bakom projektet  
Appen är uppdelad efter hur sidorna visas för användaren. Olika utvecklare i teamet har utvecklat varsin modul.  
*HomePage* och *SearchResultPage* använder _context_ för att spara och vidarebefordra information.  
*BookingInformationPage* (som visar *BookingForm*) hämtar information från _context_ men använder _state_ för att skicka information vidare.  
*SeatsPage*, *PaymentPage* och *BookingConfirmationPage* använder alla _state_ för information.  
*MyBookingsPage* och *MyBookings2Page* använder också _state_.  

Context och state håller endast information och val från användaren för att kunna hämta rätt data från databasen, alltså inte datan i sig. Därför gör varje enskild sida sina egna hämtningar i databasen. 
Vi har till största delen valt att göra hämtningar via useEffects som triggas av förändringar i given information (till exempel som när _context_ uppdateras).  

För API-anrop har vi använt oss av [Node Hills kod](https://java20gbg.lms.nodehill.se/article/uppdaterat-kodexempel-mall-rest-api-fran-en-sqlite-databas) där också dokumentation och kodexempel finns.  

## Ramverk / delsystem  
Vi har använt oss av följande ramverk och delsystem:  
- [Node.js]((https://nodejs.org/en/download/)  
- [React](https://reactjs.org/docs/getting-started.html)  
- [Better SQLite 3](https://github.com/JoshuaWise/better-sqlite3)   
- [Axios](https://axios-http.com/) för API-anrop till bland annat Swish i *PaymentPage*    
- [Skeleton](https://skeletonreact.com/) för snyggare och bättre timing på inläsning i *PaymentPage* och *MyBookingsPage*    

## Starta projektet  
### Första gången  
- Installera node.js från [nodejs.org](https://nodejs.org/en/download/)  

### Ta hem senaste versionen  
- Öppna GitHub Desktop  
- Kontrollera att det står 'TH2103-G3-ExpressTrain' i rutan 'Current repository'  
- Kontrollera att det står 'main' i rutan 'Current branch'  
- Tryck på 'Fetch origin' knappen  
- Kontrollera att kolumnen till vänster är tom. Högerklicka annars på det som står där och välj 'Discard changes'  
- Tryck på knappen 'Open in Visual Studio Code'  

### Öppna projektet utan GitHub Desktop  
- Starta Visual Studio Code (VS Code)  
- Välj File/ Open Folder och välj mappen projektet ligger i  

### Innan du startar appen första gången
- Välj Terminal/ New Terminal i menyn  
- Skriv 'npm install' i terminalen och tryck enter  
- Högerklicka på client-mappen i filträdet till vänster och välj "Open in Intergrated Terminal"  
- Skriv 'npm install' i den nya terminalen och tryck enter  

### Starta appen
- Välj Terminal/ New Terminal i menyn  
- Skriv 'npm start' i terminalen och tryck enter  
- Högerklicka på client-mappen i filträdet till vänster och välj "Open in Intergrated Terminal"  
- Skriv 'npm start' i den nya terminalen och tryck enter  
- Appen skall nu starta i din webbläsare  

### Testa från mobilen  
- Ta reda på din dators ip-adress, [Tele2 kan hjälpa till](https://www.tele2.se/kundservice/bredband/hitta-ip-och-mac-adress).  
- Se till att det går att se din dator på det lokala nätverket  
- Kontrollera att din telefon är ansluten till samma wi-fi som datorn  
- Surfa in med mobilen på ip-adressen:3000 (t.ex 192.77.68.1:3000)  

### Fungerar det inte?  
- I filträdet till vänster, öppna mappen database och ta bort 'TrainDB2.db' och försök starta igen. Det finns två mappar som heter database på två olika ställen. Kontrollera båda för säkerhets skull!  
- Om det inte hjälper, följ då stegen under rubriken "Starta projektet första gången"  
- Om det fortfarande inte fungerar, välj Terminal/ New Terminal i menyn och skriv 'npm install better-sqlite3' och tryck enter och försök igen  
- Fungerar det fortfarande inte? Be någon av utvecklarna om hjälp!  

### Byta branch i GitHub Desktop
- Tryck på knappen 'Current branch' i Github Desktop och välj den branch du vill byta till    
- Tryck på 'Fetch origin'  


## Mappstruktur  
TBD Kenny (skapare av mappstrukturen i början av projektet)

## Databasen  
I '/server/database' ligger filen 'DbInitializer.js'.  
När man skriver 'npm start' i konsolen i rotmappen kallar 'index.js' på 'DbInitializer.js' som skapar en ny databas i '/client/database'.  
Data nog för att testa på seedas in automatiskt. 
För att återställa databasen tar man bort filen 'TrainDb2.db' i '/client/database'.
Databasfilen ligger i '.gitignore' och skapas därför inte om förrän man tar bort filen och startar om appen med 'npm start' i rotfoldern.  

## Kodstandard  
Vårt fokus har varit på att leverera funktionalitet till PO på den begränsade tid vi haft att tillgå.  
Därför har kodstandard och refaktorering prioriterats ner kraftigt.  
