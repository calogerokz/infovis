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

  val conn = db.getConnection()

  def query(q: String) = Action {
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

  def event(id: String) = Action {
    print(id)
    try {
      val stmt = conn.createStatement
      val rs = stmt.executeQuery("SELECT * FROM events WHERE id=".concat(id))
      val rsmd = rs.getMetaData();
      val numberOfColumns = rsmd.getColumnCount();
      var list = new JsArray();
      while(rs.next()) {
        var column = new ListBuffer[String]()
        for (i <- 1 to numberOfColumns) {
          column += rs.getString(i)
        }
        val columnList = column.toList
        list = Json.arr(columnList)
      }
      Ok(list)
    }
  }

  def eventFive(first: String, second: String, third: String, forth: String, fifth:String, day:String, month:String, year:String) = Action {
    val dayString = month.concat("/").concat(day).concat("/").concat(year)
    try {
      val stmt = conn.createStatement
      val q = "SELECT latitude, longitude FROM year2016 WHERE created_date LIKE '".concat(dayString).concat("%' AND (complaint_type='").concat(first).concat("' OR complaint_type='").concat(second).concat("' OR complaint_type='").concat(third).concat("' OR complaint_type='").concat(forth).concat("' OR complaint_type='").concat(fifth).concat("') AND latitude IS NOT NULL")
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
}


