package servlet;
import java.io.*;
import java.io.PrintWriter;
import javax.servlet.*;
import javax.servlet.http.*;
import tools.Connect;
import propriete.Parcelle;
import java.sql.Connection;
import java.sql.Date;
import org.json.JSONArray;
import org.json.JSONObject;

public class GetParcelleCulturePossible extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		handleCORS(res);
		res.setContentType("application/json;charset=UTF-8");
        PrintWriter out = res.getWriter();

		try{
			Connect con = new Connect();
			Connection c = con.makeConnection();
			String nId = req.getParameter("parcelle");
			Parcelle p = new Parcelle();
			Parcelle[] allParcelle = p.findSpecifiedParcelleCulturePossible(c,nId);
			JSONArray jsonArray = new JSONArray();
		    for (Parcelle parcelle : allParcelle) {
		        JSONObject parcelleJson = new JSONObject();
		        parcelleJson.put("idParcelle", parcelle.getId());
		        parcelleJson.put("culture", parcelle.getCulture());
		        jsonArray.put(parcelleJson);
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