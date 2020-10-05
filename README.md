# Como levantar el proyecto

## Configurar la base de datos
Por defecto la aplicación backend va contra una base de datos postgres donde se debe configurar un schema public. 
Pero se puede utilizar otra base relacional cambiando las properties.

Otra opción es utilizar una base de datos en memoria, para esto:
* cambiar en el pom el scope de h2 a runtime y eliminar o comentar la dependencia de postgres.
* eliminar o comentar las properties de postgres.

## Correr la app de react con npm start.
