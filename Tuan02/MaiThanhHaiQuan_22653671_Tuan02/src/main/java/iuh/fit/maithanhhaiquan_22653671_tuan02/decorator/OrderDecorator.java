package iuh.fit.maithanhhaiquan_22653671_tuan02.decorator;

public abstract class OrderDecorator implements OrderService {
    protected OrderService orderService;

    public OrderDecorator(OrderService orderService) {
        this.orderService = orderService;
    }
}