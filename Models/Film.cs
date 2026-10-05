namespace film_management_api.Models;
public class Film
{
    public int MaPhim{get; set;}
    public string TenPhim {get; set;} = string.Empty;
     public string? MoTa { get; set; }

    public int ThoiLuong { get; set; }

    public int NamPhatHanh { get; set; }

    public DateTime NgayKhoiChieu { get; set; }

    public string NgonNgu { get; set; } = string.Empty;

    public string QuocGia { get; set; } = string.Empty;

    public int MaTheLoai { get; set; }

    public int MaDaoDien { get; set; }
}