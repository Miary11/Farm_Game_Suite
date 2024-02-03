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
import java.util.UUID;

public class ModifierTerrain extends HttpServlet {
	public void doPut(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		handleCORS(res);
		res.setContentType("application/json;charset=UTF-8");
        PrintWriter out = res.getWriter();

        String uploadPath = getServletContext().getRealPath("") + File.separator + "user_uploads";
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

		try{
			Connect con = new Connect();
			Connection c = con.makeConnection();
			String t = req.getParameter("terrain");
			String d = req.getParameter("description");
			Part filePart = req.getPart("photo");
            String filePath = uploadFile(filePart, uploadPath);

            Terrain t2 = new Terrain(t,d,filePath);

			Terrain nT = new Terrain();

			nT.updateTerrain(c,t2);
			c.close();
			out.print("{ \"success\": \"Validation réussie\" }");	
		}
		catch (Exception e) {
			e.printStackTrace();
			out.print("{ \"error\": \"Oups... Quelque chose s'est mal passé\" }");
		}
	}

	private void handleCORS(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "PUT, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Max-Age", "86400");
    }

    private String extractFileName(Part part) {
        String contentDisposition = part.getHeader("content-disposition");
        String[] items = contentDisposition.split(";");

        for (String item : items) {
            if (item.trim().startsWith("filename")) {
                return item.substring(item.indexOf("=") + 2, item.length() - 1);
            }
        }
        return "";
    }

    private String uploadFile(Part part, String uploadPath) throws IOException {
	    String fileName = extractFileName(part);
	   	String sanitizedFileName = fileName.replaceAll("\\s+", "_");
	    String fileExtension = sanitizedFileName.substring(sanitizedFileName.lastIndexOf("."));
	    String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

	    File uploadDirectory = new File(uploadPath);
	    if (!uploadDirectory.exists()) {
	        if (!uploadDirectory.mkdirs()) {
	            throw new IOException("Failed to create upload directory");
	        }
	    }

	    String filePath = uploadDirectory.getAbsolutePath() + File.separatorChar + uniqueFileName;

	    try (InputStream input = part.getInputStream();
	         OutputStream output = new FileOutputStream(filePath)) {

	        byte[] buffer = new byte[1024];
	        int length;

	        while ((length = input.read(buffer)) > 0) {
	            output.write(buffer, 0, length);
	        }
	    } catch (IOException e) {
	        throw new IOException("Failed to write the uploaded file", e);
	    }

	    return "user_uploads/" + uniqueFileName;
	}
}
