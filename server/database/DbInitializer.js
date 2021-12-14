class DbInitializer {
  constructor(databasePath = 'database/TrainSchedules.db') {
    this.db = require('better-sqlite3')(databasePath, { verbose: console.log });
  }

  Init() {
    this.CreateTables();
    this.SeedTables();
  }

  CreateTables () {
    this.CreateUserTable();
    this.CreateTrainTable();
  }

  SeedTables() {
    this.SeedTrainStations();
    this.SeedTrains();
  }

  CreateUserTable() {
    const statement = this.db.prepare(`CREATE TABLE IF NOT EXISTS 'User'(
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'FirstName' nvarchar(100),
      'LastName' nvarchar(100),
      'Email' nvarchar(250),
      'PhoneNumber' integer);`);
    statement.run();
  }

  CreateTrainTable() {
    const statement = this.db.prepare(`CREATE TABLE IF NOT EXISTS 'Train'( 
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT, 
      'SeatAmount' integer);`);
    statement.run();
  }
  
  SeedTrainStations() {
    // Todo
  }

  SeedTrains() {
    // Todo
  }
}

module.exports = DbInitializer;