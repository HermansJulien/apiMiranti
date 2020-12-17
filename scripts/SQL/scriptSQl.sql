
DROP TABLE IF EXISTS client CASCADE;

CREATE TABLE client
(
  mailAddress VARCHAR(255) NOT NULL,
  accountPassword VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL,
  name VARCHAR(30) NOT NULL,
  firstname VARCHAR(40) NOT NULL,
  PRIMARY KEY (mailAddress)
);

insert into client values('john@mail.com','$2a$10$fiKILzSQn2YvA.mbmxhqa.7f8pErrnl4qofZY7nE/a5Vq8KakfPKG','admin','John','John');
insert into client values('marcus@mail.com','$2a$10$fiKILzSQn2YvA.mbmxhqa.7f8pErrnl4qofZY7nE/a5Vq8KakfPKG','user','Marcus','Johnson');
insert into client values('poirier@mail.com','$2a$10$fiKILzSQn2YvA.mbmxhqa.7f8pErrnl4qofZY7nE/a5Vq8KakfPKG','user','Poirier','Tevin');

DROP TABLE IF EXISTS Country CASCADE;
CREATE TABLE Country
(
  idCountry INT NOT NULL,
  countryName varchar(50) NOT NULL,
  PRIMARY KEY (idCountry)
);
insert into Country values(1,'Belgique');
insert into Country values(2,'Luxemburg');
insert into Country values(3,'Netherlands');
insert into Country values(4,'France');
DROP TABLE IF EXISTS Locality CASCADE;
CREATE TABLE Locality
(
  idLocality INT NOT NULL,
  localityName varchar(50) NOT NULL,
  /*frenchName VARCHAR(50) NOT NULL,
  englishName VARCHAR(50) NOT NULL,
  germanName VARCHAR(50) NOT NULL,
  dutchName VARCHAR(50) NOT NULL,*/
  idCountry INT NOT NULL,
  PRIMARY KEY (idLocality),
  FOREIGN KEY (idCountry) REFERENCES Country(idCountry)
);

insert into locality values(1,'Bruxelles',1);
insert into locality values(2,'Namur',1);
insert into locality values(3,'Paris',4);
insert into locality values(4,'Marseille',4);
insert into locality values(5,'Luxembourg',2);
insert into locality values(6,'Mechelen',2);
insert into locality values(7,'Maastricht',3);
insert into locality values(8,'Amsterdam',3);

DROP TABLE IF EXISTS Heritage CASCADE;
CREATE TABLE Heritage
(
  technicalID INT NOT NULL GENERATED ALWAYS AS IDENTITY,
  heritageName varchar(50) NOT NULL,
  kindOfHeritage VARCHAR(50) NOT NULL,
  localization VARCHAR(75) NOT NULL,
  author VARCHAR(50),
  creationDate DATE,
  idLocality INT NOT NULL,
  frenchDescription VARCHAR(255) NOT NULL,
  englishDescription VARCHAR(255) NOT NULL,
  picture VARCHAR(255) NOT NULL,
  PRIMARY KEY (technicalID),
  FOREIGN KEY (idLocality) REFERENCES Locality(idLocality)
);

insert into Heritage (heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDescription,englishDescription,picture) values('Tour Eiffel','Monument','place x','Gustave Eiffel','1887-01-28',3,'Crée pour l exposition universel ', 'Created for the universal exposition','/img/247d0847-133a-4fb3-833d-8025e49ae8c0.jpeg');
insert into Heritage (heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDescription,englishDescription,picture) values('Louvre','Museum','Musée du Louvre','Louis Le Vau','1793-08-10',3,'Musée d art français','French Art Museum','/img/23b80cdd-a690-4d6b-9e82-59dd26c07f6d.jpeg');
insert into Heritage (heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDescription,englishDescription,picture) values('Chateau d IF','Castle','Embarcadère Frioul If, 1 Quai de la Fraternité','François I','1527-08-10',4,'Chateau du Comte de Monte-Cristo','Castle of the Count of Monte-Cristo ','/img/9b7fe3da-d237-40d5-9965-f91ea2f46e9a.jpeg');
insert into Heritage (heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDescription,englishDescription,picture) values('Les calanques','Natural','Mer',null,null,4,'Paysage magnifique','Beautifull landschap','/img/c956750e-38f3-4ba0-afb1-f0e376877da2.jpeg');


insert into Heritage (heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDescription,englishDescription,picture) values('Atonium','Monument','Square de l Atomium','Frères Polak','1957-01-28',1,'Crée pour l exposition universel ', 'Created for the universal exposition','/img/9a62b608-5e9b-45b6-8ba5-ed0aa790c607.jpeg');
insert into Heritage (heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDescription,englishDescription,picture) values('Musée de la bd','Museum','Rue des Sables 20','Victor Horta','1906-08-10',1,'Musée de la bd belge','Beglian Srips Museum','/img/356ad825-ec0d-43e0-958b-818feabeec21.jpeg');
insert into Heritage (heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDescription,englishDescription,picture) values('Citadelle','Castle','Route Merveilleuse 64','Menno van Coehoorn','1577-07-25',2,'Citadelle de Namur utilisé durant les guerres mondials','This heritage was used during the world wars ','/img/766086ce-65d9-4130-a9aa-e7fec3d56862.jpeg');
insert into Heritage (heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDescription,englishDescription,picture) values('Parc Marie Louise','Natural','Parc Louise Marie',null,null,2,'Petit parc belge','Small belgian park','/img/7621a7f1-374b-4c79-b8fc-078af4342a5a.jpeg');


insert into Heritage (heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDescription,englishDescription,picture) values('Monument du Millénaire','Natural','Dans le sud de la ville',null,'1963-01-28',5,'Site archéologique ', 'archaeological site','/img/860572f0-608c-4f81-8596-ce3b29d09b49.jpeg');
insert into Heritage (heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDescription,englishDescription,picture) values('Musée d art moderne grand duc','Museum','3 Park Drai Eechelen','Ieoh Ming Pei','2006-08-02',5,'Musée artistique','Art museum','/img/eaad3f09-24f2-4d7f-831f-88f2143a42a1.jpeg');
insert into Heritage (heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDescription,englishDescription,picture) values('Chateau de Vianden','Castle','Montée du Château','Charles Arendt','400-07-25',6,'Chateau fort','Medieval castel','/img/0d364cf4-dc22-432b-8416-bdc016c34c32.jpeg');


insert into Heritage (heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDescription,englishDescription,picture) values('Basilique Notre-Dame','Monument','Centre ville',null,'1000-01-28',7,'Eglise catholique', 'Catholic church','/img/98dbdfb1-e46c-4299-b87c-91980ba98f59.jpeg');
insert into Heritage (heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDescription,englishDescription,picture) values('Musée au Vrijthof','Museum','Vrijthof 18',null,'1973-08-10',7,'musée d histoire, d art et de l artisanat d art ','museum of history, art and crafts','/img/971ddf4d-f3ba-4b7e-88aa-7dfa769935c4.jpeg');
insert into Heritage (heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDescription,englishDescription,picture) values('Port d Amsterdam','Natural','Port d Amsterdam',null,null,8,'Plus grand port de Belgique','Biggest belgian harbor ','/img/55c0e6e4-f2ba-4478-9537-e90372b8be0b.jpeg');


DROP TABLE IF EXISTS HeritageUserRepertorySeen CASCADE;
CREATE TABLE HeritageUserRepertorySeen
(
  
  isLiked INT,
  mailAddress VARCHAR(30) NOT NULL,
  technicalID INT NOT NULL,
  PRIMARY KEY (mailAddress,technicalID),
  FOREIGN KEY (mailAddress) REFERENCES client(mailAddress) ON DELETE CASCADE,
  FOREIGN KEY (technicalID) REFERENCES Heritage(technicalID) ON DELETE CASCADE
);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(1,'john@mail.com',1);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(1,'poirier@mail.com',2);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(1,'poirier@mail.com',3);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(1,'poirier@mail.com',4);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(1,'poirier@mail.com',5);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(1,'poirier@mail.com',6);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(1,'poirier@mail.com',7);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(1,'poirier@mail.com',8);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(1,'poirier@mail.com',9);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(1,'poirier@mail.com',10);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(1,'poirier@mail.com',11);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(1,'poirier@mail.com',12);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(1,'poirier@mail.com',13);

insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(0,'marcus@mail.com',2);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(0,'marcus@mail.com',4);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(0,'marcus@mail.com',5);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(0,'marcus@mail.com',6);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(0,'marcus@mail.com',7);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(0,'marcus@mail.com',8);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(0,'marcus@mail.com',9);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(0,'marcus@mail.com',10);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(0,'marcus@mail.com',11);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(0,'marcus@mail.com',12);
insert into HeritageUserRepertorySeen (isLiked,mailAddress,technicalID) values(0,'marcus@mail.com',13);



