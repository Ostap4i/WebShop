using System.ComponentModel.DataAnnotations.Schema;

namespace Catalog.Entities
{
    public class OrderItem
    {
        public int Id { get; set; }

        // ����'������� ������� ���� �� ������� OrderEntity
        public int OrderId { get; set; }

        [ForeignKey("OrderId")]  // ������� ������� ����
        public OrderEntity? Order { get; set; }  // ��'���� � ������� OrderEntity

        // ����'������� ������� ���� �� ������� ProductEntity
        public int ProductId { get; set; }

        [ForeignKey("ProductId")]  // ������� ������� ����
        public ProductEntity? Product { get; set; }  // ��'���� � ������� ProductEntity

        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
