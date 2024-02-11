import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended : true}));
app.use(methodOverride('_method'));

const blogs = [];

app.get('/', (req, res) => {
    res.render("index.ejs");
});
app.post('/create', (req, res) => {
    res.render("create-blog.ejs");
});

app.post('/myblogs', (req, res) => {
    const newBlog = {
        id : blogs.length +1,
        title: req.body.title,
        content: req.body.content,
    };
  console.log(newBlog);
  blogs.unshift(newBlog);
  res.render("my-blogs.ejs",{newBlog : blogs , blogid : newBlog.id})
});
app.get("/myblogs", (req, res)=>{
    res.render("my-blogs.ejs",{newBlog : blogs })
});

app.patch("/myblogs/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const existingBlog = blogs.find((blog)=>blog.id===id);
    const editedBlog = {
        id: id,
        title:req.body.title||existingBlog.title,
        content:req.body.content||existingBlog.content,
    }
    const searchIndex = blogs.findIndex((blog)=>blog.id===id);
    blogs[searchIndex]= editedBlog;
    res.render("create-blog.ejs", { blog: editedBlog })

});
app.delete('/myblogs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const deleteBlog = blogs.findIndex((blog)=>blog.id===id)
    if (deleteBlog !== -1) {
        blogs.splice(deleteBlog, 1);
      
        res.redirect("/myblogs");
    } else {
        res.status(404).render("not-found.ejs");
    }
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
