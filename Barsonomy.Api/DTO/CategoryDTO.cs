namespace Barsonomy.Api.DTO
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public int ExpenseCount { get; set; }
        public decimal TotalSum { get; set; }
    }
}
