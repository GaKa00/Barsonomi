namespace Barsonomy.Api.DTO
{
    public class DashboardSummaryDto
    {
       
        public decimal MonthlyIncomeSek { get; set; } // Monthly income in SEK, connected to the user
        public decimal BeerPriceSek { get; set; } // Price of a beer in SEK
        public decimal TotalFixedCostsSek { get; set; }      
        public decimal TotalSubscriptionsSek { get; set; }   
        public decimal TotalExpensesSek => TotalFixedCostsSek + TotalSubscriptionsSek; 
        public decimal RemainingIncomeSek => MonthlyIncomeSek - TotalExpensesSek;
    
    }


}
