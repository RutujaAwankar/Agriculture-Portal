using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace AdminPortal.Models
{
    public class Admin
    {
        public long Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Email { get; set; }
        public String Password { get; set; }

        [JsonIgnore]
        [BindNever]
        public String Salt { get; set; }
        public String Role { get; set; } = "ROLE_ADMIN";
        public String Mobile { get; set; }

    }
}
