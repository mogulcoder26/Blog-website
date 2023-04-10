const express = require('express');
const app = express();
const ejs = require('ejs')
const port = 5000;
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.set("views", __dirname + '/views')
app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'))
let transferState = '';
let _ = require('lodash');
// Load the core build.
app.setMaxListeners(30)
const homeText = "Welcome to my blog! My name is Soubhik and I'm excited to share my thoughts and experiences with you. As an avid reader of programming blogs,I've created a web-app that helps you to write blogs,read blogs written by other people.I hope you find something valuable in my content. Thanks for stopping by!"
const day1Text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi fuga rem, nesciunt molestias perspiciatis cupiditate hic. Facilis non pariatur perspiciatis saepe quos quo id cum repellendus qui amet, quasi, velit hic. Explicabo aspernatur, hic ipsa soluta ab neque assumenda provident, architecto inventore debitis consequatur molestias error, labore quidem tenetur unde. Deleniti delectus, culpa odio reprehenderit suscipit dolorem magnam? Deserunt iusto dolore facere molestias quod veniam, eaque quidem quia sapiente placeat minima voluptatem, fugiat unde non repudiandae corrupti!"
const day2Text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi fuga rem, nesciunt molestias perspiciatis cupiditate hic. Facilis non pariatur perspiciatis saepe quos quo id cum repellendus qui amet, quasi, velit hic. Explicabo aspernatur, hic ipsa soluta ab neque assumenda provident, architecto inventore debitis consequatur molestias error, labore quidem tenetur unde. Deleniti delectus, culpa odio reprehenderit suscipit dolorem magnam? Deserunt iusto dolore facere molestias quod veniam, eaque quidem quia sapiente placeat minima voluptatem, fugiat unde non repudiandae corrupti!"

let ALLPOSTS = [{ title: "Day-1", blog: day1Text }, { title: "Day-2", blog: day2Text }]
let BRIEFEDPOSTS = []
//trucate code:
// homeTextNew=homeText.substring(0,90)
// day1Text=
const truncate = (string) => {

    return string.substring(0, 90)
}

day1TextNew = truncate(day1Text);
day2TextNew = truncate(day2Text);





app.get('/', (req, res) => {
    for (let a = 0; a < ALLPOSTS.length; a++) {
        // console.log(ALLPOSTS[a].title,ALLPOSTS[a].blog);
        BRIEFEDPOSTS[a] = truncate((ALLPOSTS[a]).blog)
        // console.log(BRIEFEDPOSTS[a])
    }
    res.render('home.ejs', { blogsadd: ALLPOSTS, xyz: BRIEFEDPOSTS })
})

app.get('/contact-me', (req, res) => {
    res.render('contact-me.ejs')
})

app.get('/about', (req, res) => {
    res.render('about.ejs')
})

app.get('/compose', (req, res) => {
    res.render('compose.ejs')
})

app.post('/', (req, res) => {

    let post = {
        title: req.body.titletxt,
        blog: req.body.composetxt
    }
    ALLPOSTS.push(post);
    res.redirect('/')
})
app.get('/posts/:txt', (req, res) => {
    // { txt: 'f' }

    let { txt } = req.params;
    console.log(req.url)
    let p = 1;
    for (let z = 0; z < ALLPOSTS.length; z++) {
        if ((txt).toLowerCase() === (ALLPOSTS[z].title).toLowerCase()) {
            console.log('matched');
            res.render('blogpost.ejs', { blogpost: ALLPOSTS[z] })
        }
        else {
            ++p;
        }
    }

    if (p === ALLPOSTS.length) {
        res.redirect('/');
    }
})


app.listen(process.env.PORT || port, () => {
    console.log(`Server live at vercel | ${port}`)
})