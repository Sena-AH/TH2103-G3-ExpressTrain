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
    this.#CreateTrainStationPlatformTable();
    this.#CreateScheduleTable();
    this.#CreateScheduleStageTable();
    this.#CreatePaymentInfoTable();
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
      'SeatAmount' INTEGER);`
      );
    statement.run();
  }

  #CreateTrainStationPlatformTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'TrainStationPlatform'( 
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'TrainStationId' INTEGER,
      'Name' NVARCHAR(100);`
    );
    statement.run();
  }

  #CreateTrainStationTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'TrainStation'( 
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT, 
      'Name' NVARCHAR(100),
      'Location' nvarchar(100));`
    );
    statement.run();
  }

  #CreateScheduleTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'Schedule' (
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'TrainId' INTEGER,
      'DepartureTrainStationId' INTEGER,
      'DeparturePlatformId' INTEGER,
      'DepartureTime' DATETIME,
      'DestinationTrainStationId' INTEGER,
      'DestinationPlatformId' INTEGER,
      'ArrivalTime' DATETIME);`
      );
      statement.run();
  }

  #CreateScheduleStageTable() {
    const statement = this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'ScheduleStage' (
      'ScheduleId' INTEGER PRIMARY KEY AUTOINCREMENT,
      'SeatNumber' INTEGER PRIMARY KEY,
      'TicketId' INTEGER);`
      );
      statement.run();
  }

  #CreateBookingTable() {
    const statement = this.#database.prepare(` CREATE TABLE IF NOT EXISTS 'Booking'(
      'BookingCodeId' INTEGER PRIMARY KEY AUTOINCREMENT,
      'UserId' INTEGER,
      'Price' DECIMAL,
      'ScheduleStageId' INTEGER);`
    );
    statement.run();
  }

  #CreatePaymentInfoTable() {
    const statement =  this.#database.prepare(`CREATE TABLE IF NOT EXISTS 'PaymentInfo' (
      'Id' INTEGER PRIMARY KEY AUTOINCREMENT, 
      'UserId' INTEGER,
      'AccountOwnerName' NVARCHAR(250),
      'Provider' NVARCHAR(100),
      'ProviderDetails' NVARCHAR(250),
      'Expiration' DATE);`
      );
    statement.run();
  }

  #SeedTables() {
    this.#SeedTrainStations();
    this.#SeedTrainStationPlatforms();
    this.#SeedSchedules();
    this.#SeedTravellers();
    this.#SeedBookingsTables();
    //this.#SeedPaymentInfo();
    this.#SeedScheduleStages();
    this.#SeedCarts();

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

  #SeedSchedules() {
    const insert = this.#database.prepare(`INSERT OR REPLACE INTO 'Schedule' (Id, TrainId, DepartureTrainStationId, DeparturePlatformId, DestinationTrainStationId, DestinationPlatformId, DepartureTime, ArrivalTime) 
    VALUES ('1', '1', '3', '2', '1', '2021-12-24 07:15:00', '2021-12-24 10:15:00'),
    ('2', '1', '1', '3', '4', '2021-12-25 09:25:00', '2021-12-25 12:25:00'),
    ('3', '3', '2', '2', '3', '2021-12-26 17:30:00', '2021-12-26 20:15:00'),
    ('4', '2', '1', '1', '2', '2021-12-27 05:00:00', '2021-12-27 08:15:00'),
    ('5', '2', '1', '3', '1', '2021-12-28 16:35:00', '2021-12-28 20:00:00'),
    ('6', '2', '2', '1', '3', '2021-12-29 20:00:00', '2021-12-29 23:15:00'),
    ('7', '1', '4', '2', '1', '2021-12-30 13:25:00', '2021-12-30 16:25:00'),
    ('8', '3', '3', '1', '4', '2021-12-31 11:00:00', '2021-12-31 14:15:00'),
    ('9', '3', '1', '2', '3', '2022-01-01 07:15:00', '2022-01-01 11:30:00'),
    ('10', '1', '1', '3', '1', '2022-01-02 05:15:00', '2022-01-02 08:15:00'),

    ('11', '1', '1', '2', '1', '2022-01-25 05:15:00', '2022-01-25 08:15:00'),    
    ('12', '1', '1', '3', '1', '2022-01-25 05:35:00', '2022-01-25 08:35:00'),
    ('13', '1', '1', '2', '1', '2022-01-25 08:25:00', '2022-01-25 11:20:00'),
    ('14', '1', '1', '3', '1', '2022-01-25 12:15:00', '2022-01-25 08:15:00'),
    ('15', '1', '1', '2', '1', '2022-01-25 13:05:00', '2022-01-25 16:00:00'),

    ('16', '2', '2', '3', '2', '2022-01-25 05:15:00', '2022-01-25 08:15:00'),
    ('17', '2', '2', '1', '2', '2022-01-25 06:00:00', '2022-01-25 09:00:00'),
    ('18', '2', '2', '3', '2', '2022-01-25 07:25:00', '2022-01-25 10:25:00'),
    ('19', '2', '2', '1', '2', '2022-01-25 08:35:00', '2022-01-25 11:35:00'),
    ('20', '2', '2', '3', '2', '2022-01-25 09:45:00', '2022-01-25 12:45:00'),
    ('21', '2', '2', '1', '2', '2022-01-25 10:00:00', '2022-01-25 13:00:00'),

    ('10', '3', '3', '1', '3', '2022-01-25 05:15:00', '2022-01-25 08:15:00'),
    ('10', '3', '3', '2', '3', '2022-01-25 06:00:00', '2022-01-25 09:00:00'),
    ('10', '3', '3', '1', '3', '2022-01-25 07:45:00', '2022-01-25 10:45:00'),
    ('10', '3', '3', '2', '3', '2022-01-25 08:25:00', '2022-01-25 11:25:00'),
    ('10', '3', '3', '1', '3', '2022-01-25 09:30:00', '2022-01-25 12:30:00'),
    ('10', '3', '3', '2', '3', '2022-01-25 10:00:00', '2022-01-25 13:00:00');`
    );
  insert.run();
  }

  #SeedScheduleStages() {
    const insert = this.#database.prepare(`INSERT OR REPLACE INTO 'ScheduleStage' (ScheduleId, SeatNumber, TicketId)
    VALUES ('1', '23', '1'),
    ('2', '1', '2'),
    ('3', '10', '3'),
    ('4', '11', '4'),
    ('5', '12', '5'),
    ('6', '7', '6'),
    ('7', '4', '7'),
    ('8', '1', '10'),
    ('9', '25', '11'),
    ('10', '26', '11');`
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
    const insert = this.#database.prepare(` INSERT OR REPLACE INTO 'Booking' (Id, UserId, Price, ScheduleStageId)
    VALUES ('1', '1', '400.00', '1'),
    ('2', '2', '500.00', '2'),
    ('3', '3', '200.00', '2');`
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