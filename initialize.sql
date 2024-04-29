USE aca_capstone;

DROP TABLE IF EXISTS usersContact, characterCreation, class, users;


CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  PRIMARY KEY (id)
);

CREATE TABLE usersContact (
  id INT NOT NULL AUTO_INCREMENT,
  
  phone1 VARCHAR(50),
  email VARCHAR(50),
  PRIMARY KEY (id),
  FOREIGN KEY (id)
  REFERENCES users (id)
    ON DELETE CASCADE
);

CREATE TABLE characterCreation (
  id INT NOT NULL AUTO_INCREMENT,
  
  charactername VARCHAR(50),
  userlevel INT,
  userHealth INT,
  strength INT,
  intelligence INT,
  will INT,
  dexterity INT,
  constitution INT,
  charisma INT,
  
  PRIMARY KEY (id),
  FOREIGN KEY (id)
  REFERENCES users (id)
    ON DELETE CASCADE
);

CREATE TABLE class (
id INT NOT NULL AUTO_INCREMENT,
fighter TEXT,
mage TEXT,
crusader TEXT,
thief TEXT,
explorer TEXT,
venturer TEXT,

PRIMARY KEY (id),
FOREIGN KEY (id)
REFERENCES users(id)
);

INSERT INTO users
	(first_name, last_name)
VALUES 
  ("James","Butt"),
  ("Homer", "John"),
  ("Jim", "Jam"),
  ("Bob", "Bo"),
  ("Erik", "Vik");
  
INSERT INTO usersContact 
  (phone1, email)
VALUES 
  ("626-696-2777","cory.gibes@gmail.com"),
  ("555-555-5555", "kirk.herritt@aol.com"),
  ("415-926-6089","lai@gmail.com"),
  ("703-938-7939","taryn.moyd@hotmail.com"),
  ("401-552-9059","caitlin.julia@julia.org");
  
INSERT INTO characterCreation
  (charactername, userlevel, userhealth, strength, intelligence, will, dexterity, constitution, charisma)
VALUES 
  ("Alarik", "1", "8", "16", "10", "10", "10", "10", "10"),
  ("Grok", "1", "5", "14", "10", "10", "10", "10", "10"),
  ("Strider", "1", "7", "12", "10", "10", "10", "10", "10"),
  ("Kirith", "1", "4", "17", "10", "10", "10", "10", "10"),
  ("Malacor", "1", "6", "18", "10", "10", "10", "10", "10");