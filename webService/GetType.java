package servlet;
import java.io.*;
import java.io.PrintWriter;
import javax.servlet.*;
import javax.servlet.http.*;
import tools.Connect;
import information.TypeCulture;
import java.sql.Connection;
import java.sql.Date;
import org.json.JSONArray;
import org.json.JSONObject;

public class GetType extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		handleCORS(res);
		res.setContentType("application/json;charset=UTF-8");
        PrintWriter out = res.getWriter();

		try{
			Connect con = new Connect();
			Connection c = con.makeConnection();
			TypeCulture t = new TypeCulture();
			TypeCulture[] allType = t.findType(c);
			JSONArray jsonArray = new JSONArray();
		    for (TypeCulture type : allType) {
		        JSONObject typeJson = new JSONObject();
		        typeJson.put("idType", type.getId());
		        typeJson.put("nom", type.getNom());
		        jsonArray.put(typeJson);
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
