-- USE UaantojosP; -- 3306
USE UaantojosC; -- 3308

DELIMITER //

CREATE PROCEDURE api_spDelete_eliminarCampus (
    IN idCampus INT
)
BEGIN
    DECLARE response VARCHAR(50);
    DECLARE err_msg TEXT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            err_msg = MESSAGE_TEXT;
        INSERT INTO ErrorLog(nombre_store, error_message, error_time) VALUES('api_spDelete_eliminarCampus', err_msg, NOW());
        SET response = err_msg;
        ROLLBACK;
        SELECT response;
    END;

    START TRANSACTION;

    IF EXISTS (SELECT id FROM Campus WHERE id = idCampus AND Activo = b'1') THEN
        UPDATE Campus
        SET Activo = b'0'
        WHERE id = idCampus;
        SET response = 'SUCCESS';
    ELSE
        SET response = 'Campus no encontrado';
    END IF;

    COMMIT;
    SELECT response;
END //

DELIMITER ;

CALL api_spDelete_eliminarCampus(2);