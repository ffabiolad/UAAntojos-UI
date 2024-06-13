USE UaantojosP; -- 3306
-- USE UaantojosP; -- 3308

DELIMITER //
CREATE PROCEDURE api_spGet_consultarCampusInactivos ()
BEGIN
    SELECT id, Nombre, Longitud, Latitud, Activo, IdCreador
    FROM Campus
    WHERE Activo = b'0';
END //
DELIMITER ;

CALL api_spGet_consultarCampusInactivos();