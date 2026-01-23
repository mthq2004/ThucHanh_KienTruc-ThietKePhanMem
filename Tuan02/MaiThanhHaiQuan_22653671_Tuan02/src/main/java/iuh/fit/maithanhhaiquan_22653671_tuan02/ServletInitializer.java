package iuh.fit.maithanhhaiquan_22653671_tuan02;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

public class ServletInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(MaiThanhHaiQuan22653671Tuan02Application.class);
    }

}
