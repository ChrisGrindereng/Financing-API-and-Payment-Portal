using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace FinancingAPI.Models
{
    public class DB : DbContext
    {
        public DB() : base()
        {
            
        }




        public DbSet<RoofType> RoofTypes { get; set; }
        public DbSet<ServiceSize> ServiceSizes { get; set; }
        public DbSet<RoofAge> RoofAges { get; set; }
        public DbSet<RafterTrussSize> RafterTrussSizes { get; set; }
        public DbSet<WarrantyType> WarrantyTypes { get; set; }
        public DbSet<RafterSpacing> RafterSpacings { get; set; }
        public DbSet<PaymentMethodType> PaymentMethodTypes { get; set; }
        public DbSet<UtilityBillRange> UtilityBillRanges { get; set; }
        public DbSet<Installer> Installers { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<State> States { get; set; }

        public System.Data.Entity.DbSet<FinancingAPI.Models.User> Users { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<HomeSquareFootage> HomeSquareFootages { get; set; }

        public DbSet<Module> Modules { get; set; }

        public DbSet<Inverter> Inverters { get; set; }

        public DbSet<Cost> Costs { get; set; }

        public DbSet<Incentive> Incentives { get; set; }
    }
}