FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY .env ./
RUN ./mvnw dependency:resolve

COPY src ./src

RUN ./mvnw package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/kessabPro-0.0.1-SNAPSHOT.jar"]
