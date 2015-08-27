package net.dogtato;

import org.glassfish.jersey.spi.ExtendedExceptionMapper;
import javax.ws.rs.ext.Provider;
import javax.ws.rs.core.Response;
import javax.ws.rs.WebApplicationException;

import java.util.Arrays;

@Provider
public class UncaughtExceptionMapper implements ExtendedExceptionMapper<Throwable> {

    @Override
    public boolean isMappable(Throwable throwable) {
        // ignore these guys and let jersey handle them
        return !(throwable instanceof WebApplicationException);
    }

    @Override
    public Response toResponse(Throwable throwable) {
        // return Response.serverError().entity(Arrays.toString(throwable.getStackTrace())).type("text/plain").build();
        return Response.serverError()
            .entity(throwable.getMessage() + "\n\n" +
                       Arrays.toString(throwable.getStackTrace()))
            .type("text/plain")
            .build();
        // return Response.serverError().entity(throwable.getMessage()).type("text/plain").build();
    }
}