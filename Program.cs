using film_management_api.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
var films = new List<Film>
{
    new Film
    {
        MaPhim = 1,
        TenPhim = "Avengers: Endgame",
        MoTa = "Biệt đội Avengers đối đầu với Thanos.",
        ThoiLuong = 181,
        NamPhatHanh = 2019,
        NgayKhoiChieu = new DateTime(2019, 04, 26),
        NgonNgu = "English",
        QuocGia = "USA",
        MaTheLoai = 1,
        MaDaoDien = 1
    },
    new Film
    {
        MaPhim = 2,
        TenPhim = "Interstellar",
        MoTa = "Một nhóm phi hành gia khám phá không gian.",
        ThoiLuong = 169,
        NamPhatHanh = 2014,
        NgayKhoiChieu = new DateTime(2014, 11, 07),
        NgonNgu = "English",
        QuocGia = "USA",
        MaTheLoai = 2,
        MaDaoDien = 2
    }
};

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");
app.MapGet("/api/films", () =>
{
    return Results.Ok(films);
})
.WithName("GetAllFilms");
app.Run();


record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
