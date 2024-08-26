import Post from "../models/post.js";
export const getPosts = async (req, res) => {
    try{
        const posts = await Post.find().populate("author", "username");
        if (!posts) return res.status(404).json({error: "No Posts Found!"});
        res.json(posts);
    } catch (e){
        return res.status(500).json({error: "Failed to Retrieve Posts."})
    }
};

export const getPost = async (req, res) => {
    try{
        const id = req.params.id;
        const post = await Post.findById(id).populate("author", "username");
        if (!post) return res.status(404).json({error: "Post not Found!"});
        res.json(post);
    } catch (e) {
        return res.status(500).json({error: "Failed to Retrieve Post."})
    }
}

export const createPost = async (req, res) => {
    try{
        const post = req.body;
        post.author = req.user.id;  // sets the userid to the author
        const newPost = await Post.create(post);
        if (newPost) res.status(201).json({message: "Post Created Successfully!"})
    } catch (e) {
        return res.status(500).json({error: "Failed to Create Post."})
    }
}

export const deletePost = async(req, res) => {
    try{
      const id = req.params.id;
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ error: "Couldn't find post" });
      if (post.author.toString() !== req.user.id) // checks if the post is owned by the user 
         return res.status(403).send("can't delete don't have permission");

      const deletedPost=await Post.findByIdAndDelete(id)
      return res.status(204).send(deletedPost);
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
}

export const updatePost = async (req, res) =>{
    try {
        const updatedPost = req.body;
        const id = req.params.id;
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({error: "Couldn't find post"});
        if (post.author.toString() !== req.user.id) // checks if the post is owned by the user
              return res.status(403).send("can't update don't have permission");
        Object.keys(updatedPost).forEach( key => {
            post[key] = updatedPost[key];
        });
        await post.save();
        return res.status(201).json({message: "Post updated Successfully!"});
    } catch (e) {
        return res.status(500).json({error: "Failed to Update Post."})

    }
}