SET NAMES 'UTF8MB4';
DROP DATABASE IF EXISTS informacionH;
CREATE DATABASE IF NOT EXISTS informacionH DEFAULT CHARACTER SET UTF8MB4;
USE informacionH;
CREATE TABLE hotel(
id_htl                               INTEGER NOT NULL AUTO_INCREMENT,
nombre                        VARCHAR(40) NOT NULL,
direccion                        VARCHAR(40) NOT NULL,
telefono                        VARCHAR(20) NOT NULL,
correo                  VARCHAR(240) NOT NULL,
id_gerente					INTEGER NOT NULL,
PRIMARY KEY(id_htl)
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE gerente(
id_grt								INTEGER NOT NULL AUTO_INCREMENT,
nombre											VARCHAR(40) NOT NULL,
apellido_paterno											VARCHAR(40) NOT NULL,
apellido_materno											VARCHAR(40) NOT NULL,
telefono                        VARCHAR(20) NOT NULL,
PRIMARY KEY(id_grt)
)DEFAULT CHARACTER SET UTF8MB4;

ALTER TABLE hotel ADD CONSTRAINT FK_hotelGerente
				FOREIGN KEY(id_gerente) REFERENCES gerente(id_grt);
ALTER TABLE hotel ADD CONSTRAINT UK_hotelGerente
				UNIQUE(id_gerente);

CREATE TABLE habitaciones(
id_hbt								INTEGER NOT NULL AUTO_INCREMENT,
piso											VARCHAR(40) NOT NULL,
nombre											VARCHAR(40) NOT NULL,
refrigerador									BOOLEAN NOT NULL,
id_hotel 							INTEGER NOT NULL,
PRIMARY KEY(id_hbt)
)DEFAULT CHARACTER SET UTF8MB4;

ALTER TABLE habitaciones ADD CONSTRAINT FK_habitacionHotel
					FOREIGN KEY(id_hotel) REFERENCES hotel(id_htl);