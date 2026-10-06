/*FOODSYNC - simple localStorage data layer for a frontend demo. */
const DB = {
  KEYS:{USERS:"ep_users",MENU:"ep_menu",ORDERS:"ep_orders",SESSION:"ep_session"},
  read(key,fallback){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch(e){return fallback}},
  write(key,value){localStorage.setItem(key,JSON.stringify(value))},
  seed(){
    const users=DB.getUsers();
    const baseUsers=[
      {name:"Asha Rao",email:"customer@demo.com",password:"demo123",role:"customer"},
      {name:"Spice Route Manager",email:"manager@demo.com",password:"demo123",role:"manager",restaurant:"Spice Route"},
      {name:"Green Bowl Manager",email:"green@demo.com",password:"demo123",role:"manager",restaurant:"Green Bowl Cafe"},
      {name:"Urban Wok Manager",email:"urban@demo.com",password:"demo123",role:"manager",restaurant:"Urban Wok"},
      {name:"Dosa House Manager",email:"dosa@demo.com",password:"demo123",role:"manager",restaurant:"Dosa House"},
      {name:"Tandoori Tales Manager",email:"tandoori@demo.com",password:"demo123",role:"manager",restaurant:"Tandoori Tales"},
      {name:"Sweet Cravings Manager",email:"sweet@demo.com",password:"demo123",role:"manager",restaurant:"Sweet Cravings"},
      {name:"Ravi Delivers",email:"delivery@demo.com",password:"demo123",role:"delivery"},
      {name:"Neha Delivers",email:"neha@demo.com",password:"demo123",role:"delivery"},
      {name:"Arjun Delivers",email:"arjun@demo.com",password:"demo123",role:"delivery"}
    ];
    baseUsers.forEach(u=>{if(!users.some(x=>x.email.toLowerCase()===u.email.toLowerCase()&&x.role===u.role))users.push(u)}); DB.saveUsers(users);
    if(!localStorage.getItem(DB.KEYS.MENU)||localStorage.getItem("ep_menu_version")!=="4"){
      DB.write(DB.KEYS.MENU,[
        ["m1","Spice Route","Paneer Butter Masala",220,"veg","Main","https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80",4.5],
        ["m2","Spice Route","Chicken Biryani",260,"nonveg","Main","https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80",4.5],
        ["m3","Spice Route","Garlic Naan",45,"veg","Bread","https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80",4.5],
        ["m4","Green Bowl Cafe","Buddha Bowl",190,"veg","Bowl","https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1200&q=80",4.3],
        ["m5","Green Bowl Cafe","Peri Peri Fries",120,"veg","Sides","https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1200&q=80",4.3],
        ["m6","Green Bowl Cafe","Cold Brew",90,"veg","Drinks","https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1200&q=80",4.3],
        ["m7","Urban Wok","Kung Pao Chicken",240,"nonveg","Main","https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",4.4],
        ["m8","Urban Wok","Veg Hakka Noodles",170,"veg","Main","https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",4.4],
        ["m9","Urban Wok","Spring Rolls",130,"veg","Starter","https://images.unsplash.com/photo-1548507200-0f6f3b5c7a58?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",4.4],
        ["m10","Dosa House","Masala Dosa",110,"veg","South Indian","https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",4.6],
        ["m11","Dosa House","Idli Sambar",80,"veg","South Indian","https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",4.6],
        ["m12","Dosa House","Medu Vada",90,"veg","Starter","https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",4.6],
        ["m13","Tandoori Tales","Tandoori Chicken",290,"nonveg","Tandoor","https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",4.7],
        ["m14","Tandoori Tales","Paneer Tikka",230,"veg","Tandoor","https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",4.7],
        ["m15","Tandoori Tales","Rumali Roti",35,"veg","Bread","https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",4.7],
        ["m16","Sweet Cravings","Chocolate Brownie",140,"veg","Dessert","https://images.unsplash.com/photo-1606313564200-e75d5e30476a?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",4.2],
        ["m17","Sweet Cravings","Gulab Jamun",100,"veg","Dessert","https://images.unsplash.com/photo-1666190094762-4f4b0c8b0f6d?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",4.2],
        ["m18","Sweet Cravings","Mango Cheesecake",180,"veg","Dessert","https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",4.2]
      ].map(a=>({id:a[0],restaurant:a[1],name:a[2],price:a[3],type:a[4],category:a[5],image:a[6],bannerImage:a[7],rating:a[8],available:true})));
      localStorage.setItem("ep_menu_version","4");
    }
    if(!localStorage.getItem(DB.KEYS.ORDERS))DB.write(DB.KEYS.ORDERS,[]);
  },
  getUsers(){return DB.read(DB.KEYS.USERS,[])},saveUsers(v){DB.write(DB.KEYS.USERS,v)},
  findUser(email,role){return DB.getUsers().find(u=>u.email.toLowerCase()===email.toLowerCase()&&u.role===role)},
  addUser(u){const a=DB.getUsers();a.push(u);DB.saveUsers(a)},
  setSession(u){DB.write(DB.KEYS.SESSION,{name:u.name,email:u.email,role:u.role,restaurant:u.restaurant||null})},getSession(){return DB.read(DB.KEYS.SESSION,null)},clearSession(){localStorage.removeItem(DB.KEYS.SESSION)},
  getMenu(){return DB.read(DB.KEYS.MENU,[])},saveMenu(v){DB.write(DB.KEYS.MENU,v)},
  getRestaurants(){return [...new Set(DB.getMenu().map(i=>i.restaurant))]},
  getOrders(){return DB.read(DB.KEYS.ORDERS,[])},saveOrders(v){DB.write(DB.KEYS.ORDERS,v)},
  addOrder(o){const a=DB.getOrders();a.unshift(o);DB.saveOrders(a)},
  updateOrder(id,changes){const a=DB.getOrders(),i=a.findIndex(o=>o.id===id);if(i!==-1){a[i]={...a[i],...changes};DB.saveOrders(a)}}
};
DB.seed();
function requireRole(role){const s=DB.getSession();if(!s||s.role!==role){window.location.href="index.html"}return s}
function logout(){DB.clearSession();window.location.href="index.html"}
function escapeHtml(str){const d=document.createElement("div");d.textContent=str==null?"":str;return d.innerHTML}
function escapeAttr(str){return String(str||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
