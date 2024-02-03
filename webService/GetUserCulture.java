package servlet;
import java.io.*;
import java.io.PrintWriter;
import javax.servlet.*;
import javax.servlet.http.*;
import tools.Connect;
import information.Culture;
import java.sql.Connection;
import java.sql.Date;
import org.json.JSONArray;
import org.json.JSONObject;

public class GetUserCulture extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		handleCORS(res);
		res.setContentType("application/json;charset=UTF-8");
        PrintWriter out = res.getWriter();

		try{
			Connect con = new Connect();
			Connection c = con.makeConnection();
			String nId = req.getParameter("user");
			Culture t = new Culture();
			Culture[] allCulture = t.findSpecifiedUserCulture(c,nId);
			JSONArray jsonArray = new JSONArray();
		    for (Culture culture : allCulture) {
		        JSONObject cultureJson = new JSONObject();
		        cultureJson.put("proprietaire", culture.getProprietaire());
		        cultureJson.put("idCulture", culture.getId());
		        cultureJson.put("nom", culture.getNom());
		        cultureJson.put("type", culture.getType());
		        cultureJson.put("prixAchat", culture.getPrixAchat());
		        cultureJson.put("prixVente", culture.getPrixVente());
		        cultureJson.put("saison", culture.getSaison());
		        cultureJson.put("photo", culture.getPhoto());
		        jsonArray.put(cultureJson);
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
