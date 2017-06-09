package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.db._
import play.api.libs.json.{JsArray, JsDefined, Json}
import scala.concurrent.{ExecutionContext, Future}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.collection.mutable.ListBuffer



@Singleton
class Api @Inject()(db: Database) extends Controller {

  def query(q: String) = Action {
    val conn = db.getConnection()

    try {
      val stmt = conn.createStatement
      val rs = stmt.executeQuery(q)
      val rsmd = rs.getMetaData();
      val numberOfColumns = rsmd.getColumnCount();
      var list = new ListBuffer[JsArray]()
      while(rs.next()) {
        var column = new ListBuffer[String]()
        for (i <- 1 to numberOfColumns) {
           column += rs.getString(i)
        }
        val columnList = column.toList
        val row = Json.arr(columnList)
        list += row
      }
      val finalList = list.toList
      val jsonList = Json.arr(finalList)

      Ok(jsonList)
    }
  }
  def events(season: String) = Action {
    val conn = db.getConnection()

    try {
      val stmt = conn.createStatement
      val rs = stmt.executeQuery("SELECT * FROM events WHERE season=".concat(season))
      val rsmd = rs.getMetaData();
      val numberOfColumns = rsmd.getColumnCount();
      var list = new ListBuffer[JsArray]()
      while(rs.next()) {
        var column = new ListBuffer[String]()
        for (i <- 1 to numberOfColumns) {
          column += rs.getString(i)
        }
        val columnList = column.toList
        val row = Json.arr(columnList)
        list += row
      }
      val finalList = list.toList
      val jsonList = Json.arr(finalList)

      Ok(jsonList)
    }
  }
}
