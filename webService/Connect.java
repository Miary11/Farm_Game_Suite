package tools;
import java.sql.*;

public class Connect {
    public Connection makeConnection() throws Exception
	{
		Class.forName("org.postgresql.Driver");
		Connection c = DriverManager.getConnection("jdbc:postgresql://localhost:5432/farmgame","farmgame","farmgame");
		return c;
	}
}
