using Basket.Services;
using Basket.Services.Interfaces;
using Microsoft.Extensions.Caching.StackExchangeRedis;
using StackExchange.Redis;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// ������� ������������ Redis � appsettings.json
var redisConnectionString = builder.Configuration.GetValue<string>("Redis:ConnectionString");

// ϳ��������� �� Redis
builder.Services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConnectionString));

// �������� ������
builder.Services.AddSingleton<ICacheService, CacheService>();
builder.Services.AddSingleton<IBasketService, BasketService>();

// ������ Swagger
builder.Services.AddEndpointsApiExplorer();  // ������ �������� Swagger ��� API
builder.Services.AddSwaggerGen();  // ������ ��������� Swagger ������������

builder.Services.AddControllers();

var app = builder.Build();

// ����������� ������������ Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();  // ������ Swagger UI
    app.UseSwaggerUI();  // ����������� ����������� Swagger UI
}

app.UseRouting();
app.MapControllers();

app.Run();
