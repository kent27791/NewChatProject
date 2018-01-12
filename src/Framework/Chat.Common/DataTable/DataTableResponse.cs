using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Chat.Common.DataTable
{
    public class DataTableResponse<T>
    {
        public DataTableResponse() { }

        public DataTableResponse(int draw, int recordsTotal, int recordsFiltered)
        {
            this.Draw = draw;
            this.RecordsTotal = recordsTotal;
            this.RecordsFiltered = recordsFiltered;
        }
        public DataTableResponse(int draw, int recordsTotal, int recordsFiltered, IEnumerable<T> data)
            : this(draw, recordsTotal, recordsFiltered)
        {
            this.Data = data;
        }

        [JsonProperty("draw")]
        public int Draw { get; set; }

        [JsonProperty("recordsTotal")]
        public int RecordsTotal { get; set; }

        [JsonProperty("recordsFiltered")]
        public int RecordsFiltered { get; set; }

        [JsonProperty("data")]
        public IEnumerable<T> Data { get; set; }
    }
}
