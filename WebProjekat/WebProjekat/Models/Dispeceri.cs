using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace Projekat.Models
{
    public class Dispeceri
    {
        public List<Dispecer> list { get; set; }

        public Dispeceri(string path)
        {

            path = HostingEnvironment.MapPath(path);
            list = new List<Dispecer>();
            FileStream stream = new FileStream(path, FileMode.Open);
            StreamReader sr = new StreamReader(stream);
            string line = "";
            while ((line = sr.ReadLine()) != null)
            {
                if (line == "" || line == null)
                {
                    break;
                }
                string[] tokens = line.Split(':');
                Dispecer p = new Dispecer(Int32.Parse(tokens[0]), tokens[1], tokens[2], tokens[3], tokens[4], tokens[5], tokens[6], tokens[7], tokens[8],tokens[9]);
                //p.Id = list.Count.ToString();
                list.Add(p);
            }
            sr.Close();
            stream.Close();
        }
    }
}