using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Concurrent;

//
//{
//    public interface IRepository<T>
//    {
//        void Create(T item);
//        IEnumerable<T> Read();
//        T Read(int id);
//        void Update(T item);
//        T Delete(int id);
//    }


//public class PostRepo : IRepository<Post> {
//    private static ConcurrentDictionary<int, Post> ls = new ConcurrentDictionary<int, Post>();
    
//    public void Create(Post item){
//         item.PostId = Guid.NewGuid(); // to uncommment, will have to change PostId to Guid in the Models
//        ls[item.PostId] = item;
//    }
    
//    public IEnumerable<Post> Read(){
//        return ls.Values;
//    }
    
//    public Post Read(int id){
//        return ls[id];
//    }
    
//    public void Update(Post item){
//        ls[item.PostId] = item;
//    }
    
//    public Post Delete(int id){
//        Post item;
//        ls.TryRemove(id, out item);
//        return item;
//    }
//}
//}
//