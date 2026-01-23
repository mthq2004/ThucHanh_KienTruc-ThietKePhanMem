package iuh.fit.maithanhhaiquan_22653671_tuan02.service;

import iuh.fit.maithanhhaiquan_22653671_tuan02.model.Product;
import iuh.fit.maithanhhaiquan_22653671_tuan02.repository.ProductRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Cacheable(value = "products", key = "#id")
    public Product findById(Long id) {
        long startTime = System.currentTimeMillis();
        System.out.println("[CACHE] Querying product ID: " + id + " from DB...");
        
        try {
            Thread.sleep(150); // giả lập DB chậm
        } catch (Exception e) {}

        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        long endTime = System.currentTimeMillis();
        System.out.println("[CACHE] Product ID: " + id + " loaded from DB - Time: " + (endTime - startTime) + "ms");
        
        return product;
    }
}
