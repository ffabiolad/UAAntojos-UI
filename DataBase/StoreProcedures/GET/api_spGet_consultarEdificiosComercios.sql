USE UaantojosP; -- 3306

DROP PROCEDURE IF EXISTS api_spGet_consultarEdificiosComercios;

DELIMITER //
CREATE PROCEDURE api_spGet_consultarEdificiosComercios (
	IN pIdCampus INT
)
BEGIN
    SELECT 
        E.id AS idEdifiio,
        E.Numero,
        E.Longitud,
        E.Latitud,
        E.Activo AS E_Activos,
        E.Campus_idCampus AS idCampus,
        CA.Nombre
    FROM Comercio C
    INNER JOIN EdificioComercio EC ON C.id = EC.IdComercio
    INNER JOIN Edificio E ON E.id = EC.IdEdificio
    INNER JOIN Campus CA ON E.Campus_idCampus = CA.id
    WHERE C.Activo = b'1'
    AND C.id = pIdCampus;
END //
DELIMITER ;

CALL api_spGet_consultarEdificiosComercios(34);
