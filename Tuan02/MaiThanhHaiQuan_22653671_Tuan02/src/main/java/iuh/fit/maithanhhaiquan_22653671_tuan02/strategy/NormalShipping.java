package iuh.fit.maithanhhaiquan_22653671_tuan02.strategy;

public class NormalShipping implements ShippingStrategy {
    @Override
    public void ship() {
        System.out.println("Chiến lược vận chuyển: Giao hàng tiêu chuẩn");
    }
}