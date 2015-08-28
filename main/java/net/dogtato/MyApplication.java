package net.dogtato;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.filter.LoggingFilter;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("/")
public class MyApplication extends ResourceConfig {

    public MyApplication() {
        packages(TableResource.class.getPackage().getName());

        register(LoggingFilter.class);
        register(CORSResponseFilter.class);
    }
}
