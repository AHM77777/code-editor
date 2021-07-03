import mongoose from "mongoose"

const connectionURL = "mongodb+srv://editorapp:testpassword123@editor-main-cluster.lzkff.mongodb.net/code-editor?retryWrites=true&w=majority";

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})