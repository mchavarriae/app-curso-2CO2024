import { useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";

function TaskCard({ task }) {
    //llama a las funciones de las tareas
    const { deleteTask, updateTask } = useTasks();

    //estados de comentarios ej: nuevo, edicion
    const [comments, setComments] = useState(task.comments || []);
    const [newComment, setNewComment] = useState("");
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");


    //agrega el comentario
    const handleAddComment = async () => {

        //no agrega comentarios vacios
        if (newComment.trim()) {
            const updatedComments = [...comments, { text: newComment, date: new Date() }];
            
            //actualiza los comentarios con el ultimo agregado
            setComments(updatedComments);
            
            //se envia a la base de datos
            await updateTask(task._id, { comments: updatedComments });
            
            //limpia la caja de texto
            setNewComment("");
        }
    };


    //editar comentarios
    const handleEditComment = async (id) => {

        //revisa los existentes y actualiza el comentario
        const updatedComments = comments.map((comment, index) =>
            index === id ? { ...comment, text: editCommentText } : comment
        );

        //actualiza el estado de la lista
        setComments(updatedComments);
        //lo envia a la base de datos
        await updateTask(task._id, { comments: updatedComments });
        //limpia la caja de texto de edicion
        setEditCommentId(null);
        setEditCommentText("");
    };

    //borra comentarios
    const handleDeleteComment = async (id) => {
        //filtro para seleccionar el comantario con el id correcto
        const updatedComments = comments.filter((_, index) => index !== id);
        
        //actualiza y envia a la base de datos
        setComments(updatedComments);
        await updateTask(task._id, { comments: updatedComments });
    };

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{task.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <button onClick={() => deleteTask(task._id)}>Delete</button>
                    <Link to={`/tasks/${task._id}`}>Edit</Link>
                </div>
            </header>
            <p className="text-slate-300">{task.description}</p>

            <div className="mt-4">
                <h2 className="text-lg font-semibold">Comments</h2>
                {comments.map((comment, index) => (
                    <div key={index} className="flex justify-between">
                        {editCommentId === index ? (
                            <input
                                type="text"
                                value={editCommentText}
                                onChange={(e) => setEditCommentText(e.target.value)}
                                className="border border-blue-500 rounded-md p-2 bg-gray-900 text-white"
                            />
                        ) : (
                            <p>{comment.text}</p>
                        )}
                        <div>
                            {editCommentId === index ? (
                                <button onClick={() => handleEditComment(index)}>Save</button>
                            ) : (
                                <button onClick={() => {
                                    setEditCommentId(index);
                                    setEditCommentText(comment.text);
                                }}> Edit</button>
                            )}
                            <button className="px-4" onClick={() => handleDeleteComment(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    className="border border-gray-500 rounded-md p-2 bg-gray-900 text-white"
                />
                <button className="px-4" onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    );
}

export default TaskCard;
