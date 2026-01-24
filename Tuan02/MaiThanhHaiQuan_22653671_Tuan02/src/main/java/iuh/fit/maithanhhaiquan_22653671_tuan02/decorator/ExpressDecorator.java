package iuh.fit.maithanhhaiquan_22653671_tuan02.decorator;


public class ExpressDecorator extends OrderDecorator {

    public ExpressDecorator(OrderService orderService) {
        super(orderService);
    }

    @Override
    public void process() {
        orderService.process();
        System.out.println("Decorator: Thêm dịch vụ giao hàng nhanh");
    }
}