using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ResourcingApi.Migrations
{
    /// <inheritdoc />
    public partial class CreateJobTempTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobTemps",
                columns: table => new
                {
                    JobId = table.Column<long>(type: "bigint", nullable: false),
                    TempId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobTemps", x => new { x.JobId, x.TempId });
                    table.ForeignKey(
                        name: "FK_JobTemps_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobTemps_Temps_TempId",
                        column: x => x.TempId,
                        principalTable: "Temps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_JobTemps_TempId",
                table: "JobTemps",
                column: "TempId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobTemps");
        }
    }
}
