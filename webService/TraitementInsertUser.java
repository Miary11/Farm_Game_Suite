package servlet;
import java.io.*;
import java.io.PrintWriter;
import javax.servlet.*;
import javax.servlet.http.*;
import tools.Connect;
import information.Utilisateur;
import java.sql.Connection;
import java.sql.Date;
import org.json.JSONArray;
import org.json.JSONObject;

public class TraitementInsertUser extends HttpServlet {
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		handleCORS(res);
		res.setContentType("application/json;charset=UTF-8");
        PrintWriter out = res.getWriter();

		try{
			Utilisateur u = new Utilisateur();
			String n = req.getParameter("nom");
			String p = req.getParameter("prenom");
			String d = req.getParameter("naissance");
			Date nD = u.getSqlDate(d);
			String mail = req.getParameter("mail");
			String pwd = req.getParameter("mdp");
			String ps = req.getParameter("pseudo");
			Connect con = new Connect();
			Connection c = con.makeConnection();
			int checkMail = u.checkMail(c,mail);
			if (checkMail > 0) {
				c.close();
				out.print("{ \"error\": \"Ce mail est déja associé à un autre compte\" }");	
			}
			else {
				Utilisateur nU = new Utilisateur(n,p,nD,mail,pwd,ps);
				u.insertUtilisateur(c,nU);
				c.close();
				out.print("{ \"success\": \"Insertion réussie\" }");	
			}
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