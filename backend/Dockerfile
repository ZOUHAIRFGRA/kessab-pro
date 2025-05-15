FROM eclipse-temurin:17-jre

# Set working directory
WORKDIR /app

# Copy the JAR file
COPY target/*.jar app.jar

# Set environment variables
ENV SPRING_PROFILES_ACTIVE=azure
ENV TZ=UTC

# Expose the port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
