using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinancingAPI.Models
{
    public class Project
    {
        public int Id { get; set; }
        public int UserId { get; set;}
        public int InstallerId { get; set; }
        public string Name { get; set; }

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public int CityId { get; set; }

        public string ZipCode { get; set; }

        public int ElectricityProviderId { get; set; }

        public double SystemSize { get; set; }

        public decimal UtilityRate { get; set; }

        public int AvgMonthlyBill { get; set; }

        public string AMINumber { get; set; }

        public DateTime InterconnectDate { get; set; }


    }
}