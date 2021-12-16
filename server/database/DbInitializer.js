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
    this.CreateTrainStationPlatformTable();
  }

  #CreateTravellerTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'Traveller'(
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'FirstName' nvarchar(100),
      'LastName' nvarchar(100),
      'Email' nvarchar(250),
      'PhoneNumber' INTEGER);`);
    statement.run(); 
  }

  #CreateCartTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'Cart'( 
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'DepartureStationId' INTEGER,
      'ArrivalStationId' INTEGER,
      'DepartureTime' datetime,
      'ArrivalTime' datetime);`
      );
    statement.run();
  }

  #CreateTrainStationPlatformTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'TrainStationPlatform'( 
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'TrainStationId' INTEGER,
      'Name' nvarchar(100);`
    );
    statement.run();
  }

  #CreateTrainStationTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'TrainStation'( 
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT, 
      'Platforms' nvarchar(100),
      'Name' nvarchar(100)
      'Location' nvarchar(100));`
    );
    statement.run();
  }

  #SeedTables() {
    this.#SeedTrainStations();
    this.#SeedTrainStationPlatforms();
    this.#SeedCarts();
    this.#SeedTravellers();
  }
  
  #SeedTrainStations() {
    const insert = this.#database.prepare(`INSERT OR REPLACE INTO 'TrainStation' (Id, Name, Location)
    VALUES ('1', 'Gothenburg Central Station', 'Gothenburg'),
    ('2', 'Stockholm Central Station', 'Stockholm'),
    ('3', 'Malmo Central Station', 'Malmo');`
    );
    insert.run();
  }

#SeedTrainStationPlatforms() {
  const insert = this.#database.prepare(`INSERT OR REPLACE INTO 'TrainStationPlatform' (Id, TrainStationId, Name)
  VALUES ('1', '1', 'A'),
  ('2', '1', 'B'),
  ('3', '1', 'C'),
  ('4', '1', 'D'),
  ('5', '2', 'A'),
  ('6', '2', 'B'),
  ('7', '2', 'C'),
  ('8', '2', 'D'),
  ('9', '3', 'A'),
  ('10', '3', 'B'),
  ('11', '3', 'C'),
  ('12', '3', 'D');`
  );
  insert.run();
}

  #SeedCarts() {
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