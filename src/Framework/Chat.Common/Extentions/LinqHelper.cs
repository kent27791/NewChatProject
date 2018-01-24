using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace Chat.Common.Extentions
{
    public static class LinqHelper
    {
        public static IOrderedQueryable<T> DynamicOrderBy<T>(this IQueryable<T> source, string property, string type)
        {
            switch (type)
            {
                case "asc":
                    {
                        return OrderBy<T>(source, property);
                    }
                case "desc":
                    {
                        return OrderByDescending<T>(source, property);
                    }
                default:
                    {
                        return OrderBy<T>(source, property);
                    }
            }
        }
        public static IOrderedQueryable<T> DynamicThenBy<T>(this IQueryable<T> source, string property, string type)
        {
            switch (type)
            {
                case "asc":
                    {
                        return ThenBy<T>(source as IOrderedQueryable<T>, property);
                    }
                case "desc":
                    {
                        return ThenByDescending<T>(source as IOrderedQueryable<T>, property);
                    }
                default:
                    {
                        return ThenBy<T>(source as IOrderedQueryable<T>, property);
                    }
            }
        }

        public static IQueryable<T> Filter<T>(this IQueryable<T> source, string[] properties, string keyword)
        {
            Expression bodyPredicate = GetExpression<T>(properties, keyword);
            source = typeof(Queryable).GetMethods().First(
                   method => method.Name == "Where")
               .MakeGenericMethod(typeof(T))
               .Invoke(null, new object[] { source, bodyPredicate }) as IQueryable<T>;
            return source;
        }
        public static IQueryable<T> Filter<T>(this IQueryable<T> source, string property, string keyword)
        {
            Expression bodyPredicate = GetExpression<T>(property, keyword);
            source = typeof(Queryable).GetMethods().First(
                   method => method.Name == "Where")
               .MakeGenericMethod(typeof(T))
               .Invoke(null, new object[] { source, bodyPredicate }) as IQueryable<T>;
            return source;
        }
        #region Helper OrderBy
        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "OrderBy");
        }
        public static IOrderedQueryable<T> OrderByDescending<T>(this IQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "OrderByDescending");
        }
        public static IOrderedQueryable<T> ThenBy<T>(this IOrderedQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "ThenBy");
        }
        public static IOrderedQueryable<T> ThenByDescending<T>(this IOrderedQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "ThenByDescending");
        }
        static IOrderedQueryable<T> ApplyOrder<T>(IQueryable<T> source, string property, string methodName)
        {
            string[] props = property.Split('.');
            Type type = typeof(T);
            ParameterExpression arg = Expression.Parameter(type, "x");
            Expression expr = arg;
            foreach (string prop in props)
            {
                // use reflection (not ComponentModel) to mirror LINQ
                PropertyInfo pi = type.GetProperty(prop, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                expr = Expression.Property(expr, pi);
                type = pi.PropertyType;
            }
            Type delegateType = typeof(Func<,>).MakeGenericType(typeof(T), type);
            LambdaExpression lambda = Expression.Lambda(delegateType, expr, arg);

            object result = typeof(Queryable).GetMethods().Single(
                    method => method.Name == methodName
                            && method.IsGenericMethodDefinition
                            && method.GetGenericArguments().Length == 2
                            && method.GetParameters().Length == 2)
                    .MakeGenericMethod(typeof(T), type)
                    .Invoke(null, new object[] { source, lambda });
            return (IOrderedQueryable<T>)result;
        }
        #endregion

        #region Helper Filter
        static Expression<Func<T, bool>> GetExpression<T>(string[] propertiesName, string propertyValue)
        {
            Expression bodyPredicate = null;
            var parameterExp = Expression.Parameter(typeof(T), "x");

            foreach (var propertyName in propertiesName)
            {
                //Create left expression. ex: "x => x.Title" or relation "x => x.Category.Name"
                Type type = typeof(T);
                Expression exprProperty = parameterExp; //left expression
                string[] props = propertyName.Split('.');
                foreach (var prop in props)
                {
                    PropertyInfo pi = type.GetProperty(prop);
                    exprProperty = Expression.Property(exprProperty, pi);
                    type = pi.PropertyType;
                }
                //Create right expression is value. ex: "SomeValue"
                Expression exprValue = Expression.Constant(propertyValue, typeof(string)); //right expression

                //Create predicate expression. left.Contains(right)
                MethodInfo method = typeof(string).GetMethod("Contains", new[] { typeof(string) });
                var containsMethodExp = Expression.Call(exprProperty, method, exprValue);

                //Join OR multiple expression. ex: left1.Contains(right1) OR left2.Contains(right2) ...
                if (bodyPredicate == null)
                {
                    bodyPredicate = containsMethodExp;
                }
                else
                {
                    bodyPredicate = Expression.Or(bodyPredicate, containsMethodExp);
                }
            }
            return Expression.Lambda<Func<T, bool>>(bodyPredicate, parameterExp);
        }
        static Expression<Func<T, bool>> GetExpression<T>(string propertyName, string propertyValue)
        {
            var parameterExp = Expression.Parameter(typeof(T), "x");
            var propertyExp = Expression.Property(parameterExp, propertyName);
            MethodInfo method = typeof(string).GetMethod("Contains", new[] { typeof(string) });
            var someValue = Expression.Constant(propertyValue, typeof(string));
            var containsMethodExp = Expression.Call(propertyExp, method, someValue);
            return Expression.Lambda<Func<T, bool>>(containsMethodExp, parameterExp);
        }
        #endregion
    }
}
