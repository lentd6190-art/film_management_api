using Microsoft.OpenApi;

namespace film_management_api.Extensions;

public static class SwaggerExtensions
{
    public static IServiceCollection AddSwaggerDocs(
        this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Film Management API",
                Version = "v1",
                Description = "API for managing films"
            });
        });

        return services;
    }
}