using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinancingAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        public int UserTypeId { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public bool IsStranded { get; set; }

        public int HeardAboutUsId { get; set; }



    }
}