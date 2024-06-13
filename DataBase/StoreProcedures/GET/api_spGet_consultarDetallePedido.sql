USE UaantojosP; -- 3306

DROP PROCEDURE IF EXISTS api_spGet_consultarDetallePedido;

DELIMITER //
CREATE PROCEDURE api_spGet_consultarDetallePedido (
	IN pIdPedido INT
)
BEGIN
	SELECT 
		DP.IdProducto,
        PR.Nombre,
        DP.Cantidad,
        PR.Precio
    FROM DetallePedido DP 
    INNER JOIN Pedido P ON DP.idPedido = P.id
    INNER JOIN Producto PR ON PR.id = DP.IdProducto
    WHERE DP.idPedido = pIdPedido;
END //
DELIMITER ;

CALL api_spGet_consultarDetallePedido(5);

