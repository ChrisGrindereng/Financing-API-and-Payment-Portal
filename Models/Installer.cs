using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace FinancingAPI.Models
{
    public class Installer
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public int CityId { get; set; }

        public string ZipCode { get; set; }

        public DateTime YearFounded { get; set; }

        public int NumberOfInstalls { get; set; }

        public double AvgInstallerRate { get; set; }
    }
}