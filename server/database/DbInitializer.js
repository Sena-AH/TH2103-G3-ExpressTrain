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
    this.#CreateCartTable();
    this.#CreateTrainStationTable();
    this.#CreateBookingTable();
    //this.#CreateTrainStationPlatformTable();
  }

  #CreateTravellerTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'Traveller'(
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT,

      'FirstName' NVARCHAR(100),
      'LastName' NVARCHAR(100),
      'Email' NVARCHAR(250),
      'PhoneNumber' INTEGER);`);
    statement.run(); 
  }

  #CreateCartTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'Cart'( 
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'DepartureStation' INTEGER,
      'ArrivalStation' INTEGER,
      'DepartureTime' DATETIME,
      'ArrivalTime' DATETIME);`
      );
    statement.run();
  }

  // #CreateTrainStationPlatformTable() {
  //   const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'TrainStationPlatform'( 
  //     'Id' INTEGER PRIMARY KEY AUTOINCREMENT,
  //     'TrainStationId' INTEGER,
  //     'Name' NVARCHAR(100);`
  //   );
  //   statement.run();
  // }

  #CreateTrainStationTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'TrainStation'( 
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT, 
      'Platforms' NVARCHAR(250),
      'Name' NVARCHAR(100),
      'Location' nvarchar(100));`
    );
    statement.run();
  }

  #CreateBookingTable() {
    const statement = this.#database.prepare(` CREATE TABLE IF NOT EXISTS 'Booking'(
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'SeatId' INTEGER,
      'Cost' DECIMAL);`
    );
    statement.run();
  }

  #SeedTables() {
    this.#SeedTrainStations();
    //this.#SeedTrainStationPlatforms();
    this.#SeedCarts();
    this.#SeedTravellers();
    this.#SeedBookingsTable();
  }
  
  #SeedTrainStations() {
    const insert = this.#database.prepare(`INSERT OR REPLACE INTO 'TrainStation' (Id, Platforms, Name, Location)
    VALUES ('1', 'A,B,C,D', 'Gothenburg Central Station', 'Gothenburg'),
    ('2', 'A,B,C,D', 'Stockholm Central Station', 'Stockholm'),
    ('3', 'A,B,C,D', 'Malmo Central Station', 'Malmo');`
    );
    insert.run();
  }

// #SeedTrainStationPlatforms() {
//   const insert = this.#database.prepare(`INSERT OR REPLACE INTO 'TrainStationPlatform' (Id, TrainStationId, Name)
//   VALUES ('1', '1', 'A'),
//   ('2', '1', 'B'),
//   ('3', '1', 'C'),
//   ('4', '1', 'D'),
//   ('5', '2', 'A'),
//   ('6', '2', 'B'),
//   ('7', '2', 'C'),
//   ('8', '2', 'D'),
//   ('9', '3', 'A'),
//   ('10', '3', 'B'),
//   ('11', '3', 'C'),
//   ('12', '3', 'D');`
//   );
//   insert.run();
// }

  #SeedCarts() {
    const insert = this.#database.prepare(`INSERT OR REPLACE INTO 'Cart' (Id, DepartureStation, ArrivalStation, DepartureTime, ArrivalTime) 
    VALUES ('1', 'Gothenburg', 'Stockholm', '2021-12-24 07:15:00', '2021-12-24 10:15:00'),
    ('2', 'Stockholm', 'Gothenburg', '2021-12-22 09:15:00', '2021-12-22 12:15:00'),
    ('3', 'Malmo', 'Stockholm', '2021-12-31 06:00:00', '2021-12-31 10:00:00');`
    );
  insert.run();
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

  #SeedBookingsTable() {
    const insert = this.#database.prepare(` INSERT OR REPLACE INTO 'Booking' (Id, SeatId, Cost)
    VALUES ('1', '1', '400.00'),
    ('2', '2', '500.00'),
    ('3', '10', '200.00');`
    );
    insert.run();
  }
}

module.exports = DbInitializer;