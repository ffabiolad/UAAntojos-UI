USE UaantojosP; -- 3306
-- USE UaantojosP; -- 3308

DELIMITER //
CREATE PROCEDURE api_spGet_consultarEdificiosCampus(
	IN idCampus INT
)
BEGIN
    SELECT 
		id,
		Numero,
        Longitud,
        Latitud,
        Activo
    FROM Edificio
    WHERE Campus_idCampus = idCampus;
END //
DELIMITER ;

CALL api_spGet_consultarEdificiosCampus(1);