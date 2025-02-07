namespace Catalog.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        // ³�������� ���� �� ��������
        public List<ProductEntity>? Products { get; set; }
    }
}
