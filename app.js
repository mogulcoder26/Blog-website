const express = require('express');
const app = express();
const ejs = require('ejs')
const port = 5000;
const {readFileSync}=require('fs')
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
const day1Text = `Programming is an intriguing sector as it gives us the superpower to regulate computer programs on the go. It can be used for ships, traffic control, robotics, self-driving vehicles, smartphone applications, websites, and many other things.

To ensure that you remain up to date on standards and protocols, and even more so in the field of coding, it is important to track developments in your field. Programmers of all specialties can easily benefit from keeping track of the new developments & following industry-leading blogs and websites.

These bloggers have made a name for themselves in the programming world by posting important, high-quality data and tips for coders. You can learn tricks and shortcuts you would never have dreamed of doing otherwise by following programming blogs.

You'll surely want to subscribe to these helpful programming websites and blogs written by the best blogging coders. So, let's get started!`
const day2Text =readFileSync('data.txt',{encoding:'utf8'})

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
app.get('/:xyz',(req,res)=>{
    res.render("errorpg.ejs")
})

app.listen(process.env.PORT || port, () => {
    console.log(`Server live at vercel | ${port}`)
})