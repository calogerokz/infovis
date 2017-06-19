name := """infovis"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.11"

libraryDependencies += jdbc
libraryDependencies += cache
libraryDependencies += ws
// https://mvnrepository.com/artifact/postgresql/postgresql
libraryDependencies += "org.postgresql" % "postgresql" % "42.1.1"
libraryDependencies += "org.webjars.npm" % "jquery" % "3.2.1"
libraryDependencies += "org.webjars.npm" % "bootstrap" % "3.3.7"
libraryDependencies += "org.webjars.npm" % "bootstrap-slider" % "9.7.2"
libraryDependencies += "org.webjars.npm" % "async" % "2.1.4"