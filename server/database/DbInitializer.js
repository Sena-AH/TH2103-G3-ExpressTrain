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
    this.#CreateUserTable();
    this.#CreateTrainTable();
  }

  #CreateUserTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'User'(
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'FirstName' nvarchar(100),
      'LastName' nvarchar(100),
      'Email' nvarchar(250),
      'PhoneNumber' integer);`);
    statement.run(); 
  }

  #CreateTrainTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'Train'( 
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT, 
      'SeatAmount' integer);`);
    statement.run();
  }

  #SeedTables() {
    this.#SeedTrainStations();
    this.#SeedTrains();
  }
  
  #SeedTrainStations() {
    // Todo
  }

  #SeedTrains() {
    // Todo
  }
}

module.exports = DbInitializer;