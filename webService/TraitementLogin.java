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

public class TraitementLogin extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		handleCORS(res);
		res.setContentType("application/json;charset=UTF-8");
        PrintWriter out = res.getWriter();

		try{
			String mail = req.getParameter("mail");
			String pwd = req.getParameter("motDePasse");
			Connect con = new Connect();
			Connection c = con.makeConnection();
			Utilisateur u = new Utilisateur();
			int checkMail = u.checkMail(c,mail);
			if (checkMail > 0) {
				int checkLog = u.checkLogin(c,mail,pwd);
				if (checkLog > 0) {
					Utilisateur nU = u.findSpecifiedUtilisateur(c,mail,pwd);
					JSONObject utilisateurJson = new JSONObject();
				    utilisateurJson.put("id", nU.getId());
				    utilisateurJson.put("nom", nU.getNom());
				    utilisateurJson.put("prenom", nU.getPrenom());
				    utilisateurJson.put("dateNaissance", nU.getNaissance());
				    utilisateurJson.put("mail", nU.getMail());
				    utilisateurJson.put("motDePasse", nU.getMotDePasse());
				    utilisateurJson.put("pseudo", nU.getPseudo());
				    JSONArray jsonArray = new JSONArray();
				    jsonArray.put(utilisateurJson);
				    c.close();
				    out.print(jsonArray.toString());
				}
				else{
					c.close();
					out.print("{ \"error\": \"Mot de Passe incorrect veuillez réessayer\" }");
				}
			}
			else {
				c.close();
				out.print("{ \"error\": \"Vous n'avez pas de compte. Inscrivez-vous\" }");
			}
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
