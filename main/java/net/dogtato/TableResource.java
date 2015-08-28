package net.dogtato;

import java.util.HashMap;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import javax.json.*;

@Path("cell/{address}")
public class TableResource {
    public static HashMap<String, String> cellValues = new HashMap<String, String>();
    static {
        cellValues.put("A1","");
        cellValues.put("A2","");
        cellValues.put("B1","");
        cellValues.put("B2","");
    }

    @GET
    @Produces("application/json")
    public String getCellValue(@PathParam("address") String cellAddress) {
        JsonObject cellValueJSON = Json.createObjectBuilder()
            .add("val", cellValues.get(cellAddress))
            .build();
        return cellValueJSON.toString();
    }

    @POST
    @Path("{newValue}")
    public void setCellValue(@PathParam("address") String cellAddress,
                             @PathParam("newValue") String newValue) {
        cellValues.put(cellAddress, newValue);
    }
}
