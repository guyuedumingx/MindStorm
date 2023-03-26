FROM tomcat:8-jre8-alpine

COPY /target/MindStorm-1.0-SNAPSHOT.war /usr/local/tomcat/webapps/

EXPOSE 8080

CMD ["catalina.sh", "run"]
