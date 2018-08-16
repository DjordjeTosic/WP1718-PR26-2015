using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projekat.Models
{
    public class Komentar
    {
        public Komentar() { }
        public int Id { get; set; }
        public string Opis { get; set; }
        public string DatumObjave { get; set; }
        public string idKorisnik { get; set; }
        public string idVoznja { get; set; }

        public string Ocena { get; set; }

        public Komentar(int i, string o, string d, string idK, string idV, string ocen)
        {
            Id = i;
            Opis = o;
            DatumObjave = d;
            idKorisnik = idK;
            idVoznja = idV;
            Ocena = ocen;

        }
    }
}