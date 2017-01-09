using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinancingAPI.Models
{
    public class UtilityBillRange
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Min { get; set; }
        public int Max { get; set; }
        public string Units { get; set; }
        public int DisplayOrder { get; set; }
        public string UnitsPlacement { get; set; }
        public int DefaultValue { get; set; }
        public double IncrementBy { get; set; }
        public string IconPath { get; set; }
    }
}