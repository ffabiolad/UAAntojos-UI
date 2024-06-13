-- USE UaantojosC; -- 3308

 USE UaantojosP -- 3306

DELIMITER //
CREATE PROCEDURE api_spGet_consultarCampusActivos ()
BEGIN
    SELECT id, Nombre, Longitud, Latitud, Activo, IdCreador
    FROM Campus
    WHERE Activo = b'1';
END //
DELIMITER ;

CALL api_spGet_consultarCampusActivos();
