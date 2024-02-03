package servlet;
import java.io.*;
import java.io.PrintWriter;
import javax.servlet.*;
import javax.servlet.http.*;
import tools.Connect;
import information.Saison;
import java.sql.Connection;
import java.sql.Date;
import org.json.JSONArray;
import org.json.JSONObject;

public class GetSaison extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		handleCORS(res);
		res.setContentType("application/json;charset=UTF-8");
        PrintWriter out = res.getWriter();

		try{
			Connect con = new Connect();
			Connection c = con.makeConnection();
			Saison s = new Saison();
			Saison[] allSaison = s.findSaison(c);
			JSONArray jsonArray = new JSONArray();
		    for (Saison saison : allSaison) {
		        JSONObject saisonJson = new JSONObject();
		        saisonJson.put("idSaison", saison.getId());
		        saisonJson.put("nom", saison.getNom());
		        saisonJson.put("debut", saison.getDebut());
		        saisonJson.put("fin", saison.getFin());
		        jsonArray.put(saisonJson);
		    }
		    c.close();
		    out.print(jsonArray.toString());
		}

		catch (Exception e) {
			e.printStackTrace();
			out.print("{ \"error\": \"Oups... Quelque chose s'est mal passé\" }");
		}
	}

	private void handleCORS(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Max-Age", "86400");
    }
}
