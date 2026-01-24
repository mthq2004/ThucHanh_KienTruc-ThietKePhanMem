package iuh.fit.maithanhhaiquan_22653671_tuan02.decorator;

public class InsuranceDecorator extends OrderDecorator {

    public InsuranceDecorator(OrderService orderService) {
        super(orderService);
    }

    @Override
    public void process() {
        orderService.process();
        System.out.println("Decorator: Thêm bảo hiểm đơn hàng");
    }
}