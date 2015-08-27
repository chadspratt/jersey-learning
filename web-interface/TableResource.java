package net.dogtato.leandna;

import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.json;

@Path("cell/{address}")
public class TableResource {
    public static HashMap<String, String> cellValues = new HashMap<String, String>();

    @GET
    @Produces("application/json")
    public String getCellValue(@PathParam("address") String cellAddress) {
        JSONObject cellValueJSON = Json.createObjectBuilder()
            .add("val", cellValues.get(cellAddress));
        return cellValueJSON;
    }

    @POST
    @Path("{newValue}")
    public String getCellValue(@PathParam("address") String cellAddress,
                                            @PathParam("newValue") String newValue) {
        cellValues.put(cellAddress, newValue);
    }
}