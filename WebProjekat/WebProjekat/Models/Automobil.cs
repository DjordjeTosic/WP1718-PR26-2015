using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static Projekat.Models.Enums;

namespace Projekat.Models
{
    public class Automobil
    {
        public Automobil() { }
        public string Broj { get; set; } //ID
        public Vozac Vozac { get; set; }
        public int Godiste { get; set; }
        public string Registracija { get; set; }
        public TipAuta Tip { get; set; }
    }
}