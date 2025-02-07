using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Identity;
using Catalog.Data; // ������ ������ ���� ��� DbInitializer
using Catalog.Services; // ������ ���� ��� ������
using Catalog.Repositories; // ������ ���� ��� ����������
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Catalog.Entities; // ������ ������ ���� ��� JWT

var builder = WebApplication.CreateBuilder(args);

// ��������� Swagger �� DI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "WebShop API",
        Version = "v1"
    });
});

builder.Services.AddControllers();

// ������������ DI ��� ApplicationDbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// ������ IPasswordHasher ��� ��������� ������
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>(); // ��������� ��� ��������� ������

// ϳ�������� ������
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IBrandService, BrandService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IOrderItemService, OrderItemService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IAuthService, AuthService>(); // ������ AuthService

// ϳ�������� ���������
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IBrandRepository, BrandRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// ������������ �������������� � JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

var app = builder.Build();

// ����������� ������������ ������� �� ����������� ���� �����
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    // ����������� �� �������
    dbContext.Database.Migrate();

    // ����������� ���� �����
    DbInitializer.Initialize(dbContext); // ������ ������ �����������
}

// ������������ ���������� �� �������������
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger(); // ������ Swagger Middleware
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
        options.RoutePrefix = string.Empty; // ������ �� ���������� �����
    });
}


app.UseRouting();

// ����������� �������������� �� �����������
app.UseAuthentication();
app.UseAuthorization();

// ������������� API
app.MapControllers();

app.Run();
