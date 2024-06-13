USE UaantojosP; -- 3306

DROP PROCEDURE IF EXISTS api_spGet_consultarComercioVendedor;

DELIMITER //
CREATE PROCEDURE api_spGet_consultarComercioVendedor (
	IN pIdComercio INT
)
BEGIN
    SELECT 
		V.Nombres,
        V.ApPaterno,
        V.ApMaterno,
        CU.Administrador,
        CU.IdUsuarioAdd
    FROM Comercio C
	INNER JOIN ComercioUsuario CU ON CU.IdComercio = C.id
    INNER JOIN Vendedor V ON V.id = CU.IdVendedor
    WHERE CU.IdComercio = pIdComercio
    AND CU.Activo = b'1';
END //
DELIMITER ;

CALL api_spGet_consultarComercioVendedor(15);
