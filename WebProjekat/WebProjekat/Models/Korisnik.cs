using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static Projekat.Models.Enums;

namespace Projekat.Models
{
    public class Korisnik
    {
        public int Id { get; set; }
        public string KorisnickoIme { get; set; } // ID
        public string Lozinka { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public Pol Pol { get; set; }
        public string JMBG { get; set; }
        public string KontaktTelefon { get; set; }
        public string Email { get; set; }
        public Uloga Uloga { get; set; }
        public Banovan Ban { get; set; }
        public Korisnik() { }
        public List<Voznja> voznjeKorisnika { get; set; }

        public Korisnik(int id,  string korisnickoIme, string lozinka, string ime, string prezime, string pol, string jmbg, string kontakt,  string email, string b) : this()
        {
            if (b.Equals("DA")) { Ban = Banovan.DA; } else if (b.Equals("NE")) { Ban = Banovan.NE; } else { Ban = Banovan.IGNORE; }
            Id = id;
            Ime = ime;
            Prezime = prezime;
            KorisnickoIme = korisnickoIme;
            Lozinka = lozinka;
            JMBG = jmbg;
            KontaktTelefon = kontakt;
            if (pol.Equals("Muski")) { Pol = Pol.Muski; } else { Pol = Pol.Zenski; }
            Email = email;
            voznjeKorisnika = new List<Voznja>();
        }
    }
}