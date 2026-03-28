package iuh.fit.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/architecture")
@CrossOrigin(origins = "http://localhost:5173")
public class ArchitectureDemoController {

    @GetMapping("/monolith")
    public Map<String, Object> monolith() {
        return Map.of(
                "style", "monolith",
                "functions", List.of("ordering", "payment", "delivery"),
                "database", "single-shared-db",
                "description", "All modules are in one deployable backend application"
        );
    }

    @GetMapping("/service-based")
    public Map<String, Object> serviceBased() {
        return Map.of(
                "style", "service-based",
                "services", List.of("order-service", "payment-service", "delivery-service"),
                "communication", Map.of(
                        "sync", List.of("gateway->order", "frontend->gateway"),
                        "async", List.of("order.created", "payment.succeeded", "delivery.assigned")
                ),
                "database", "single-shared-db-phase-1"
        );
    }
}
