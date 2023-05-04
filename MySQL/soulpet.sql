USE soulpet_db;

SELECT * FROM clientes;
SELECT * FROM enderecos;
SELECT * FROM pets;

SHOW TABLES;

drop database soulpet_db;
create database soulpet_db;

CREATE TABLE backup_pets( 
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nome` varchar(130) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `porte` varchar(255) NOT NULL,
  `dataNasc` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `clienteId` varchar(130) NOT NULL,
  `deletedAt` datetime NOT NULL
) engine=innoDB;


CREATE TRIGGER backup_pets
BEFORE DELETE
ON pets
FOR EACH ROW
	INSERT INTO backup_pets ( 
  `id`,
  `nome`,
  `tipo`,
  `porte`,
  `dataNasc`,
  `createdAt`,
  `updatedAt`,
  `clienteId`,
  `deletedAt` 
  ) VALUES (
	OLD.id,
    OLD.nome,
    OLD.tipo,
    OLD.porte,
    OLD.dataNasc,
    OLD.createdAt,
    OLD.updatedAt,
    OLD.clienteId,
    NOW()
  );
  
  
  DELETE FROM pets WHERE id = 1;
  SELECT * FROM pets;
  SELECT * FROM backup_pets;
  
  
  
  CREATE TABLE backup_clientes(
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(130) NOT NULL,
  `telefone` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  `deleteAt` datetime NOT NULL
  ) engine=innoDB;
  
  CREATE TRIGGER backup_clientes
  BEFORE DELETE
  ON clientes
  FOR EACH ROW 
	INSERT INTO backup_clientes (
    `id`, 
    `nome`,
    `email`,
    `telefone`, 
    `createdAt`,
    `updateAt`,
    `deleteAt`
    ) VALUES (
    OLD.id,
    OLD.nome,
	OLD.telefone,
    OLD.email,
    OLD.createdAt,
    OLD.updatedAt,
    now()
    );
    
    DELETE FROM clientes WHERE id=1;
    SELECT * FROM clientes;
    SELECT * FROM backup_clientes;
    
    
    CREATE TABLE backup_produtos(
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(255) NOT NULL,
  `preco` DOUBLE NOT NULL,
  `descricao` VARCHAR(150) NOT NULL,
  `desconto` DOUBLE NOT NULL,
  `dataDesconto` DATE NOT NULL,
  `categoria` VARCHAR(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  `deleteAt` datetime NOT NULL
  ) engine=innoDB;
  
  
  CREATE TRIGGER backup_produtos
  BEFORE DELETE
  ON produtos
  FOR EACH ROW 
	INSERT INTO backup_produtos (
    `id`, 
    `nome`,
    `preco`,
    `descricao`,
    `desconto`,
    `dataDesconto`,
    `categoria`,
    `createdAt`,
    `updateAt`,
    `deleteAt`
    ) VALUES (
    OLD.id,
    OLD.nome,
	OLD.preco,
    OLD.descricao,
    OLD.desconto,
    OLD.dataDesconto,
    OLD.categoria,
    OLD.createdAt,
    OLD.updatedAt,
    now()
    );
    
    
    DELETE FROM produtos WHERE id=1;
    SELECT * FROM produtos;
    SELECT * FROM backup_produtos;
    
    
    CREATE TABLE backup_agendamentos(
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `dataAgendada` DATE NOT NULL,
  `realizada` TINYINT NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  `deleteAt` datetime NOT NULL
  ) engine=innoDB;
  
  CREATE TRIGGER backup_agendamentos
  BEFORE DELETE
  ON agendamentos
  FOR EACH ROW 
	INSERT INTO backup_agendamentos (
    `id`, 
    `dataAgendada`,
    `realizada`,
    `createdAt`,
    `updateAt`,
    `deleteAt`
    ) VALUES (
    OLD.id,
    OLD.dataAgendada,
	OLD.realizada,
    OLD.createdAt,
    OLD.updatedAt,
    now()
    );
    
    DELETE FROM agendamentos WHERE id=1;
    SELECT * FROM agendamentos;
    SELECT * FROM backup_agendamentos;
	
    
        CREATE TABLE backup_servicos(
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(255) NOT NULL,
  `preco` DOUBLE NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  `deleteAt` datetime NOT NULL
  ) engine=innoDB;
  
  
  CREATE TRIGGER backup_servicos
  BEFORE DELETE
  ON servicos
  FOR EACH ROW 
	INSERT INTO backup_servicos (
    `id`, 
    `nome`,
    `preco`,
    `createdAt`,
    `updateAt`,
    `deleteAt`
    ) VALUES (
    OLD.id,
    OLD.nome,
	OLD.preco,
    OLD.createdAt,
    OLD.updatedAt,
    now()
    );
    
     DELETE FROM servicos WHERE id=1;
    SELECT * FROM servicos;
    SELECT * FROM backup_servicos;
    
    
            CREATE TABLE backup_pedidos(
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `codigo` CHAR(36) NOT NULL,
  `quantidade` INT NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  `deleteAt` datetime NOT NULL
  ) engine=innoDB;
  
  
  CREATE TRIGGER backup_pedidos
  BEFORE DELETE
  ON pedidos
  FOR EACH ROW 
	INSERT INTO backup_pedidos (
    `id`, 
    `codigo`,
    `quantidade`,
    `createdAt`,
    `updateAt`,
    `deleteAt`
    ) VALUES (
    OLD.id,
    OLD.codigo,
	OLD.quantidade,
    OLD.createdAt,
    OLD.updatedAt,
    now()
    );
    
         DELETE FROM pedidos WHERE id=1;
    SELECT * FROM pedidos;
    SELECT * FROM backup_pedidos;
    
	CREATE TABLE backup_enderecos(
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `clienteId` INT NOT NULL,
  `uf` VARCHAR(2) NOT NULL,
  `cidade` VARCHAR(255) NOT NULL,
  `cep` VARCHAR(9) NOT NULL,
  `rua` VARCHAR(255) NOT NULL,
  `numero` VARCHAR(255) NOT NULL,
  `updateAt` datetime NOT NULL,
  `deleteAt` datetime NOT NULL
  ) engine=innoDB;
  
  
  CREATE TRIGGER backup_enderecos
  BEFORE DELETE
  ON enderecos
  FOR EACH ROW 
	INSERT INTO backup_enderecos (
    `id`,
    `clienteId`,
    `uf`,
    `cidade`,
    `cep`,
    `rua`,
    `numero`,
    `createdAt`,
    `updateAt`,
    `deleteAt`
    ) VALUES (
    OLD.id,
    OLD.clienteId,
    OLD.uf,
	OLD.cidade,
    OLD.cep,
    OLD.rua,
    OLD.numero,
    OLD.createdAt,
    OLD.updatedAt,
    now()
    );
    
	DELETE FROM enderecos WHERE id=1;
    SELECT * FROM enderecos;
    SELECT * FROM backup_enderecos;
    DROP TRIGGER backup_enderecos;
    
    