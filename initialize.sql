USE aca_capstone;

DROP TABLE IF EXISTS usersContact, characterCreation, class, users;


CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE usersContact (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(50),
  PRIMARY KEY (id),
  FOREIGN KEY (id)
  REFERENCES users (id)
    ON DELETE CASCADE
);

CREATE TABLE characterCreation (
  id INT NOT NULL,
  
  charactername VARCHAR(50),
  userlevel INT,
  userhealth INT,
  experience INT,
  strength INT,
  intelligence INT,
  will INT,
  dexterity INT,
  constitution INT,
  charisma INT,
  class TEXT,
  image VARCHAR(255),
  
  PRIMARY KEY (id, charactername),
  FOREIGN KEY (id)
  REFERENCES users (id)
    ON DELETE CASCADE
);

-- CREATE TABLE class (
-- id INT NOT NULL AUTO_INCREMENT,
-- fighter TEXT,
-- mage TEXT,
-- crusader TEXT,
-- thief TEXT,
-- explorer TEXT,
-- venturer TEXT,

-- PRIMARY KEY (id),
-- FOREIGN KEY (id)
-- REFERENCES users(id)
-- );

INSERT INTO users
	(first_name, last_name)
VALUES 
  ("James","Butt");
  
INSERT INTO usersContact 
  (id, email)
VALUES 
  (1, "test@example.com");
  -- ( "test@example.com"),
--   ("test@example.com"),
--   ("test@example.com"),
--   ("test@example.com");
  
INSERT INTO characterCreation
  (id, charactername, userlevel, userhealth, experience, strength, intelligence, will, dexterity, constitution, charisma)
VALUES 
  (1, "Alarik", "1", "8","300", "16", "10", "10", "10", "10", "10"),
  (1, "Grok", "1", "5", "300","14", "10", "10", "10", "10", "10"),
  (1, "Strider", "1", "7","300", "12", "10", "10", "10", "10", "10"),
  (1, "Kirith", "1", "4","300", "17", "10", "10", "10", "10", "10"),
  (1, "Malacor", "1", "6", "300","18", "10", "10", "10", "10", "10");