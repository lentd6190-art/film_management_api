using film_management_api.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
options.AddPolicy("FrontendPolicy", policy =>
{
policy.WithOrigins("http://localhost:5173")
.AllowAnyHeader()
.AllowAnyMethod();
});
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("FrontendPolicy");

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
    "Freezing", "Bracing", "Chilly", "Cool", "Mild",
    "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
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

// FM-5: Get all films
app.MapGet("/api/films", () =>
{
    return Results.Ok(films);
})
.WithName("GetAllFilms");

// FM-6: Get film by ID
app.MapGet("/api/films/{id}", (int id) =>
{
    var film = films.FirstOrDefault(f => f.MaPhim == id);

    if (film == null)
    {
        return Results.NotFound();
    }

    return Results.Ok(film);
})
.WithName("GetFilmById");

// FM-7: Create film
app.MapPost("/api/films", (Film film) =>
{
    if (film == null)
    {
        return Results.BadRequest("Film data is required.");
    }

    film.MaPhim = films.Count > 0
        ? films.Max(f => f.MaPhim) + 1
        : 1;

    films.Add(film);

    return Results.Created($"/api/films/{film.MaPhim}", film);
})
.WithName("CreateFilm");

// FM-8: Update film
app.MapPut("/api/films/{id}", (int id, Film updatedFilm) =>
{
    var film = films.FirstOrDefault(f => f.MaPhim == id);

    if (film == null)
    {
        return Results.NotFound();
    }

    film.TenPhim = updatedFilm.TenPhim;
    film.MoTa = updatedFilm.MoTa;
    film.ThoiLuong = updatedFilm.ThoiLuong;
    film.NamPhatHanh = updatedFilm.NamPhatHanh;
    film.NgayKhoiChieu = updatedFilm.NgayKhoiChieu;
    film.NgonNgu = updatedFilm.NgonNgu;
    film.QuocGia = updatedFilm.QuocGia;
    film.MaTheLoai = updatedFilm.MaTheLoai;
    film.MaDaoDien = updatedFilm.MaDaoDien;

    return Results.Ok(film);
})
.WithName("UpdateFilm");

// FM-9: Delete film
app.MapDelete("/api/films/{id}", (int id) =>
{
    var film = films.FirstOrDefault(f => f.MaPhim == id);

    if (film == null)
    {
        return Results.NotFound();
    }

    films.Remove(film);

    return Results.NoContent();
})
.WithName("DeleteFilm");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}