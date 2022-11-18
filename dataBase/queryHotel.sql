SET NAMES 'UTF8MB4';
DROP DATABASE IF EXISTS informacionHoteles;
CREATE DATABASE IF NOT EXISTS informacionHoteles DEFAULT CHARACTER SET UTF8MB4;
USE informacionHoteles;informacionhoteles

CREATE TABLE gerentes(
id_grt						INTEGER NOT NULL AUTO_INCREMENT,
nombre						VARCHAR(40) NOT NULL,
ap_paterno			VARCHAR(20) NOT NULL,
ap_materno			VARCHAR(20) NOT NULL,
telefono                    VARCHAR(10) NOT NULL,
CONSTRAINT pk_gerentes PRIMARY KEY(id_grt)
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE hoteles(
id_htl                      INTEGER NOT NULL AUTO_INCREMENT,
id_gerente					INTEGER NOT NULL,
nombre                      VARCHAR(40) NOT NULL,
direccion                   VARCHAR(100) NOT NULL,
telefono                    VARCHAR(10) NOT NULL,
correo                  	VARCHAR(50) NOT NULL,
CONSTRAINT pk_hoteles PRIMARY KEY(id_htl),
CONSTRAINT fk_hotelGerente FOREIGN KEY(id_gerente) REFERENCES gerentes(id_grt),
CONSTRAINT uk_hotelGerente UNIQUE(id_gerente)
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE categorias(
tipo                  VARCHAR(20) NOT NULL,
CONSTRAINT pk_tipo PRIMARY KEY(tipo)
)DEFAULT CHARACTER SET UTF8MB4;

INSERT INTO categorias(tipo) VALUES('SIMPLE');
INSERT INTO categorias(tipo) VALUES('MATRIMONIAL');
INSERT INTO categorias(tipo) VALUES('PREMIUM');

CREATE TABLE habitaciones(
id_hbt						INTEGER NOT NULL AUTO_INCREMENT,
id_hotel 					INTEGER NOT NULL,
refrigerador				BOOLEAN NOT NULL,
tipo                  VARCHAR(20) NOT NULL,
CONSTRAINT u_habitaciones UNIQUE(tipo, id_hotel), 
CONSTRAINT pk_habitaciones PRIMARY KEY(id_hbt),
CONSTRAINT fk_habitacionHotel FOREIGN KEY(id_hotel) REFERENCES hoteles(id_htl),
CONSTRAINT fk_tipohabitacion FOREIGN KEY(tipo) REFERENCES categorias(tipo)
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE imgGerentes(
nombre                      VARCHAR(150) NOT NULL,
imagen                      MEDIUMBLOB NOT NULL,
id_gerente1                 INTEGER NOT NULL,
img_tipo                    VARCHAR(20) NOT NULL,
CONSTRAINT pk_imagenesGerente  PRIMARY KEY(id_gerente1),
CONSTRAINT fk_imagenesGerente FOREIGN KEY(id_gerente1) REFERENCES gerentes(id_grt)
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE imgHoteles(
id_hotel1                   INTEGER NOT NULL,
nombre                      VARCHAR(150) NOT NULL,
img_tipo                    VARCHAR(20) NOT NULL,
imagen                      MEDIUMBLOB NOT NULL,
CONSTRAINT pk_imagenesHotel PRIMARY KEY(id_hotel1, nombre),
CONSTRAINT fk_imagenesHotel FOREIGN KEY(id_hotel1) REFERENCES hoteles(id_htl)
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE imgHabitaciones(
id_habitacion1              INTEGER NOT NULL,
nombre                      VARCHAR(150) NOT NULL,
imagen                      MEDIUMBLOB NOT NULL,
img_tipo                    VARCHAR(20) NOT NULL,
CONSTRAINT pk_imagenesHabitacion PRIMARY KEY(nombre, id_habitacion1),
CONSTRAINT fk_imagenesHabitacion FOREIGN KEY(id_habitacion1) REFERENCES habitaciones(id_hbt) 
)DEFAULT CHARACTER SET UTF8MB4;

DESCRIBE gerentes;
SELECT * FROM habitaciones;

INSERT INTO gerentes(nombre, ap_paterno, ap_materno, telefono) VALUES('Axel', 'Neri', 'Lucero', 5545855243);
INSERT INTO hoteles(id_gerente, nombre, direccion, telefono, correo) VALUES(1, 'x', 'fes aragon', 5554123243, 'raradafa');
INSERT INTO habitaciones(id_hotel, refrigerador, tipo) VALUES(1, TRUE, 'SIMPLE');
INSERT INTO habitaciones(id_hotel, refrigerador, tipo) VALUES(1, TRUE, 'MATRIMONIAL');
INSERT INTO habitaciones(id_hotel, refrigerador, tipo) VALUES(1, TRUE, 'PREMIUM');
INSERT INTO habitaciones(id_hotel, refrigerador, tipo) VALUES(1, FALSE, 'SIMPLE');