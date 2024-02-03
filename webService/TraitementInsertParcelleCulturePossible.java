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

public class TraitementInsertParcelleCulturePossible extends HttpServlet {
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		handleCORS(res);
		res.setContentType("application/json;charset=UTF-8");
        PrintWriter out = res.getWriter();

		try{
            String t = req.getParameter("parcelle");
            String type = req.getParameter("type");
			Connect con = new Connect();
			Connection c = con.makeConnection();
			Parcelle p = new Parcelle();
			Parcelle nP = new Parcelle(t,type);
			p.insertParcelleCulturePossible(c,nP);
			c.close();
			out.print("{ \"success\": \"Insertion réussie\" }");	
		}
		catch (Exception e) {
			e.printStackTrace();
			out.print("{ \"error\": \"Oups... Quelque chose s'est mal passé\" }");
		}
	}

	private void handleCORS(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Max-Age", "86400");
    }
}