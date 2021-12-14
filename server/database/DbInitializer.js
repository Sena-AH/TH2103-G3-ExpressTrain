class DbInitializer {
  constructor() {
    this.db = require('better-sqlite3')('database/TrainSchedules.db', { verbose: console.log });
  }

  CreateTables () {
    this.CreateUserTable();
    this.CreateTrainTable();
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
}

module.exports = DbInitializer;