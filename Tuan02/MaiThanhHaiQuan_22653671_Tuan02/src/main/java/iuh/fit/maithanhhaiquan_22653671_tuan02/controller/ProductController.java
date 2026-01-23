package iuh.fit.maithanhhaiquan_22653671_tuan02.controller;

import iuh.fit.maithanhhaiquan_22653671_tuan02.model.Product;
import iuh.fit.maithanhhaiquan_22653671_tuan02.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        long startTime = System.currentTimeMillis();
        System.out.println("[REQUEST] GET /products/" + id + " - Start");
        
        try {
            Product product = productService.findById(id);
            long endTime = System.currentTimeMillis();
            System.out.println("[RESPONSE] GET /products/" + id + " - Success - Time: " + (endTime - startTime) + "ms");
            return product;
        } catch (RuntimeException e) {
            long endTime = System.currentTimeMillis();
            System.out.println("[ERROR] GET /products/" + id + " - Failed - Time: " + (endTime - startTime) + "ms - Error: " + e.getMessage());
            throw new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.NOT_FOUND, 
                e.getMessage()
            );
        }
    }
}
