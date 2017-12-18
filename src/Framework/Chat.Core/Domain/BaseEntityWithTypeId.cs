using System;
using System.Collections.Generic;
using System.Text;

namespace Chat.Core.Domain
{
    public abstract class BaseEntityWithTypeId<TKey> : IBaseEntityWithTypeId<TKey>
    {
        public TKey Id { get; set; }
    }
}
