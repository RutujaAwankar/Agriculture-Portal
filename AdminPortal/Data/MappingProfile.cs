using AdminPortal.Dto;
using AdminPortal.Models;
using AutoMapper;

namespace AdminPortal.Data
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterRequestDto, Admin>()
                .ForMember(dest => dest.Salt, opt => opt.Ignore());
        }
    }
}
