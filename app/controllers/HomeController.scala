package controllers

import javax.inject._
import play.api._
import play.api.mvc._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject() extends Controller {

  /**
   * Create an Action to render an HTML page with a welcome message.
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index = Action {
    Ok(views.html.index("New York 311 requests"))
  }

  def map = Action {
    Ok(views.html.map("New York 311 requests map"))
  }

    def events = Action {
    Ok(views.html.events("New York 311 requests statistics"))
  }

  def map_vis_test = Action {
    Ok(views.html.map_vis_test("New York 311 requests map"))
  }

}
