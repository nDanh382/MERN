import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { PostsContext } from '../../Contexts/PostsContext'
import { useContext } from 'react'

const ActionButtons = ({ url, _id }) => {
	const { deletePost, findPost, setShowUpdatePostModal } = useContext(PostsContext)

	const choosePost = (postId) => {
		findPost(postId)
		setShowUpdatePostModal(true)
	}
	return (
		<>
			<Button className ="ms-1 post-button" variant='outline-primary' href={url} target='_blank'>
				<img src={playIcon} alt='play' width='24' height='24' />
			</Button>
			<Button className ="ms-1 post-button" variant='outline-primary' onClick={choosePost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className ="ms-1 post-button" variant='outline-primary' onClick={deletePost.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons