using Radyo.Dunyasi.WebApi.Models;

namespace Radyo.Dunyasi.WebApi.BusinessLayer
{
    public abstract class BaseBusinessLayer
    {
        protected Response<T> CreateResponse<T>(T value)
        {
            return new Response<T>
            {
                IsSuccess = (value != null),
                Value = value
            };
        }
    }
}