package iuh.fit.maithanhhaiquan_22653671_tuan02.state;

public class ProcessingState implements OrderState {
    @Override
    public void handle(OrderContext order) {
        System.out.println("Đang xử lý: Đóng gói và vận chuyển");
        order.setState(new DeliveredState());
    }
}