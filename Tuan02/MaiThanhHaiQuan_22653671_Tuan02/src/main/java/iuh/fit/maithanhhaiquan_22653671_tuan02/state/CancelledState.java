package iuh.fit.maithanhhaiquan_22653671_tuan02.state;

public class CancelledState implements OrderState {
    @Override
    public void handle(OrderContext order) {
        System.out.println("Hủy: Hủy đơn hàng và hoàn tiền");
    }
}