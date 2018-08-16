using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projekat.Models
{
    public class Lokacija
    {
        public double X { get; set; }
        public double Y { get; set; }
        public Adresa Adresa { get; set; }

        public Lokacija() { }
    }
}