package servlet;
import java.io.*;
import java.util.List;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Part;
import tools.Connect;
import information.Culture;
import java.sql.Connection;
import java.util.UUID;

@MultipartConfig
public class TraitementInsertCulture extends HttpServlet {
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        handleCORS(res);

        res.setContentType("application/json;charset=UTF-8");

        PrintWriter out = res.getWriter();

        String uploadPath = getServletContext().getRealPath("") + File.separator + "user_uploads";
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        try {
            Connect con = new Connect();
            Connection c = con.makeConnection();
            String pr = req.getParameter("user");
            String n = req.getParameter("nom");
            String t = req.getParameter("type");
            double pA = Double.parseDouble(req.getParameter("prixAchat"));
            double pV = Double.parseDouble(req.getParameter("prixVente"));
            String s = req.getParameter("saison");

            Part filePart = req.getPart("photo");
            String filePath = uploadFile(filePart, uploadPath);

            Culture cul = new Culture();
            Culture nCul = new Culture(n, t, pA, pV, s, filePath);

            cul.insertCulture(c, nCul);

            String idCul = cul.getIdLastRecord(c);

            Culture nCul2 = new Culture(idCul, pr);

            cul.insertCultureUtilisateur(c, nCul2);

            c.close();
            out.print("{ \"success\": \"Insertion réussie\" }");
        } 

        catch (Exception e) {
            e.printStackTrace();
            out.print("{ \"error\": \"" + e.getMessage() + "\" }");
        }
    }

    private void handleCORS(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
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