USE UaantojosP; -- 3306

DROP PROCEDURE IF EXISTS api_spGet_consultarPedidoComercio;

DELIMITER //
CREATE PROCEDURE api_spGet_consultarPedidoComercio (
	IN pIdComercio INT
)
BEGIN
	SELECT 
		P.id AS idPedido,
        P.IdCliente,
        CONCAT(C.Nombres, ' ', C.ApPaterno, ' ', C.ApMaterno) AS Nombre,
        MP.Metodo,
        P.EstadoPedido,
        P.Longitud,
        P.Latitud,
        IFNULL(FechaEntregado, '-') AS fechaEntregado
    FROM Pedido P 
    INNER JOIN MetodoPago MP ON P.IdMetodoPago = MP.id
    INNER JOIN Cliente C ON C.id = P.IdCliente
    WHERE P.IdComercio = pIdComercio;
END //
DELIMITER ;

CALL api_spGet_consultarPedidoComercio(15);

