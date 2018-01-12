using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Chat.Common.DataTable
{
    public class DataTableRequest
    {
        [JsonProperty("draw")]
        public int Draw { get; set; }

        [JsonProperty("length")]
        public int Length { get; set; }

        [JsonProperty("start")]
        public int Start { get; set; }

        [JsonProperty("columns")]
        public IEnumerable<DataTableColumn> Columns { get; set; }

        [JsonProperty("order")]
        public IEnumerable<DataTableOrder> Order { get; set; }

        [JsonProperty("search")]
        public DataTableSearch Search { get; set; }

        public string[] SearchColumns { get; set; }
    }

    public class DataTableColumn
    {
        [JsonProperty("data")]
        public string Data { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("orderable")]
        public bool Orderable { get; set; }

        [JsonProperty("search")]
        public DataTableSearch Search { get; set; }

        [JsonProperty("searchable")]
        public bool Searchable { get; set; }
    }

    public class DataTableOrder
    {
        [JsonProperty("column")]
        public int Column { get; set; }

        [JsonProperty("dir")]
        public string Dir { get; set; }
    }

    public class DataTableSearch
    {
        [JsonProperty("regex")]
        public bool Regex { get; set; }

        [JsonProperty("value")]
        public string Value { get; set; }
    }
}
