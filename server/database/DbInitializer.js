class DbInitializer {
  // # means private.
  #database;
  constructor(databasePath = 'database/default.db') {
    this.#database = require('better-sqlite3')(databasePath, { verbose: console.log });
  }

  Init() {
    this.#CreateTables();
    this.#SeedTables();
  }

  GetDatabase() {
    return this.#database;
  }

  #CreateTables () {
    this.#CreateTravellerTable();
    this.#CreateTrainTable();
  }

  #CreateTravellerTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'Traveller'(
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'FirstName' nvarchar(100),
      'LastName' nvarchar(100),
      'Email' nvarchar(250),
      'PhoneNumber' integer);`
      );
    statement.run();
  }

  #CreateTrainTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'Train'( 
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT, 
      'SeatAmount' integer);`
      );
    statement.run();
  }

  #SeedTables() {
    this.#SeedTrainStations();
    this.#SeedTrains();
    this.#SeedTravellers();
  }
  
  #SeedTrainStations() {
    // Todo
  }

  #SeedTrains() {
    // Todo
  }

  // Way of seeding, add the Id, that way it wont be added more than once in the database.
  #SeedTravellers() {
    const insert = this.#database.prepare(`INSERT OR REPLACE INTO 'Traveller' (Id, FirstName, LastName, Email, PhoneNumber) 
        VALUES ('1', 'Alejandra', 'Talamantes', 'alejandra@example', '123123123'),
        ('2', 'Bobby', 'Lander', 'bobby.lander@example', '123245123'),
        ('3', 'Tony', 'Mafia', 'tonymafia@example', '852123123');`
        );
    insert.run();
  }
}

module.exports = DbInitializer;