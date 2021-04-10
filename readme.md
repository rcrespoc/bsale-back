# Backend BSale Test.

El ejercicio consiste en la creación de un backend con una API de consulta a la base de datos que se ha proporcionado.

La API contiene diferentes endpoints que sirven para consumir la data dependiendo de la búsqueda que se haga desde el Frontend.

La documentación siguiente contiene distintos módulos que se encargan de realizar distintas funciones necesarias.

La categoria controllers contiene los métodos que serán ejecutados al consultar un endpoint específico con el método apropiado.

La categoria helpers contiene aquellas funciones que permiten hacer más liviana la búsqueda de la información proveniente del Frontend, esto para que la ejecución de los controladores a la base de datos sea lo más limpia posible y se eviten errores posibles.

La categoría db contiene el objeto de conexión a base de datos.

La categoria middleware contiene aquellas funciones que validan la información proveniente del Frontend antes de que esta vaya a las funciones de los controladores.

La categoria routes contiene todas aquellas rutas que están declaradas en el servidor y su respectivo método.

La clase Servidor contiene la declaración de la misma y todos los métodos que se ejecutan una vez se ha instanciado un objeto.