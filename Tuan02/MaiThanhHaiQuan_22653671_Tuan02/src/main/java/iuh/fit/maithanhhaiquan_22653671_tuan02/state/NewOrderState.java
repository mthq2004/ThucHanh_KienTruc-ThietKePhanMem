package iuh.fit.maithanhhaiquan_22653671_tuan02.state;

public class NewOrderState implements OrderState {
    @Override
    public void handle(OrderContext order) {
        System.out.println("Mới tạo: Kiểm tra thông tin đơn hàng");
        order.setState(new ProcessingState());
    }
}
