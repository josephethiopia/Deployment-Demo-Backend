import Post from "../models/post.js";
export const getPosts = async (req, res) => {
    try{
        const posts = await Post.find();
        if (!posts) return res.status(404).json({error: "No Posts Found!"});
        res.json(posts);
    } catch (e){
        return res.status(500).json({error: "Failed to Retrieve Posts."})
    }
};

export const getPost = async (req, res) => {
    try{
        const id = req.params.id;
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({error: "Post not Found!"});
        res.json(post);
    } catch (e) {
        return res.status(500).json({error: "Failed to Retrieve Post."})
    }
}

export const createPost = async (req, res) => {
    try{
        const post = req.body;
        const newPost = await Post.create(post);
        if (newPost) res.status(201).json({message: "Post Created Successfully!"})
    } catch (e) {
        return res.status(500).json({error: "Failed to Create Post."})
    }
}

export const deletePost = async(req, res) => {
    try{
        const id = req.params.id;
        const post = await Post.findByIdAndDelete(id);
        if (!post) return res.status(404).json({error: "Couldn't find post"});
        return res.status(204).send(post);
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
        Object.keys(updatedPost).forEach( key => {
            post[key] = updatedPost[key];
        });
        await post.save();
        return res.status(201).json({message: "Post updated Successfully!"});
    } catch (e) {
        return res.status(500).json({error: "Failed to Update Post."})

    }
}