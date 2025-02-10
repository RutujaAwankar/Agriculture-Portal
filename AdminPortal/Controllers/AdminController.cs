using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AdminPortal.Data;
using AdminPortal.Dto;
using AdminPortal.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace AdminPortal.Controllers
{
    [Route("admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        private readonly ApplicationContext _context;
        private readonly IConfiguration _configuration;

        public AdminController(ApplicationContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        
        
        private string GenerateJwtToken(Admin admin)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var secretKey = jwtSettings["Key"];
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var now = DateTime.UtcNow;

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, admin.Email),
            new Claim("user_id", admin.Id.ToString()),
            new Claim("authorities", admin.Role),
            new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeMilliseconds().ToString(), ClaimValueTypes.Integer64)
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(86450000),
                signingCredentials: credentials

            //issuer: jwtSettings["Issuer"], 
            //audience: jwtSettings["Audience"] 
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

       
    }
}