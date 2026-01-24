package iuh.fit.maithanhhaiquan_22653671_tuan02.state;


public class DeliveredState implements OrderState {
    @Override
    public void handle(OrderContext order) {
        System.out.println("Đã giao: Cập nhật trạng thái đơn hàng");
    }
}