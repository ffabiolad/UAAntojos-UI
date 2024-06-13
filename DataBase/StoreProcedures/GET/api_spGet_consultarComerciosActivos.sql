USE UaantojosP -- 3306

DELIMITER //
CREATE PROCEDURE api_spGet_consultarComerciosActivos ()
BEGIN
    SELECT 
		id,
		IdCreador,
        NombreComercial,
        Activo
    FROM Comercio
    WHERE Activo = b'1';
END //
DELIMITER ;

CALL api_spGet_consultarComerciosActivos();
