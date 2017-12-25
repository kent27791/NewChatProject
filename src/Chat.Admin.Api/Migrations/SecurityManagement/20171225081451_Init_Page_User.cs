using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Chat.Admin.Api.Migrations.SecurityManagement
{
    public partial class Init_Page_User : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Core_UserPermission",
                columns: table => new
                {
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    PageId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Core_UserPermission", x => new { x.UserId, x.PageId });
                    table.ForeignKey(
                        name: "FK_Core_UserPermission_Core_Page_PageId",
                        column: x => x.PageId,
                        principalTable: "Core_Page",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Core_UserPermission_Core_User_UserId",
                        column: x => x.UserId,
                        principalTable: "Core_User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Core_UserPermission_PageId",
                table: "Core_UserPermission",
                column: "PageId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Core_UserPermission");
        }
    }
}
