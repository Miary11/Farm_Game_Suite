import tools.Connect;
import information.Utilisateur;
import java.sql.Connection;
import java.sql.Date;
public class Affichage {
	public static void main(String[] args) {
		try{
			Connect con = new Connect();
			Connection c = con.makeConnection();
			Utilisateur u = new Utilisateur();
			String n = "test";
			String p = "test";
			String d = "2024-01-26";
			Date nD = u.getSqlDate(d);
			String m = "test@gmail.com";
			String pwd = "test";
			String ps = "test";
			Utilisateur nU = new Utilisateur(n,p,nD,m,pwd,ps);
			u.insertUtilisateur(c,nU);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
}