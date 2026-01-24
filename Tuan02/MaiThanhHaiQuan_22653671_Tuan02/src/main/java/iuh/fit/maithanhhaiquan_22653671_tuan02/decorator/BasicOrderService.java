package iuh.fit.maithanhhaiquan_22653671_tuan02.decorator;

public class BasicOrderService implements OrderService {
    @Override
    public void process() {
        System.out.println("Xử lý đơn hàng cơ bản");
    }
}
