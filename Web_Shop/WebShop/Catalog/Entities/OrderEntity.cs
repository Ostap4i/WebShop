namespace Catalog.Entities
{
    public class OrderEntity
    {
        public int Id { get; set; }
        public string? CustomerName { get; set; }
        public string? Address { get; set; }

        // ³�������� ���� �� �������� (OrderItem)
        public ICollection<OrderItem>? OrderItems { get; set; }
    }
}
