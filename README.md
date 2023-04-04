<h1>Microservicio de NestJS destinado a publicar mensajes en un tópico de Kafka</h1>
<p>Este repositorio contiene un microservicio desarrollado con NestJS que se encarga de publicar mensajes a un tópico de Kafka. Este servicio puede ser utilizado para integrar diferentes sistemas que requieran la comunicación a través de Kafka.</p>
<h2>Requerimientos</h2>
<p>Para utilizar este microservicio es necesario contar con NodeJS y NestJS instalados. Además, se debe contar con acceso a un cluster de Kafka y configurar adecuadamente las variables de entorno.</p>
<h2>Instalación</h2>
<ol>
  <li>Clonar este repositorio en tu máquina local.</li>
  <li>Ejecutar el comando <code>npm install</code> para instalar las dependencias.</li>
  <li>Configurar las variables de entorno en el archivo <code>.env</code>, utilizando el archivo <code>.env.example</code> como referencia.</li>
  <li>Ejecutar el comando <code>npm start</code> para iniciar el microservicio.</li>
</ol>

<h2>Pruebas</h2>
<p>Para ejecutar los tests del microservicio, utiliza el siguiente comando:</p>
<pre>
npm run test
</pre>
<p>Este comando ejecutará los tests unitarios y de integración, utilizando Jest como framework de pruebas.</p> 
<p>Recuerda que para ejecutar los tests es necesario tener un cluster de Kafka disponible para realizar las pruebas de integración. Puedes configurar las variables de entorno para utilizar un cluster de Kafka en un ambiente de desarrollo o pruebas.</p>
<h2>Uso</h2>
<p>Antes de iniciar el microservicio, asegúrate de tener un cluster de Kafka disponible. Si no tienes uno disponible, puedes utilizar Docker Compose para iniciar un cluster de Kafka localmente:</p>
<pre>
docker-compose up -d
</pre>
<p>Este comando iniciará un cluster de Kafka en Docker, el cual puedes utilizar para pruebas o desarrollo.</p>
<p>Una vez iniciado el cluster de Kafka, puedes iniciar el microservicio con el siguiente comando:</p>
<pre>
npm start
</pre>
<p>Una vez iniciado el microservicio, se pueden enviar mensajes a través de la ruta <code>/publish</code>, utilizando el método POST. El cuerpo de la solicitud debe contener el mensaje que se desea enviar, en formato JSON.</p>
<p>Ejemplo de solicitud:</p>
<pre>
POST /publish HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "message": "Hola, mundo!",
  "topic": "mi-topico-kafka"
}
</pre>
<p>El microservicio se encargará de enviar el mensaje al tópico de Kafka especificado en las variables de entorno.</p>
<p>Recuerda detener el cluster de Kafka de Docker Compose cuando termines de utilizarlo:</p>
<pre>
docker-compose down
</pre>
<h2>Contribuciones</h2>
<p>Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:</p>
<ol>
  <li>Haz un fork de este repositorio.</li>
  <li>Crea una rama con tu nueva funcionalidad o arreglo.</li>
  <li>Realiza tus cambios y verifica que todo funciona correctamente.</li>
  <li>Realiza una solicitud de extracción a la rama principal de este repositorio.</li>
</ol>
<h2>Licencia</h2>
<p>Este proyecto está bajo la Licencia MIT - ver el archivo <a href="LICENSE">LICENSE</a> para más detalles.</p>
