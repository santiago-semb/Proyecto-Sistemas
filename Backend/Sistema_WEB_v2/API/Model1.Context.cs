﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace API
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class sistemas2_webEntities : DbContext
    {
        public sistemas2_webEntities()
            : base("name=sistemas2_webEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Barrios> Barrios { get; set; }
        public virtual DbSet<Categorias> Categorias { get; set; }
        public virtual DbSet<Categorias_Productos> Categorias_Productos { get; set; }
        public virtual DbSet<Categorias_Servicios> Categorias_Servicios { get; set; }
        public virtual DbSet<DCR01> DCR01 { get; set; }
        public virtual DbSet<DPF01> DPF01 { get; set; }
        public virtual DbSet<DPJ01> DPJ01 { get; set; }
        public virtual DbSet<DPR01> DPR01 { get; set; }
        public virtual DbSet<DSE01> DSE01 { get; set; }
        public virtual DbSet<Localidades> Localidades { get; set; }
        public virtual DbSet<Ofertas_Clientes> Ofertas_Clientes { get; set; }
        public virtual DbSet<Paises> Paises { get; set; }
        public virtual DbSet<Provincias> Provincias { get; set; }
        public virtual DbSet<Puntajes> Puntajes { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Tipos_Documentos> Tipos_Documentos { get; set; }
        public virtual DbSet<Tipos_Domicilios> Tipos_Domicilios { get; set; }
        public virtual DbSet<Tipos_Entidades> Tipos_Entidades { get; set; }
        public virtual DbSet<Tipos_Ofertas> Tipos_Ofertas { get; set; }
        public virtual DbSet<Credenciales> Credenciales { get; set; }
        public virtual DbSet<DCL01> DCL01 { get; set; }
        public virtual DbSet<DUS01> DUS01 { get; set; }
        public virtual DbSet<Ofertas> Ofertas { get; set; }
        public virtual DbSet<Personas> Personas { get; set; }
        public virtual DbSet<Guardar_Ofertas> Guardar_Ofertas { get; set; }
        public virtual DbSet<block_chat> block_chat { get; set; }
        public virtual DbSet<data_chat> data_chat { get; set; }
        public virtual DbSet<message_chat> message_chat { get; set; }
    }
}