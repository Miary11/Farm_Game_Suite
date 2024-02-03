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

public class GetUserTerrain extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		handleCORS(res);
		res.setContentType("application/json;charset=UTF-8");
        PrintWriter out = res.getWriter();

		try{
			Connect con = new Connect();
			Connection c = con.makeConnection();
			String nId = req.getParameter("user");
			Terrain t = new Terrain();
			Terrain[] allTerrain = t.findAllUserTerrain(c,nId);
			JSONArray jsonArray = new JSONArray();
		    for (Terrain terrain : allTerrain) {
		        JSONObject terrainJson = new JSONObject();
		        terrainJson.put("idTerrain", terrain.getId());
		        terrainJson.put("proprietaire", terrain.getProprietaire());
		        terrainJson.put("description", terrain.getDescription());
		        terrainJson.put("localisation", terrain.getLocalisation());
		        terrainJson.put("photo", terrain.getPhoto());
		        terrainJson.put("creation", terrain.getCreation());
		        terrainJson.put("etat", terrain.getEtat());
		        jsonArray.put(terrainJson);
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
