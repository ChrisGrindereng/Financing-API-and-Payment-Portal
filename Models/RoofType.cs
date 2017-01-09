using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace FinancingAPI.Models
{
    public class RoofType
    {
        public int Id { get; set; }
        
        [Required, MaxLength(30)]
        public string Name { get; set; }

        [Required]
        public decimal RackingCostPerWatt { get; set; }

        [Required]
        public bool IsHidden { get; set; }

        public string ImagePath { get; set; }
    }
}