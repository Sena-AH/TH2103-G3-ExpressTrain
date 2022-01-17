# TH2103-G3

## Byta branch i GitHub Desktop inför testning 17/1 -21  
- Tryck på knappen 'Current branch' i Github Desktop och välj 'before-last-tests'  
- Tryck på 'Fetch origin'
- Börja testa!!

## Första gången  
- Installera node.js från [nodejs.org](https://nodejs.org/en/download/)  

## Ta hem senaste versionen  
- Öppna GitHub Desktop  
- Kontrollera att det står 'TH2103-G3-ExpressTrain' i rutan 'Current repository'  
- Kontrollera att det står 'main' i rutan 'Current branch'  
- Tryck på 'Fetch origin' knappen  
- Kontrollera att kolumnen till vänster är tom. Högerklicka annars på det som står där och välj 'Discard changes'  
- Tryck på knappen 'Open in Visual Studio Code'  

## Öppna projektet utan GitHub Desktop  
- Starta Visual Studio Code (VS Code)  
- Välj File/ Open Folder och välj mappen projektet ligger i  

## Innan du startar appen första gången
- Välj Terminal/ New Terminal i menyn  
- Skriv 'npm install' i terminalen och tryck enter  
- Högerklicka på client-mappen i filträdet till vänster och välj "Open in Intergrated Terminal"  
- Skriv 'npm install' i den nya terminalen och tryck enter  

## Starta appen
- Välj Terminal/ New Terminal i menyn  
- Skriv 'npm start' i terminalen och tryck enter  
- Högerklicka på client-mappen i filträdet till vänster och välj "Open in Intergrated Terminal"  
- Skriv 'npm start' i den nya terminalen och tryck enter  
- Appen skall nu starta i din webbläsare  

## Testa från mobilen  
- Ta reda på din dators ip-adress, du kan ofta hitta den i egenskaper (properties) för det wi-fi du är ansluten till.  
- Adressen heter IPv4  
- Se till att det går att se din dator på det lokala nätverket  
- Kontrollera att din telefon är ansluten till samma wi-fi  
- Surfa in med mobilen på ip-adressen  

## Fungerar det inte?  
- I filträdet till vänster, öppna mappen database och ta bort 'TrainDB2.db' och försök starta igen. Det finns två mappar som heter database på två olika ställen. Kontrollera båda för säkerhets skull!  
- Om det inte hjälper, följ då stegen under rubriken "Starta projektet första gången"  
- Om det fortfarande inte fungerar, välj Terminal/ New Terminal i menyn och skriv 'npm install better-sqlite3' och tryck enter och försök igen  
- Fungerar det fortfarande inte? Be någon av utvecklarna om hjälp!  
