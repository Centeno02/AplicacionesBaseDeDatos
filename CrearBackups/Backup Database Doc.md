# Documentación del Procedimiento Almacenado `BackupDatabase`

## Descripción

El procedimiento almacenado `BackupDatabase` permite realizar backups automáticos de una base de datos en SQL Server. Soporta tres tipos de backups:

- **FULL**: Backup completo de la base de datos.
- **DIFFERENTIAL**: Backup de los cambios realizados desde el último backup completo.
- **LOG**: Backup de los registros de transacciones, permitiendo la recuperación punto a punto.

## Requisitos

- SQL Server debe tener habilitado `xp_cmdshell` si se desea crear directorios de forma dinámica.
- El usuario que ejecuta el procedimiento debe tener permisos de backup sobre la base de datos.
- La carpeta `C:\Backups\` debe tener permisos de escritura para SQL Server.

## Definición del Procedimiento

```sql
CREATE PROCEDURE BackupDatabase
    @DatabaseName NVARCHAR(255),
    @BackupType NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @BackupPath NVARCHAR(500);
    DECLARE @BackupFileName NVARCHAR(500);
    DECLARE @BackupCommand NVARCHAR(MAX);
    DECLARE @CurrentDate NVARCHAR(20);
    DECLARE @CreateDirCommand NVARCHAR(MAX);
    
    -- Validar si la base de datos existe
    IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = @DatabaseName)
    BEGIN
        RAISERROR ('La base de datos especificada no existe.', 16, 1);
        RETURN;
    END
    
    -- Obtener la fecha actual en formato YYYYMMDD_HHMMSS
    SET @CurrentDate = FORMAT(GETDATE(), 'yyyyMMdd_HHmmss');
    
    -- Definir la ruta base para el backup
    SET @BackupPath = 'C:\Backups\' + @DatabaseName + '\' + @BackupType + '\';
    
    -- Crear directorio si no existe (requiere permisos adecuados)
    SET @CreateDirCommand = 'IF NOT EXISTS (SELECT * FROM sys.master_files WHERE physical_name LIKE ''' + @BackupPath + '%'')
                             EXEC xp_cmdshell ''mkdir "' + @BackupPath + '"''';
    EXEC sp_executesql @CreateDirCommand;
    
    -- Crear el nombre del archivo de backup
    SET @BackupFileName = @BackupPath + @DatabaseName + '_' + @BackupType + '_' + @CurrentDate + '.bak';
    
    -- Construir el comando de backup
    IF @BackupType = 'FULL'
        SET @BackupCommand = 'BACKUP DATABASE [' + @DatabaseName + '] TO DISK = ''' + @BackupFileName + ''' WITH FORMAT, INIT, COMPRESSION';
    ELSE IF @BackupType = 'DIFFERENTIAL'
        SET @BackupCommand = 'BACKUP DATABASE [' + @DatabaseName + '] TO DISK = ''' + @BackupFileName + ''' WITH DIFFERENTIAL, INIT, COMPRESSION';
    ELSE IF @BackupType = 'LOG'
        SET @BackupCommand = 'BACKUP LOG [' + @DatabaseName + '] TO DISK = ''' + @BackupFileName + ''' WITH INIT, COMPRESSION';
    ELSE
    BEGIN
        RAISERROR ('Tipo de backup no válido. Use FULL, DIFFERENTIAL o LOG.', 16, 1);
        RETURN;
    END
    
    -- Ejecutar el comando de backup
    EXEC sp_executesql @BackupCommand;
    
    PRINT 'Backup realizado con éxito: ' + @BackupFileName;
END
```

## Uso del Procedimiento Almacenado

### 1. Realizar un Backup Completo

```sql
EXEC BackupDatabase @DatabaseName = 'EmpresaDB', @BackupType = 'FULL';
```

- Genera un archivo en `C:\Backups\EmpresaDB\Full\` con el nombre `EmpresaDB_FULL_YYYYMMDD_HHMMSS.bak`

### 2. Realizar un Backup Diferencial

```sql
EXEC BackupDatabase @DatabaseName = 'EmpresaDB', @BackupType = 'DIFFERENTIAL';
```

- Se almacena en `C:\Backups\EmpresaDB\Differential\`

### 3. Realizar un Backup de Logs

```sql
EXEC BackupDatabase @DatabaseName = 'EmpresaDB', @BackupType = 'LOG';
```

- Se almacena en `C:\Backups\EmpresaDB\Log\`

## Posibles Errores y Soluciones

### ❌ `La base de datos especificada no existe.`
# Documentación del Procedimiento Almacenado `BackupDatabase`

## Descripción

El procedimiento almacenado `BackupDatabase` permite realizar backups automáticos de una base de datos en SQL Server. Soporta tres tipos de backups:

- **FULL**: Backup completo de la base de datos.
- **DIFFERENTIAL**: Backup de los cambios realizados desde el último backup completo.
- **LOG**: Backup de los registros de transacciones, permitiendo la recuperación punto a punto.

## Requisitos

- SQL Server debe tener habilitado `xp_cmdshell` si se desea crear directorios de forma dinámica.
- El usuario que ejecuta el procedimiento debe tener permisos de backup sobre la base de datos.
- La carpeta `C:\Backups\` debe tener permisos de escritura para SQL Server.

## Definición del Procedimiento

```sql
CREATE PROCEDURE BackupDatabase
    @DatabaseName NVARCHAR(255),
    @BackupType NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @BackupPath NVARCHAR(500);
    DECLARE @BackupFileName NVARCHAR(500);
    DECLARE @BackupCommand NVARCHAR(MAX);
    DECLARE @CurrentDate NVARCHAR(20);
    DECLARE @CreateDirCommand NVARCHAR(MAX);
    
    -- Validar si la base de datos existe
    IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = @DatabaseName)
    BEGIN
        RAISERROR ('La base de datos especificada no existe.', 16, 1);
        RETURN;
    END
    
    -- Obtener la fecha actual en formato YYYYMMDD_HHMMSS
    SET @CurrentDate = FORMAT(GETDATE(), 'yyyyMMdd_HHmmss');
    
    -- Definir la ruta base para el backup
    SET @BackupPath = 'C:\Backups\' + @DatabaseName + '\' + @BackupType + '\';
    
    -- Crear directorio si no existe (requiere permisos adecuados)
    SET @CreateDirCommand = 'IF NOT EXISTS (SELECT * FROM sys.master_files WHERE physical_name LIKE ''' + @BackupPath + '%'')
                             EXEC xp_cmdshell ''mkdir "' + @BackupPath + '"''';
    EXEC sp_executesql @CreateDirCommand;
    
    -- Crear el nombre del archivo de backup
    SET @BackupFileName = @BackupPath + @DatabaseName + '_' + @BackupType + '_' + @CurrentDate + '.bak';
    
    -- Construir el comando de backup
    IF @BackupType = 'FULL'
        SET @BackupCommand = 'BACKUP DATABASE [' + @DatabaseName + '] TO DISK = ''' + @BackupFileName + ''' WITH FORMAT, INIT, COMPRESSION';
    ELSE IF @BackupType = 'DIFFERENTIAL'
        SET @BackupCommand = 'BACKUP DATABASE [' + @DatabaseName + '] TO DISK = ''' + @BackupFileName + ''' WITH DIFFERENTIAL, INIT, COMPRESSION';
    ELSE IF @BackupType = 'LOG'
        SET @BackupCommand = 'BACKUP LOG [' + @DatabaseName + '] TO DISK = ''' + @BackupFileName + ''' WITH INIT, COMPRESSION';
    ELSE
    BEGIN
        RAISERROR ('Tipo de backup no válido. Use FULL, DIFFERENTIAL o LOG.', 16, 1);
        RETURN;
    END
    
    -- Ejecutar el comando de backup
    EXEC sp_executesql @BackupCommand;
    
    PRINT 'Backup realizado con éxito: ' + @BackupFileName;
END
```

## Uso del Procedimiento Almacenado

### 1. Realizar un Backup Completo

```sql
EXEC BackupDatabase @DatabaseName = 'EmpresaDB', @BackupType = 'FULL';
```

- Genera un archivo en `C:\Backups\EmpresaDB\Full\` con el nombre `EmpresaDB_FULL_YYYYMMDD_HHMMSS.bak`

### 2. Realizar un Backup Diferencial

```sql
EXEC BackupDatabase @DatabaseName = 'EmpresaDB', @BackupType = 'DIFFERENTIAL';
```

- Se almacena en `C:\Backups\EmpresaDB\Differential\`

### 3. Realizar un Backup de Logs

```sql
EXEC BackupDatabase @DatabaseName = 'EmpresaDB', @BackupType = 'LOG';
```

- Se almacena en `C:\Backups\EmpresaDB\Log\`

## Posibles Errores y Soluciones

### ❌ `La base de datos especificada no existe.`

✔ Verifique que el nombre de la base de datos sea correcto ejecutando:

```sql
SELECT name FROM sys.databases;
```

### ❌ `Tipo de backup no válido. Use FULL, DIFFERENTIAL o LOG.`

✔ Asegúrese de que el valor de `@BackupType` sea uno de los tres permitidos.

### ❌ `xp_cmdshell no está habilitado`

✔ Habilite `xp_cmdshell` con:

```sql
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'xp_cmdshell', 1;
RECONFIGURE;
```

## Conclusión

Este procedimiento almacenado permite gestionar de manera sencilla y automatizada los respaldos en SQL Server, asegurando que cada tipo de backup se almacene en su respectiva carpeta. Puede ser programado mediante SQL Server Agent para ejecutarse en intervalos regulares.


✔ Verifique que el nombre de la base de datos sea correcto ejecutando:

```sql
SELECT name FROM sys.databases;
```

### ❌ `Tipo de backup no válido. Use FULL, DIFFERENTIAL o LOG.`

✔ Asegúrese de que el valor de `@BackupType` sea uno de los tres permitidos.

### ❌ `xp_cmdshell no está habilitado`

✔ Habilite `xp_cmdshell` con:

```sql
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'xp_cmdshell', 1;
RECONFIGURE;
```

## Conclusión

Este procedimiento almacenado permite gestionar de manera sencilla y automatizada los respaldos en SQL Server, asegurando que cada tipo de backup se almacene en su respectiva carpeta. Puede ser programado mediante SQL Server Agent para ejecutarse en intervalos regulares.

