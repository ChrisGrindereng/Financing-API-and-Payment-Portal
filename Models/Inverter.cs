using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinancingAPI.Models
{
    public class Inverter
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal CostPerWatt { get; set; }
    }
}