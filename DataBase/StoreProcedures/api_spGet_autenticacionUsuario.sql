-- USE UaantojosP; -- 3306
USE UaantojosC; -- 3308

DROP PROCEDURE IF EXISTS api_spGet_autenticacionUsuario;

DELIMITER //

CREATE PROCEDURE api_spGet_autenticacionUsuario (
    IN pCorreo varchar(35),
    IN pContra varchar(65),
    IN pToken varchar(50)
)
BEGIN
    DECLARE nombresO	varchar(25);
    DECLARE apMaternoO	varchar(15);
    DECLARE apPaternoO	varchar(15);
    DECLARE idUser		INT;
    DECLARE tipo		INT;
    DECLARE tokenU		varchar(50);
    DECLARE err_msg		TEXT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            err_msg = MESSAGE_TEXT;
        INSERT INTO ErrorLog(nombre_store, error_message, error_time) VALUES('api_spGet_autenticacionUsuario', err_msg, NOW());
        ROLLBACK;
        SELECT  nombresO,
                apMaternoO,
                apPaternoO,
                idUser,
                tipo,
                tokenU AS token;
    END;

	SET nombresO = '';
    SET apMaternoO = '';
    SET apPaternoO = '';
    SET idUser = 0;
    SET tipo = 0;
    SET tokenU = '';

    START TRANSACTION;

    IF EXISTS (SELECT id FROM Cliente WHERE Correo = pCorreo AND Contrasena = pContra AND Activo = b'1') THEN
        SELECT id, Nombres, ApMaterno, ApPaterno 
        INTO idUser, nombresO, apMaternoO, apPaternoO
        FROM Cliente
        WHERE Correo = pCorreo AND Contrasena = pContra AND Activo = b'1';

		SET tipo = 1; 
        UPDATE Cliente
        SET token = pToken
        WHERE id = idUser;
        
		SET tokenU = pToken;

	ELSEIF EXISTS (SELECT id FROM Vendedor WHERE Correo = pCorreo AND Contrasena = pContra AND Activo = b'1') THEN
		SELECT id, Nombres, ApMaterno, ApPaterno 
        INTO idUser, nombresO, apMaternoO, apPaternoO
        FROM Vendedor
        WHERE Correo = pCorreo AND Contrasena = pContra AND Activo = b'1';

        SET tipo = 2;
		
        UPDATE Vendedor
		SET token = pToken
		WHERE id = idUser;
        
        SET tokenU = pToken;
    END IF;
    
    COMMIT;
	SELECT nombresO 'Nombres', 
		apMaternoO 'ApMaterno', 
		apPaternoO 'ApPaterno',
		idUser 'id',
		tipo 'Tipo',
		tokenU 'Token';
END //

DELIMITER ;

CALL api_spGet_autenticacionUsuario('dorisleiva@example.org', '8ae37612cb18f948185d8732a10eec6c005f07c2f9995bee93a9f52e571be07a', '83cb86b353568c969c19487d91df7d8735b088636235d7234d');

