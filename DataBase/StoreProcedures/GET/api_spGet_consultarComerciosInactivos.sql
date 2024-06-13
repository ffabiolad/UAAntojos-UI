USE UaantojosP; -- 3306

DROP PROCEDURE IF EXISTS api_spGet_consultarComerciosInactivos;

DELIMITER //
CREATE PROCEDURE api_spGet_consultarComerciosInactivos ()
BEGIN
    SELECT 
		id,
		IdCreador,
        NombreComercial,
        Activo
    FROM Comercio
    WHERE Activo = b'0';
END //
DELIMITER ;

CALL api_spGet_consultarComerciosInactivos();
