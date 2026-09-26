# ====== STAGE 1: BUILD ======
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copia apenas arquivos necessários primeiro (melhora cache)
COPY pom.xml .
RUN mvn dependency:go-offline

# Agora copia o restante
COPY src ./src

# Gera o jar
RUN mvn clean package -DskipTests


# ====== STAGE 2: RUNTIME ======
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copia o jar gerado
COPY --from=build /app/target/*.jar app.jar

COPY uploads_imgs_banner ./uploads_imgs_banner

ENTRYPOINT ["java", "-jar", "app.jar"]