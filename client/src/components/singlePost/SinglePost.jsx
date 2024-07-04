import './singlePost.css';

export default function SinglePost() {
    return (
        <div className='singlePost'>
            <div className="singlePostContainer">
                <img className="singlePostImg" src="https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/03/06173108/Psychology_Courses-2320x1450.jpg" alt="pic" />
                <h1 className="singlePostTitle">
                    Lorem ipsum dolor sit amet.
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author: <b>Safak</b>
                    </span>
                    <span className="singlePostDate">1 hour ago</span>
                </div>
                <p className="postContent">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde deserunt natus sit neque necessitatibus veritatis ipsam perferendis inventore fuga! Recusandae, hic quos corporis magnam aspernatur dolores vel explicabo dicta maxime!</p>
            </div>
        </div>
    )
}
