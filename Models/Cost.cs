﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinancingAPI.Models
{
    public class Cost
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal AmountPerWatt { get; set; }
    }
}