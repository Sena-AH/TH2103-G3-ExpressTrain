class DbInitializer {
  // # means private.
  #database;
  #pathPrefix = 'database/';
  constructor(fileName = 'default.db') {
    this.#CreateFolder();
    let path = this.#pathPrefix + fileName;
    this.#database = require('better-sqlite3')(path); //, { verbose: console.log });
  }

  #CreateFolder(suffix = '') {
    const fs = require('fs');
    const directory = this.#pathPrefix + suffix;
    if(!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
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
    this.#CreateTrainStationPlatformTable();
    this.#CreateScheduleTable();
    this.#CreateScheduleStageTable();
    //this.#CreatePaymentInfoTable();
  }

  #CreateTravellerTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'Traveller'(
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      'FirstName' NVARCHAR(100) NOT NULL,
      'LastName' NVARCHAR(100) NOT NULL,
      'Email' NVARCHAR(250) NOT NULL,
      'PhoneNumber' NVARCHAR(17) NOT NULL);`);
    statement.run(); 
  }

  #CreateCartTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'Cart'( 
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      'SeatAmount' INTEGER NOT NULL);`
      );
    statement.run();
  }

  #CreateTrainStationPlatformTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'TrainStationPlatform'( 
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      'TrainStationId' INTEGER NOT NULL REFERENCES 'TrainStation',
      'Name' NVARCHAR(100) NOT NULL);`
    );
    statement.run();
  }

  #CreateTrainStationTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'TrainStation'( 
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
      'Name' NVARCHAR(100) NOT NULL,
      'Location' nvarchar(100) NOT NULL);`
    );
    statement.run();
  }

  #CreateScheduleTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'Schedule'(
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      'CartId' INTEGER REFERENCES 'Cart' NOT NULL,
      'DepartureTrainStationId' INTEGER REFERENCES 'TrainStation' NOT NULL,
      'DeparturePlatformId' INTEGER REFERENCES 'TrainStationPlatform' NOT NULL,
      'DestinationTrainStationId' INTEGER REFERENCES 'TrainStation' NOT NULL,
      'DestinationPlatformId' INTEGER REFERENCES 'TrainStationPlatform' NOT NULL,
      'DepartureTime' DATETIME NOT NULL,
      'ArrivalTime' DATETIME NOT NULL);`
      );
      statement.run();
  }

  #CreateScheduleStageTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'ScheduleStage'(
      'ScheduleId' INTEGER REFERENCES 'Schedule' NOT NULL,
      'SeatNumber' INTEGER NOT NULL,
      'BookingId' INTEGER REFERENCES 'Booking' ON DELETE CASCADE NOT NULL,
      PRIMARY KEY ('ScheduleId', 'SeatNumber'));`
      );
      statement.run();
  }

  #CreateBookingTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'Booking'(
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      'TravellerId' INTEGER NOT NULL REFERENCES 'Traveller',
      'Price' DECIMAL NOT NULL,
      'BookingCode' NVARCHAR(6) UNIQUE,
      'ManipulationCode' NVARCHAR(8));`
    );

    statement.run();
  }

  // #CreatePaymentInfoTable() {
  //   const statement =  this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'PaymentInfo' (
  //     'Id' INTEGER PRIMARY KEY AUTOINCREMENT, 
  //     'UserId' INTEGER,
  //     'AccountOwnerName' NVARCHAR(250),
  //     'Provider' NVARCHAR(100),
  //     'ProviderDetails' NVARCHAR(250),
  //     'Expiration' DATE);`
  //     );
  //   statement.run();
  // }

  #SeedTables() {
    this.#SeedTrainStations();
    this.#SeedTrainStationPlatforms();
    this.#SeedCarts();
    this.#SeedSchedules();
    this.#SeedTravellers();
    this.#SeedBookingsTables();
    this.#SeedScheduleStages();
  }
  
  #SeedTrainStations() {
    const insert = this.#database.prepare(`INSERT OR REPLACE INTO 'TrainStation' (Id, Name, Location)
    VALUES ('1', 'Göteborg Centralstationen', 'Göteborg'),
    ('2', 'Stockholm Centralstationen', 'Stockholm'),
    ('3', 'Malmö Centralstationen', 'Malmö');`
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

  #SeedSchedules() {
    const insert = this.#database.prepare(`INSERT OR REPLACE INTO 'Schedule' (Id, CartId, DepartureTrainStationId, DeparturePlatformId, DestinationTrainStationId, DestinationPlatformId, DepartureTime, ArrivalTime) 
    VALUES ('1', '1', '1', '3', '2', '1', '2021-12-24 07:15:00', '2021-12-24 10:15:00'),
    ('2', '1', '1', '1', '3', '4', '2021-12-25 09:25:00', '2021-12-25 12:25:00'),
    ('3', '1', '3', '2', '2', '3', '2021-12-26 17:30:00', '2021-12-26 20:15:00'),
    ('4', '1', '2', '1', '1', '2', '2021-12-27 05:00:00', '2021-12-27 08:15:00'),
    ('5', '1', '2', '1', '3', '1', '2021-12-28 16:35:00', '2021-12-28 20:00:00'),
    ('6', '1', '2', '2', '1', '3', '2021-12-29 20:00:00', '2021-12-29 23:15:00'),
    ('7', '1', '1', '4', '2', '1', '2021-12-30 13:25:00', '2021-12-30 16:25:00'),
    ('8', '1', '3', '3', '1', '4', '2021-12-31 11:00:00', '2021-12-31 14:15:00'),
    ('9', '1', '3', '1', '2', '3', '2022-01-01 07:15:00', '2022-01-01 11:30:00'),
    ('10', '1', '3', '1', '1', '1', '2022-01-02 05:15:00', '2022-01-02 08:15:00'),

    ('11', '1', '1', '1', '2', '1', '2022-01-25 05:15:00', '2022-01-25 08:15:00'),    
    ('12', '1', '1', '1', '3', '1', '2022-01-25 05:35:00', '2022-01-25 08:35:00'),
    ('13', '1', '1', '1', '2', '1', '2022-01-25 08:25:00', '2022-01-25 11:20:00'),
    ('14', '1', '1', '1', '3', '1', '2022-01-25 12:15:00', '2022-01-25 08:15:00'),
    ('15', '1', '1', '1', '2', '1', '2022-01-25 13:05:00', '2022-01-25 16:00:00'),

    ('16', '1', '2', '2', '3', '2', '2022-01-25 05:15:00', '2022-01-25 08:15:00'),
    ('17', '1', '2', '2', '1', '2', '2022-01-25 06:00:00', '2022-01-25 09:00:00'),
    ('18', '1', '2', '2', '3', '2', '2022-01-25 07:25:00', '2022-01-25 10:25:00'),
    ('19', '1', '2', '2', '1', '2', '2022-01-25 08:35:00', '2022-01-25 11:35:00'),
    ('20', '1', '2', '2', '3', '2', '2022-01-25 09:45:00', '2022-01-25 12:45:00'),
    ('21', '1', '2', '2', '1', '2', '2022-01-25 10:00:00', '2022-01-25 13:00:00'),

    ('22', '1', '3', '3', '1', '3', '2022-01-25 05:15:00', '2022-01-25 08:15:00'),
    ('23', '1', '3', '3', '2', '3', '2022-01-25 06:00:00', '2022-01-25 09:00:00'),
    ('24', '1', '3', '3', '1', '3', '2022-01-25 07:45:00', '2022-01-25 10:45:00'),
    ('25', '1', '3', '3', '2', '3', '2022-01-25 08:25:00', '2022-01-25 11:25:00'),
    ('26', '1', '3', '3', '1', '3', '2022-01-25 09:30:00', '2022-01-25 12:30:00'),
    ('27', '1', '3', '3', '2', '3', '2022-01-25 10:00:00', '2022-01-25 13:00:00');`
    );
    insert.run();
  }

  #SeedScheduleStages() {
    const insert = this.#database.prepare(`INSERT OR REPLACE INTO 'ScheduleStage' (ScheduleId, SeatNumber, BookingId)
    VALUES ('1', '23', '1'),
    ('2', '1', '2'),
    ('3', '10', '4'),
    ('4', '11', '6'),
    ('5', '12', '4'),
    ('6', '7', '3'),
    ('7', '4', '3'),
    ('8', '1', '5'),
    ('9', '25', '7'),
    ('10', '26', '2');`
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

  #SeedBookingsTables() {
    const insert = this.#database.prepare(`INSERT OR REPLACE INTO 'Booking' (Id, TravellerId, Price, BookingCode, ManipulationCode)
    VALUES ('1', '1', '400.00', 'A01BC4', '4CV34RT6'),
    ('2', '2', '500.00', 'B123G5', '95TVFD34'),
    ('3', '2', '1500.00', 'P99G43', 'SA2I3P91'),
    ('4', '3', '200.00', '1PK6TR', 'LU7FV8HG'),
    ('5', '2', '700.00', '8TH43K', '9IIK44HN'),
    ('6', '2', '400.00', '3MHY3E', 'GHI23NGF'),
    ('7', '2', '500.00', 'IK7H1H', '1B3I8B4K');`
    );
    insert.run();
  }

  #SeedCarts() {
    const insert = this.#database.prepare(`INSERT OR REPLACE INTO 'Cart' (Id, SeatAmount)
    VALUES ('1', '28'),
    ('2', '28'),
    ('3', '28'),
    ('4', '28'),
    ('5', '28'),
    ('6', '28');`
    );
    insert.run();
  }
}
module.exports = DbInitializer;