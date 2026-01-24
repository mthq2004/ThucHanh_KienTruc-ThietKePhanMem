package iuh.fit.maithanhhaiquan_22653671_tuan02;


import iuh.fit.maithanhhaiquan_22653671_tuan02.decorator.BasicOrderService;
import iuh.fit.maithanhhaiquan_22653671_tuan02.decorator.ExpressDecorator;
import iuh.fit.maithanhhaiquan_22653671_tuan02.decorator.InsuranceDecorator;
import iuh.fit.maithanhhaiquan_22653671_tuan02.decorator.OrderService;
import iuh.fit.maithanhhaiquan_22653671_tuan02.state.OrderContext;
import iuh.fit.maithanhhaiquan_22653671_tuan02.strategy.ExpressShipping;
import iuh.fit.maithanhhaiquan_22653671_tuan02.strategy.ShippingStrategy;

public class Main {
    public static void main(String[] args) {

        System.out.println("=== STATE PATTERN ===");
        OrderContext order = new OrderContext();
        order.process(); // New -> Processing
        order.process(); // Processing -> Delivered
        order.process(); // Delivered

        System.out.println("\n=== STRATEGY PATTERN ===");
        ShippingStrategy shipping = new ExpressShipping();
        shipping.ship();

        System.out.println("\n=== DECORATOR PATTERN ===");
        OrderService service =
                new ExpressDecorator(
                        new InsuranceDecorator(
                                new BasicOrderService()
                        )
                );

        service.process();
    }
}

