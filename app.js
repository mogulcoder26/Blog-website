const express=require('express');
const app=express();
const ejs=require('ejs')
const port=5000;
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.set("views",__dirname+'/views')
app.set("view engine","ejs")
app.use(express.static(__dirname+'/public'))

const homeText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi fuga rem, nesciunt molestias perspiciatis cupiditate hic. Facilis non pariatur perspiciatis saepe quos quo id cum repellendus qui amet, quasi, velit hic. Explicabo aspernatur, hic ipsa soluta ab neque assumenda provident, architecto inventore debitis consequatur molestias error, labore quidem tenetur unde. Deleniti delectus, culpa odio reprehenderit suscipit dolorem magnam? Deserunt iusto dolore facere molestias quod veniam, eaque quidem quia sapiente placeat minima voluptatem, fugiat unde non repudiandae corrupti!"
const day1Text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi fuga rem, nesciunt molestias perspiciatis cupiditate hic. Facilis non pariatur perspiciatis saepe quos quo id cum repellendus qui amet, quasi, velit hic. Explicabo aspernatur, hic ipsa soluta ab neque assumenda provident, architecto inventore debitis consequatur molestias error, labore quidem tenetur unde. Deleniti delectus, culpa odio reprehenderit suscipit dolorem magnam? Deserunt iusto dolore facere molestias quod veniam, eaque quidem quia sapiente placeat minima voluptatem, fugiat unde non repudiandae corrupti!"
const day2Text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi fuga rem, nesciunt molestias perspiciatis cupiditate hic. Facilis non pariatur perspiciatis saepe quos quo id cum repellendus qui amet, quasi, velit hic. Explicabo aspernatur, hic ipsa soluta ab neque assumenda provident, architecto inventore debitis consequatur molestias error, labore quidem tenetur unde. Deleniti delectus, culpa odio reprehenderit suscipit dolorem magnam? Deserunt iusto dolore facere molestias quod veniam, eaque quidem quia sapiente placeat minima voluptatem, fugiat unde non repudiandae corrupti!"

let ALLPOSTS =[]
app.get('/',(req,res)=>{
    console.log(ALLPOSTS)
    res.render('home.ejs',{htext:homeText,d1text:day1Text,d2text:day2Text,blogsadd:ALLPOSTS})
})

app.get('/contact-me',(req,res)=>{
    res.render('contact-me.ejs')
})

app.get('/about',(req,res)=>{
    res.render('about.ejs')
})

app.get('/compose',(req,res)=>{
    res.render('compose.ejs')
})
app.post('/',(req,res)=>{

    let post={
        title:req.body.titletxt,
        blog:req.body.composetxt
    }
    ALLPOSTS.push(post);
    res.redirect('/')
})
app.listen(process.env.PORT||port,()=>{
    console.log(`Server live at vercel | ${port}`)
})