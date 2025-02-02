namespace AdminPortal.Dto
{
    public class VerifyOtpRequest
    {
        public string Jwt { get; set; }
        public string Otp { get; set; }
    }
}
