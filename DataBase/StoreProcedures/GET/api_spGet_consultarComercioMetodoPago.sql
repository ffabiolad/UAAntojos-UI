USE UaantojosP; -- 3306

DROP PROCEDURE IF EXISTS api_spGet_consultarComercioMetodoPago;

DELIMITER //
CREATE PROCEDURE api_spGet_consultarComercioMetodoPago (
	IN pIdComercio INT
)
BEGIN
    SELECT 
		MP.Metodo
    FROM Comercio C
    INNER JOIN TipoPagoComercio TPC ON TPC.IdComercio = C.id
    INNER JOIN MetodoPago MP ON TPC.IdMetodoPago = MP.id
    WHERE TPC.IdComercio = pIdComercio
    AND TPC.Activo = b'1';
END //
DELIMITER ;

CALL api_spGet_consultarComercioMetodoPago(34);
