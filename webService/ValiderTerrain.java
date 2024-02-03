package servlet;
import java.io.*;
import java.io.PrintWriter;
import javax.servlet.*;
import javax.servlet.http.*;
import tools.Connect;
import propriete.Terrain;
import java.sql.Connection;
import java.sql.Date;
import org.json.JSONArray;
import org.json.JSONObject;

public class ValiderTerrain extends HttpServlet {
	public void doPut(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		handleCORS(res);
		res.setContentType("application/json;charset=UTF-8");
        PrintWriter out = res.getWriter();

		try{
			Connect con = new Connect();
			Connection c = con.makeConnection();
			String t = req.getParameter("terrain");
			Terrain nT = new Terrain();
			nT.validerTerrain(c,t);
			c.close();
			out.print("{ \"success\": \"Validation réussie\" }");	
		}
		catch (Exception e) {
			e.printStackTrace();
			out.print("{ \"error\": \"Oups... Quelque chose s'est mal passé\" }");
		}
	}

	private void handleCORS(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "PUT, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Max-Age", "86400");
    }
}
