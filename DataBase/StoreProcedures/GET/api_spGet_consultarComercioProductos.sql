USE UaantojosP; -- 3306

DROP PROCEDURE IF EXISTS api_spGet_consultarComercioProductos;

DELIMITER //
CREATE PROCEDURE api_spGet_consultarComercioProductos (
	IN pIdComercio INT
)
BEGIN
    SELECT 
        P.id AS idProducto,
        P.IdComercio,
        P.Categoria_idCategoria As idCategoria,
        P.Nombre,
        P.Precio,
        P.Descripcion,
        P.Disponible,
        P.Activo
    FROM Comercio C
    INNER JOIN Producto P ON P.IdComercio = C.id
    WHERE P.idComercio = pIdComercio
    AND P.Activo = b'1';
END //
DELIMITER ;

CALL api_spGet_consultarComercioProductos(34);
