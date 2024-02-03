CREATE USER farmGame WITH PASSWORD 'farmGame';
ALTER USER farmGame WITH SUPERUSER;
createdb -O farmGame farmGame;
\c farmGame;

CREATE SEQUENCE utilisateurSeq START WITH 1 INCREMENT BY 1 CACHE 1 NO CYCLE;

CREATE TABLE Utilisateur(
	idUtilisateur varchar(30) PRIMARY KEY,
	nom varchar(300),
	prenom varchar(300),
	dateNaissance date,
	mail varchar(300),
	motDePasse varchar(100),
	pseudo varchar(300)
);

CREATE SEQUENCE saisonSeq START WITH 1 INCREMENT BY 1 CACHE 1 NO CYCLE;

CREATE TABLE Saison(
	idSaison varchar(30) PRIMARY KEY,
	nom varchar(300),
	debut date,
	fin date
);

INSERT INTO Saison VALUES ('S' || nextval('saisonSeq'),'Hiver',TO_DATE('12-01','MM-DD'),TO_DATE('03-31','MM-DD'));
INSERT INTO Saison VALUES ('S' || nextval('saisonSeq'),'Printemps',TO_DATE('04-01','MM-DD'),TO_DATE('06-30','MM-DD'));
INSERT INTO Saison VALUES ('S' || nextval('saisonSeq'),'Été',TO_DATE('07-01','MM-DD'),TO_DATE('09-30','MM-DD'));
INSERT INTO Saison VALUES ('S' || nextval('saisonSeq'),'Automne',TO_DATE('10-01','MM-DD'),TO_DATE('11-30','MM-DD'));

CREATE SEQUENCE typeCultureSeq START WITH 1 INCREMENT BY 1 CACHE 1 NO CYCLE;

CREATE TABLE TypeCulture(
	idTypeCulture varchar(30) PRIMARY KEY,
	nom varchar(400)
);

INSERT INTO TypeCulture VALUES ('TC' || nextval('typeCultureSeq'),'Céréales');
INSERT INTO TypeCulture VALUES ('TC' || nextval('typeCultureSeq'),'Légumineuses');
INSERT INTO TypeCulture VALUES ('TC' || nextval('typeCultureSeq'),'Oléagineux');
INSERT INTO TypeCulture VALUES ('TC' || nextval('typeCultureSeq'),'Fruits');
INSERT INTO TypeCulture VALUES ('TC' || nextval('typeCultureSeq'),'Légumes');
INSERT INTO TypeCulture VALUES ('TC' || nextval('typeCultureSeq'),'Racines et Tubercules');
INSERT INTO TypeCulture VALUES ('TC' || nextval('typeCultureSeq'),'Cultures Industrielles');
INSERT INTO TypeCulture VALUES ('TC' || nextval('typeCultureSeq'),'Cultures Horticoles');
INSERT INTO TypeCulture VALUES ('TC' || nextval('typeCultureSeq'),'Cultures Spéciales');

CREATE SEQUENCE cultureSeq START WITH 1 INCREMENT BY 1 CACHE 1 NO CYCLE;

CREATE TABLE Culture(
	idCulture varchar(30) PRIMARY KEY,
	nom varchar(800),
	type varchar(30),
	prixAchat numeric,
	prixVente numeric,
	saison varchar(30),
	photo varchar(800),
	foreign key (type) references TypeCulture(idTypeCulture),
	foreign key (saison) references Saison(idSaison)
);

CREATE TABLE CultureUtilisateur(
	idCulture varchar(30),
	idUtilisateur varchar(30),
	foreign key (idCulture) references Culture(idCulture),
	foreign key (idUtilisateur) references Utilisateur(idUtilisateur)
);

create or replace view AllUtilisateurCulture as (select CultureUtilisateur.idUtilisateur,CultureUtilisateur.idCulture,Culture.nom,TypeCulture.nom as type,prixAchat,prixVente,Saison.nom as saison,photo
	from CultureUtilisateur
	join Culture on CultureUtilisateur.idCulture = Culture.idCulture
	join Utilisateur on CultureUtilisateur.idUtilisateur = Utilisateur.idUtilisateur
	join TypeCulture on Culture.type = TypeCulture.idTypeCulture
	join Saison on Culture.saison = Saison.idSaison
);

create or replace view AllUtilisateurCultureDetails as (select Utilisateur.pseudo as proprietaire,CultureUtilisateur.idCulture,Culture.nom,TypeCulture.nom as type,prixAchat,prixVente,Saison.nom as saison,photo
	from CultureUtilisateur
	join Culture on CultureUtilisateur.idCulture = Culture.idCulture
	join Utilisateur on CultureUtilisateur.idUtilisateur = Utilisateur.idUtilisateur
	join TypeCulture on Culture.type = TypeCulture.idTypeCulture
	join Saison on Culture.saison = Saison.idSaison
);

create or replace view CultureDetails as (select idCulture,Culture.nom,TypeCulture.nom as type,prixAchat,prixVente,Saison.nom as saison,photo
	from Culture
	join TypeCulture on Culture.type = TypeCulture.idTypeCulture
	join Saison on Culture.saison = Saison.idSaison
);

CREATE SEQUENCE terrainSeq START WITH 1 INCREMENT BY 1 CACHE 1 NO CYCLE;

CREATE TABLE Terrain(
	idTerrain varchar(30) PRIMARY KEY,
	proprietaire varchar(30),
	description varchar(800),
	localisation varchar(800),
	photo varchar(800),
	dateCreation date,
	etat numeric,
	foreign key (proprietaire) references Utilisateur(idUtilisateur)
);

create or replace view TerrainDetails as (select idTerrain,Utilisateur.pseudo as proprietaire,description,localisation,photo,dateCreation,etat
	from Terrain
	join Utilisateur on Terrain.proprietaire = Utilisateur.idUtilisateur
);

CREATE SEQUENCE parcelleSeq START WITH 1 INCREMENT BY 1 CACHE 1 NO CYCLE;

CREATE TABLE Parcelle(
	idParcelle varchar(30) PRIMARY KEY,
	longueur numeric,
	largeur numeric,
	terrain varchar(30),
	foreign key (terrain) references Terrain(idTerrain)
);

create or replace view ParcelleDetails as (select idParcelle,(longueur * largeur) as superficie,terrain
	from Parcelle
);

create or replace view ParcelleDetailsTerrainProprietaire as (select idParcelle,superficie,terrain,proprietaire
	from ParcelleDetails
	join Terrain on Terrain.idTerrain = ParcelleDetails.terrain
);

CREATE TABLE ParcelleCulturePossible(
	idParcelle varchar(30),
	idTypeCulture varchar(30),
	foreign key (idParcelle) references Parcelle(idParcelle),
	foreign key (idTypeCulture) references TypeCulture(idTypeCulture)
);

create or replace view ParcelleCulturePossibleDetails as (select idParcelle,TypeCulture.nom as culture
	from ParcelleCulturePossible
	join TypeCulture on ParcelleCulturePossible.idTypeCulture = TypeCulture.idTypeCulture
);

CREATE TABLE ParcelleCulture(
	idParcelle varchar(30),
	idCulture varchar(30),
	quantite numeric,
	dateCulture date,
	foreign key (idParcelle) references Parcelle(idParcelle),
	foreign key (idCulture) references Culture(idCulture)
);

create or replace view HistoriqueCulture as (select terrain,ParcelleCulture.idParcelle,Culture.nom as culture,quantite,(quantite * prixAchat) as coutRevient, dateCulture
	from ParcelleCulture
	join Culture on ParcelleCulture.idCulture = Culture.idCulture
	join Parcelle on ParcelleCulture.idParcelle = Parcelle.idParcelle
	join Terrain on Parcelle.terrain = Terrain.idTerrain
);

create or replace view HistoriqueCultureProprietaire as (select terrain,idparcelle,culture,quantite,coutRevient,dateCulture,proprietaire
	from HistoriqueCulture
	join Terrain on HistoriqueCulture.terrain = Terrain.idTerrain
);

select sum(quantite) from HistoriqueCultureProprietaire WHERE proprietaire = 'USER011';

CREATE SEQUENCE simulationSeq START WITH 1 INCREMENT BY 1 CACHE 1 NO CYCLE;

CREATE TABLE Simulation(
	idSimulation varchar(30) PRIMARY KEY,
	idParcelle varchar(30),
	idCulture varchar(30),
	quantite numeric,
	dateSimulation date,
	foreign key (idParcelle) references Parcelle(idParcelle),
	foreign key (idCulture) references Culture(idCulture)
);

create or replace view SimulationCulture as (select idSimulation,idParcelle,Culture.nom as culture,quantite,(quantite * prixAchat) as coutRevient, dateSimulation
	from Simulation
	join Culture on Simulation.idCulture = Culture.idCulture
);

create or replace view SimulationCultureProprietaire as (select idSimulation,SimulationCulture.idParcelle,culture,quantite,coutRevient,dateSimulation,idTerrain as terrain,ParcelleDetailsTerrainProprietaire.proprietaire
	from SimulationCulture
	join ParcelleDetailsTerrainProprietaire on ParcelleDetailsTerrainProprietaire.idParcelle = SimulationCulture.idParcelle
	join Terrain on Terrain.idTerrain = ParcelleDetailsTerrainProprietaire.terrain
);

SELECT count(idSimulation) from SimulationCultureProprietaire WHERE proprietaire = 'USER011';

SELECT AVG(nbParcelle) as nbMoyen FROM (SELECT COUNT(idParcelle) as nbParcelle FROM ParcelleDetailsTerrainProprietaire WHERE proprietaire = 'USER011' GROUP BY terrain) AS getNbMoyen;

select sum(quantite) from SimulationCultureProprietaire WHERE proprietaire = 'USER011';

-- À faire en MongoDB

-- CREATE TABLE Discussion(
-- 	envoyeur varchar(30),
-- 	receveur varchar(30),
-- 	message varchar(800),
-- );
