SET NAMES 'UTF8MB4';
DROP DATABASE IF EXISTS informacionHoteles;
CREATE DATABASE IF NOT EXISTS informacionHoteles DEFAULT CHARACTER SET UTF8MB4;
USE informacionHoteles;

CREATE TABLE gerentes(
id_grt						INTEGER NOT NULL AUTO_INCREMENT,
nombre						VARCHAR(40) NOT NULL,
apellido_paterno			VARCHAR(20) NOT NULL,
apellido_materno			VARCHAR(20) NOT NULL,
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

CREATE TABLE habitaciones(
id_hbt						INTEGER NOT NULL AUTO_INCREMENT,
id_hotel 					INTEGER NOT NULL,
piso						VARCHAR(10) NOT NULL,
nombre						VARCHAR(30) NOT NULL,
refrigerador				BOOLEAN NOT NULL,
CONSTRAINT pk_habitaciones PRIMARY KEY(id_hbt),
CONSTRAINT fk_habitacionHotel FOREIGN KEY(id_hotel) REFERENCES hoteles(id_htl)
)DEFAULT CHARACTER SET UTF8MB4;