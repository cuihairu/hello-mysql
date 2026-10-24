# Installation and Configuration of MySQL

Installing and configuring MySQL is the first step in using a MySQL database. This section covers the steps to install MySQL on different operating systems and the basic configuration methods, including how to install MySQL with Docker and specify an initialization SQL file.

## Installing MySQL on Linux

1. **Using APT (Debian/Ubuntu)**:
   ```sh
   sudo apt update
   sudo apt install mysql-server
   sudo mysql_secure_installation
   ```

2. **Using YUM (CentOS/RHEL)**:
   ```sh
   sudo yum update
   sudo yum install mysql-server
   sudo systemctl start mysqld
   sudo mysql_secure_installation
   ```

3. **Configuring MySQL**:
   - Edit the `/etc/mysql/my.cnf` file for basic configuration.
   - Set the root password and create database users. First connect to the server with `sudo mysql`, then run the following statements:
     ```sql
     ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'your_password';
     CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
     GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' WITH GRANT OPTION;
     FLUSH PRIVILEGES;
     ```

## Installing MySQL on Windows

1. **Download and install**:
   - Download the MySQL installer from the official MySQL website.
   - Double-click the installer and follow the installation wizard.

2. **Configuring MySQL**:
   - During installation, select MySQL Server and MySQL Workbench.
   - Configure the root user password and choose a default character set.

3. **Starting the MySQL service**:
   - Open the command prompt and enter the following command to start the MySQL service (when installed with the wizard, the Windows service name defaults to `MySQL80`; if you customized the service name during installation, replace it with the actual service name):
     ```cmd
     net start MySQL80
     ```

## Installing MySQL on macOS

1. **Installing with Homebrew**:
   ```sh
   brew update
   brew install mysql
   brew services start mysql
   ```

2. **Configuring MySQL**:
   - Set the root password and create database users. First run `mysql_secure_installation`, then connect to the server with `mysql -u root -p`, and run the following statements:
     ```sql
     ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'your_password';
     CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
     GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' WITH GRANT OPTION;
     FLUSH PRIVILEGES;
     ```

## Installing MySQL with Docker

1. **Pulling the MySQL image**:
   ```sh
   docker pull mysql:latest
   ```

2. **Running a MySQL container**:
   ```sh
   docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=root_password -d mysql:latest
   ```

3. **Specifying an initialization SQL file**:
   - Create a directory containing initialization SQL files, for example `/path/to/sql-files`, and place the initialization SQL files in it.
   - Use the following command to run a MySQL container and specify the initialization SQL files:
     ```sh
     docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=root_password -v /path/to/sql-files:/docker-entrypoint-initdb.d -d mysql:latest
     ```

4. **Connecting to the MySQL container**:
   - Use the Docker exec command to enter the MySQL container:
     ```sh
     docker exec -it mysql-container mysql -u root -p
     ```

5. **Configuring MySQL**:
   - After entering the MySQL container, set the root password and create database users:
     ```sql
     ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'your_password';
     CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
     GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' WITH GRANT OPTION;
     FLUSH PRIVILEGES;
     ```

Once installation and configuration are complete, you can connect to the MySQL server via MySQL Workbench or a command-line client to create and manage databases.

## References

- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html)
- [MySQL 8.0 Reference Manual · Installation](https://dev.mysql.com/doc/refman/8.0/en/installing.html)
- [MySQL 8.0 Reference Manual · Binary Installation](https://dev.mysql.com/doc/refman/8.0/en/binary-installation.html)

<!-- BACKLINKS-AUTO -->
## Related pages

- [README](README.md)
