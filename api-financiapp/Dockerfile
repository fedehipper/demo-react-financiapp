FROM maven:3.6.0-jdk-11-slim

COPY . /workdir
WORKDIR /workdir
RUN mvn clean package

WORKDIR /target
ENTRYPOINT java -jar financiapp.jar
